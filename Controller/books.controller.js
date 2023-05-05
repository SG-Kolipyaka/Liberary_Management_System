const {BooksModel}=require("../Models/bookstore.model")
// const jwt=require("jsonwebtoken")
// const bcrypt=require("bcrypt")
const {auth}=require("../MiddleWare/store.middleware")
const {authc}=require("../MiddleWare/store.middle")
const {Router}=require("express")
const { UserModel } = require("../Models/user.model")

const bookrouter=Router()


bookrouter.post("/add",auth,async(req,res)=>{
    try{
        const book=new BooksModel(req.body)
        await book.save()
        res.status(200).send({"msg":"Uploaded Post Successfully","Book Added":book})
    }catch(er){
        res.status(400).send({"msg":"er.message"})
    }
})

bookrouter.get("/",authc,async(req,res)=>{
    const {query}=req.query
    try{
        const books=await BooksModel.find(query)
        res.status(200).send(books) 

    }catch(er){
        res.status(400).send({"msg":er.message})
    }
})


bookrouter.patch("/update/:postId",auth,async(req,res)=>{
    const {postId}=req.params
    // const book=await BooksModel.findOne({_id:postId})
    try{

    await BooksModel.findByIdAndUpdate({_id:postId},req.body)
    res.status(200).send({"msg":"Data Updated Successfully"})

    }catch(er){
        res.status(400).send({"msg":er.message})
    }
})



bookrouter.patch("/updatestatus/:postId",authc,async(req,res)=>{
    const {postId}=req.params
    try{
        await BooksModel.findByIdAndUpdate({_id:postId},req.body.status)
        res.status(200).send({"msg":`book is ${req.body.status}`})
    }catch(err){
        res.status(400).send({"msg":er.message})
    }
})



bookrouter.delete("/delete/:postId",auth,async(req,res)=>{
    const {postId}=req.params
   
    try{

    await BooksModel.findByIdAndDelete({_id:postId})
    res.status(200).send({"msg":"Data Deleted Successfully"})

    }catch(er){
        res.status(400).send({"msg":er.message})
    }
})



module.exports={
    bookrouter
}