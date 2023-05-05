const jwt=require("jsonwebtoken")

const authc=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
        try{
            const decode=jwt.verify(token,"masai")
            if(decode ){
                if(decode.author=="MEMBER"){
                    req.body.authorId=decode.authorId
                    next()
                }else{
                    res.status(200).send({"msg":"You are Not authorised User"}) 
                }

                
            }else{
                res.status(200).send({"msg":"You are Not authorised User"}) 
            }
        }catch(er){
            res.status(200).send({"msg":er.message}) 
        }
    }else{
        res.status(200).send({"msg":"Please Login"}) 
    }
}


module.exports={
    authc
}