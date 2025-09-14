const verification=(req,res,next)=>{
    if(req.session.user){
        next()
    }
    else {
    res.status(401).json({message: "Unauthorized! Please login."});
  }
}
module.exports=verification