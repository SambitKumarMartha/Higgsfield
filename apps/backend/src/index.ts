import express from "express";
import bcrypt from "bcrypt";
import {CreateUserSchema} from "./types"
import { prisma } from "./db";
const app = express();


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
  res.json({
    message: "you have successfully signin",
    id: existuser.id
  })
});
app.post("/api/v1/avatar", (req, res) => {//to create a avatar
    
})
app.get("/api/v1/avatar", (req, res) => {//to get all the createdavavtar
    
})
app.get("/api/v1/avatar/:avatarId", (req, res) => {
  
});
app.post("/api/v1/video", (req, res) => {//to create a video
    
})
app.get("/api/v1/video", (req, res) => {//to get all the created videos

});
app.get("/api/v1/video/:videoId", (req, res) => {

});
app.get("/api/v1/me", (req, res) => {//to get profile details
    
})
app.get("api/v1/models", (req, res) => {//to know 
    
})
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
