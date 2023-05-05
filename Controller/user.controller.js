const {UserModel}=require("../Models/user.model")
const jwt=require("jsonwebtoken")
const {auth}=require("../MiddleWare/store.middleware")
const bcrypt=require("bcrypt")
const {authc}=require("../MiddleWare/store.middle")

const {Router}=require("express")

const userrouter=Router()


userrouter.post("/signup",async(req,res)=>{
    const {name,email,password,role,gender}=req.body
    try{
const user=await UserModel.findOne({email})
if(user){
    res.status(200).send({"msg":"User Already Registered Please Login"})
}else{
    bcrypt.hash(password,5,async(err,hash)=>{
        const user=UserModel({name,email,gender,role,password:hash})
        await user.save()
        res.status(200).send({"msg":"User Registered Successfully"})
    })
}
    }catch(err){
        res.status(400).send({"msg":"Something went Wrong"})
    }
})






userrouter.post("/login",async(req,res)=>{
const {email,password}=req.body
try{
    const finduser=await UserModel.findOne({email})
    if(finduser){
        bcrypt.compare(password, finduser.password,(err,result)=>{
            if(result){
                const token=jwt.sign({author:finduser.role,authorId:finduser._id},"masai");
               res.status(200).send({"msg":"Login Successfully","token":token,"Logged in as ":finduser.role})
            }else{
                res.status(200).send({"msg":"Wrong Credential"}) 
            }
        })
    }else{
        res.status(400).send({"msg":"Wrong Credential"}) 
    }
}catch(err){
    
}
})



userrouter.get("/",auth,async(req,res)=>{
    try{
const users=await UserModel.find({role:"MEMBER"})
res.status(200).send({"msg":users})
    }catch(err){
        res.status(200).send({"msg":err.message})
    }
})


//add User

userrouter.post("/create",auth,async(req,res)=>{
    const {name,email,password,role,gender}=req.body
    try{
        const user=await UserModel.findOne({email})
        if(user){
            res.status(200).send({"msg":"User Already Present"})
        }else{
            bcrypt.hash(password,5,async(err,hash)=>{
                const user=UserModel({name,email,gender,role:"MEMBER",password:hash})
                await user.save()
                res.status(200).send({"msg":"User Registered Successfully"})
            })
        }
    }catch(err){
        res.status(200).send({"msg":err.message})
    }
})


//Remove the user
userrouter.delete("/delete/:userId",auth,async(req,res)=>{
    const {userId}=req.params
    const user=await UserModel.findOne({_id:userId})
   
    try{

if(user.role==="MEMBER" ){
    await UserModel.findByIdAndRemove({_id:userId})
    res.status(200).send({"msg":"User Deleted Successfully"})
}else{
    res.status(200).send({"msg":"Cannot be Deleted"})
}

    }catch(er){
        res.status(400).send({"msg":er.message})
    }
})



//update the user
userrouter.patch("/update/:userId",auth,async(req,res)=>{
    const {userId}=req.params
    const user=await UserModel.findOne({_id:userId})
   
    try{

if(user.role=="MEMBER"){
    await UserModel.findByIdAndUpdate({_id:userId},req.body)
    res.status(200).send({"msg":"User Updated Successfully"})
}else{
    res.status(200).send({"msg":"Cannot be Updated You are Not Authorised Person To Update"})
}

    }catch(er){
        res.status(400).send({"msg":er.message})
    }
})





userrouter.delete("/selfdelete/:postId",authc,async(req,res)=>{
    const {postId}=req.params
    const posts=await UserModel.findOne({_id:postId})
    try{
        if(req.body.authorId==posts._id){
            await UserModel.findByIdAndDelete({_id:postId})
            res.status(200).send({"msg":"Your Account is Successfully Deleted"})
        }else{
            res.status(200).send({"msg":"You cannot Delete Other"})  
        }
  

    }catch(er){
        res.status(400).send({"msg":er.message})
    }
})




module.exports={
    userrouter
}