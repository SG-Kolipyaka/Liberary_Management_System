const jwt=require("jsonwebtoken")

const auth=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
        try{
            const decode=jwt.verify(token,"masai")
            if(decode ){
                if(decode.author=="LIBRARIAN"){
                   
                    next()
                }else{
                    res.status(200).send({"msg":"You are Not authorised User To add The Books"}) 
                }

                
            }else{
                res.status(200).send({"msg":"You are Not authorised User To add The Books"}) 
            }
        }catch(er){
            res.status(200).send({"msg":er.message}) 
        }
    }else{
        res.status(200).send({"msg":"Please Login"}) 
    }
}


module.exports={
    auth
}