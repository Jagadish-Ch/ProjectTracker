const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const RegisterUser = require("./Models/RegisterModel")
const Middleware = require("./Middleware")


const app = express();
mongoose.connect("mongodb+srv://jagadish:jagadish@cluster0.xkb5tzh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(
    ()=> console.log("DB Connected")
).catch((err)=> console.log(err))

app.use(express.json())

app.get("/", (req, res) => {
    return res.send("<h1>Dashboard...!</h1>");
})

app.post("/registermember", async (req, res) => {
    try {
        const {name, email, password, mobileNo} = req.body;
        let exist = await RegisterUser.findOne({email});
        if(exist){
            res.send("User already existed...!")
        }
        const newData = new RegisterUser({
            name,
            email,
            password,
            mobileNo
        })
        newData.save();
        res.send("Registered Successfully...!")
        
    } catch (err) {
        console.log(err);
        return res.send("Server Error");
    }
})

app.post("/login", async(req, res) => {
    try {
        const {email, password} = req.body;
        let exist = await RegisterUser.findOne({email});
        console.log(exist)

        if(!exist){
            return res.send("User not Found...!");
        }
        if(exist.password !== password){
            return res.send("Invalid Password...!");
        }
        
        const payload = {
            user :{
                id : exist.id
            }
        }

        jwt.sign(payload, 'jwtSecretKey', {expiresIn:3600000},
            (err, token) =>{
                if (err) throw err;
                return res.json({token})
            }
        )
    } 
    catch (err) {
        console.log(err);
        return res.send("Server Error");
    }
})

app.get("/myprofile", Middleware, async (req, res)=>{
    try {
        let exist = await RegisterUser.findById(req.user.id);
        if(!exist){
            return res.send("User Not Found...!");
        }
        res.json(exist);
    } 
    catch (err) {
        console.log(err);
        return res.send("Server Error");
    }
})

app.post("/newproject", async(req, res)=>{
    try {
        // const {projectName, memberName, } = req.body;
    } 
    catch (err) {
        console.log(err)
        return res.send("Server Error");
    }
})

app.listen(5000, 
    ()=>console.log("Server Running")
)