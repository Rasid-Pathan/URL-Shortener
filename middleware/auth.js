const { getUser } = require("../service/auth");

//Authencation Header
function checkAuthentication(req,res,next){
   const tokenCookie = req.cookies?.uid;
   req.user = null;

   if(!tokenCookie){
      return next();
   }

   const token = tokenCookie;
   const user = getUser(token);

      req.user = user;
      return next();
}

function restrictTo(roles = []){
   return function (req, res , next){
      if(!req.user) return res.redirect('/login')

      if(!roles.includes(req.user.role)) return res.end("Unautorized");
      return next();
   }
}

module.exports = {checkAuthentication,restrictTo}