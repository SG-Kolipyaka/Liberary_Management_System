const jwt=require("jsonwebtoken")

const authc=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
        try{
            const decode=jwt.verify(token,"masai")
            if(decode ){
                if(decode.author=="MEMBER"){
                   
                    next()
                }else{
                    res.status(200).send({"msg":"You are Not authorised User To view The Books"}) 
                }

                
            }else{
                res.status(200).send({"msg":"You are Not authorised User To view The Books"}) 
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