const mongoose=require("mongoose")


const UserSchema=mongoose.Schema({
    name : {type:String,require:true},
    email : {type:String,require:true},
    gender : {type:String,require:true},
    password : {type:String,require:true},
    role: {type:String, enum:["MEMBER", "LIBRARIAN"],require:true},

},{
    versionKey:false
})

const UserModel=mongoose.model("user",UserSchema)

module.exports={
    UserModel
}