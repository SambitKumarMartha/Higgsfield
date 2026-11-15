import express, { response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as fs from "node:fs";
import path from "node:path";
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import { authenticateToken } from "./Authmiddleware";
import {CreateUserSchema,CreateAvatarSchema,CreateVideoSchema} from "./types"
import { prisma } from "./db";
const app = express();
const ai = new GoogleGenAI({ apiVersion: "v1beta" }); // automatically reads GEMINI_API_KEY from .env

app.use(express.json());

const saltRounds = 10;

app.post("/api/v1/signup", async (req, res) => {
  //##step-1 verifying the input has the requires data or not
  const { success, data, error } = CreateUserSchema.safeParse(req.body);// destructering the object that came froim zod to verify the data user enter is valig or not 
  if (!success) {//checking what is wrong in the input
    res.status(411).json({
      message: error.issues[0].message,
    });
    return;
  }
  //##step-2 check if the user is ALREADY EXIST or not 
  const userexist = await prisma.user.findUnique({
    where:{
      username:data.username
    }
  })
  if (userexist) {
    res.status(409).json({
      message:"user with this username already exist"
    })
    return;
  }
  //step-3 HASHING THE PASSWORD that user provided
  const hashedpassword = await bcrypt.hash(data.password,saltRounds)
//Step-4 pushing the credentials to data base 
  const user = await prisma.user.create({
    data: {
      username: data.username,
      password: hashedpassword,
    }
  });
  res.json({
  message: "signup done successfully",
      id: user.id
});
});

  
app.post("/api/v1/signin", async(req, res) => {//for signing in
  const { success, data, error } = CreateUserSchema.safeParse(req.body)
  if (!success) {
    res.status(411).json({
      message:error.issues[0].message
    })
    return;
  }
  const existuser = await prisma.user.findUnique({
    where:{username:data.username}
  })
  if (!existuser) {
    res.status(409).json({
      message: "user with this username nor found"
    });
    return;
  }
  const matchpassword = await bcrypt.compare(data.password, existuser.password)
  if (!matchpassword) {
    res.status(403).json({
      message: "incorrect password"
    });
    return;
  }
  const token = jwt.sign({ id: existuser.id }, process.env.JWT_SECRET!);
  res.json({
    message: "you have successfully signin",
    token:token
  })
});
app.post("/api/v1/avatar", authenticateToken, async (req, res) => {
  //to create a avatar
  //step-1 validate the user input is name and url
  const { success, data, error } = CreateAvatarSchema.safeParse(req.body);
  if (!success) {
    return res.status(409).json({
      message: "invalid user input",
      error: error.issues,
    });
  }
  //step-2 Download the image from the url
  const imageReffered = await fetch(data.image);
  if (!imageReffered.ok) {
    return res.status(400).json({
      message: "Couldn't Download image",
    });
  }
  //step-3 find the image type from the respoonse header
  const mimetype = imageReffered.headers.get("content-type") ?? ""; //??""this refer if the ?? left side is empty it will but null which leads to crash so to avoid that we put a space there
  if (!mimetype.startsWith("image/")) {
    return res.status(400).json({
      message: "The given URL is not a image link",
    });
  }
  // Step-4 Convert bytes to base64 text: bytes-->base64
  const imagebytes = Buffer.from(await imageReffered.arrayBuffer());
  const base64Image = imagebytes.toString("base64");
  //Step-5 call Gemini
  const response = await ai.interactions.create({
    model: "gemini-2.5-flash-image",
    input: [
      { type: "text", text: data.prompt },
      {
        type: "image",
        data: base64Image,
        mime_type: mimetype,
      },
    ],
    response_format: {//ensure the model return image in the response insteas of anthying else 
      type: "image",
    },
  });
  //step-6 get the generated image
  const generatedBase64=response.outputs?.find(o=>o.type==="image")?.data??response.output_image?.data;
  if (!generatedBase64) {
    res.status(500).json({ message: "Gemini did not return an image" });
    return;
  }
  //step-7 Save in the database
  const outputpath = path.join(process.cwd(), "src", "generatedIMG", `${Date.now()}.png`);
  fs.writeFileSync(outputpath, Buffer.from(generatedBase64, "base64"));

  //step-8 save in the database
  const avatar = await prisma.avatar.create({
    data: {
      name: data.name,
      userId: res.locals.userId,
      avatarImages: {
        create: [
          { type: "User", url: data.image },
          { type: "Model", url: outputpath },
        ],
      },
    },
    include: { avatarImages: true },
  });
  res.json(avatar);
});
app.get("/api/v1/avatar", authenticateToken,(req, res) => {//to get all the createdavavtar
    
})
app.get("/api/v1/avatar/:avatarId",authenticateToken, (req, res) => {
  
});
app.post("/api/v1/video", authenticateToken, (req, res) => {//to create a video
  
  app.post("/api/v1/generate-video", authenticateToken, async (req, res) => {
    // Step-1: Validate user input with Zod
    const { success, data, error } = CreateVideoSchema.safeParse(req.body);
    if (!success) {
      return res.status(409).json({
        message: "invalid user input",
        error: error.issues,
      });
    }

    // Step-2: Use Promise.all and .map() to fetch and convert multiple images concurrently
    const imageInputs = await Promise.all(
      data.image.map(async (imageUrl) => {
        const imageReffered = await fetch(imageUrl);
        if (!imageReffered.ok) {
          throw new Error(`Failed to download image from: ${imageUrl}`);
        }

        const mimetype =
          imageReffered.headers.get("content-type") ?? "image/jpeg";
        if (!mimetype.startsWith("image/")) {
          throw new Error(`URL is not a valid image link: ${imageUrl}`);
        }

        const imagebytes = Buffer.from(await imageReffered.arrayBuffer());
        return {
          type: "image",
          data: imagebytes.toString("base64"),
          mime_type: mimetype,
        };
      }),
    );

    // Step-3: Pass the mapped images alongside your text prompt into Gemini Omni Flash
    const interaction = await ai.interactions.create({
      model: "gemini-omni-1.2-flash",
      input: [
        ...imageInputs, // Spreads all your processed reference images here
        {
          type: "text",
          text:
            data.prompt??"A smooth cinematic sequence incorporating these reference subjects.",
        },
      ],
    });

    // Step-4: Check if the model returned a video
    if (!interaction.output_video?.data) {
      return res.status(500).json({ message: "Gemini did not return a video" });
    }

    // Step-5: Save the generated video into your src/dumpedfolder
    const dumpDir = path.join(process.cwd(), "src", "generatedIMG");
    fs.mkdirSync(dumpDir, { recursive: true });

    const outputpath = path.join(dumpDir, `video_${Date.now()}.mp4`);
    fs.writeFileSync(
      outputpath,
      Buffer.from(interaction.output_video.data, "base64"),
    );
    return res.json({
      success: true,
      message: "Video generated successfully with reference images",
      videoPath: outputpath,
    });
  });
    
})
app.get("/api/v1/video",authenticateToken, (req, res) => {//to get all the created videos

});
app.get("/api/v1/video/:videoId",authenticateToken, (req, res) => {

});
app.get("/api/v1/me",authenticateToken, (req, res) => {//to get profile details
    
})
app.get("/api/v1/models",authenticateToken, (req, res) => {//to know 
    
})
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
