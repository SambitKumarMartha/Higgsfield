import express from "express";

const app = express();
app.use(express.json());

app.post("/api/v1/signup", (req, res) => {//for siging up 
  
});
app.post("/api/v1/signin", (req, res) => {//for signing in
    
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
