require("dotenv").config();
const PORT = process.env.PORT || 5000;

const authRoutes = require("./routes/authRoutes")
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const User = require("./models/User")

const app = express()

app.use(cors({
    origin:"https://bright-torrone-ea4e7c.netlify.app/",
    credentials: true
}))
app.use(express.json())

mongoose.connect(process.env.ATLAS_URL)
.then(()=>{
    console.log("MongoDB Connected")
}).catch((err)=>{
    console.log(err)
})

app.get("/", (req,res)=>{
    res.send("Server Running")
})

app.use("/api/auth",authRoutes)

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})