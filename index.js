const express=require("express")
const cors = require('cors')
const app=express()
const {connection}=require("./db")
const {userrouter}=require("./Controller/user.controller")
const {bookrouter}=require("./Controller/books.controller")
// const {auth}=require("./MiddleWare/store.middleware")

app.use(express.json())
app.use(cors())

app.use("/user",userrouter)

// app.use(auth)
app.use("/books",bookrouter)

// app.get("/",(req,res)=>{
//     res.status(200).send("Liberary Data")
// })

app.listen(8080,async()=>{
    try{
        await connection
console.log("Connected to DB")
    }catch(err){
        console.log("something Went wrong")
    }
    console.log("server started at 8080")
})