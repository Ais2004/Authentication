const jwt=require('jsonwebtoken');
const ensureAuthenticated=(req,res,next)=>{
    const auth=req.headers["authorisation"];
    if(!auth){
        return res.status(403).json({ message: "unauthorised", success: false });
    }
    try{
     const decoded=jwt.verify(auth,process.env.JWT_SECRET);
     req.user=decoded;
     next();
    }catch(err){
        return res.status(403).json({ message: "expired or wrong token", success: false });
    }
}

module.exports=ensureAuthenticated;