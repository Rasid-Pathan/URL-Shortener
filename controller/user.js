const {v4: uuidv4} = require("uuid")
const User = require("../model/user");
const { setUser } = require("../service/auth");

async function handleUserSignup(req,res){
    const {name,email,password} = req.body;
    const user = await User.create({
        name,email,password
    });

    return res.redirect("/login");
}

async function handleUserLogin(req,res){
    const {email,password} = req.body;
    const user = await User.findOne({
        email,password
    });
    if(!user) {
        return res.render("login",{error : "Invaild Id or Password"})
    }

    const token = setUser(user);

    res.cookie("uid",token);
    return res.redirect("/");
}

function handleUserLogout(req,res) {
    res.clearCookie('uid').redirect('/login');
}

module.exports = {handleUserSignup,handleUserLogin,handleUserLogout};