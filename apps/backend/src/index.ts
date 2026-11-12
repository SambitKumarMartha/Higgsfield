import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as fs from "node:fs";
import path from "node:path";
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import { authenticateToken } from "./Authmiddleware";
import {CreateUserSchema,CreateAvatarSchema} from "./types"
import { prisma } from "./db";
const app = express();
const ai = new GoogleGenAI({}); // automatically reads GEMINI_API_KEY from .env

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
app.post("/api/v1/avatar", authenticateToken, async (req, res) => {//to create a avatar
  //step-1 validate the user input is name and url
  const { success, data, error } = CreateAvatarSchema.safeParse(req.body);
  if (!success) {
    return res.status(409).json({
      message: "invalid user input",
      error: error.issues
    });
  }
  //step-2 Download the image from the url
  const imageReffered = await fetch(data.image);
  if (!imageReffered.ok) {
    return res.status(400).json({
      message: "Couldn't Download image"
    })
  }
  //step-3 find the image type from the respoonse header 
  const mimetype = (imageReffered.headers.get("content-type") ?? "")//??""this refer if the ?? left side is empty it will but null which leads to crash so to avoid that we put a space there
  if (!mimetype.startsWith("image/")) {
    return res.status(400).json({
      message: "The given URL is not a image link"
    });
  }
  // Step-4 Convert bytes to base64 text: bytes-->base64 
  const imagebytes = Buffer.from(await imageReffered.arrayBuffer());
  const base64Image = imagebytes.toString("base64");
  //Step-5 call Gemini
  const imageGenration = await ai.interactions.create({
    model: "gemini-2.5-flash-image",
    input: [
      {
        type: "text",
        text: "Using the given photo create generate a professional, high quality portrait of the same person, keeping their face identical",
      },
      {
        type: "image",
        mime_type: mimetype,
        data: base64Image
      }
    ],
  });
  //Step-6 Get the generated image 
  const generatedImage = imageGenration.output_image;
  if (!generatedImage || !generatedImage.data) {
    return res.status(500).json({
      message: "Gemini did not return an image"
    });
  }
  //step-7 Save in the database
  const outputpath = path.join("generatedIMG", `${Date.now()}.png`);
      fs.writeFileSync(outputpath, Buffer.from(generatedImage.data, "base64"));

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
      }
    },
    include: { avatarImages: true },
  });
  res.json(avatar)
});
app.get("/api/v1/avatar", authenticateToken,(req, res) => {//to get all the createdavavtar
    
})
app.get("/api/v1/avatar/:avatarId",authenticateToken, (req, res) => {
  
});
app.post("/api/v1/video",authenticateToken, (req, res) => {//to create a video
    
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
