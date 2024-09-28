const express = require('express');
const path = require('path');
const cookiepaser = require('cookie-parser');
const { connectDB } = require('./connection');
const URL = require('./model/url');

const app = express();
const Port = 8001;

//routes
const urlRouter = require('./routes/url');
const staticRouter = require('./routes/staticRouter');
const userRouter = require('./routes/user');

//middleware
const {checkAuthentication, restrictTo} = require('./middleware/auth');
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.resolve("./assets")));
app.use(cookiepaser());

//Middelware + Header Authentication
app.use(checkAuthentication);


connectDB("mongodb://localhost:27017/short-url").then( () => console.log("DB Conneted"));

app.set("view engine",'ejs');
app.set("views",path.resolve("./views"));

app.use('/url', restrictTo(['Normal','Admin']),urlRouter);
app.use('/user',userRouter);
app.use('/',staticRouter);

app.get("/url/:shortId",async (req,res)=>{
    const shortId = req.params.shortId;
    console.log(shortId);
    const entry = await URL.findOneAndUpdate(
        {
            ShortId:shortId,
        },
        {
            $push:{
                visithistory: {
                    timestamp: Date.now()
                },
            }
        });
    res.redirect(entry.redirecturl);
})

app.listen(Port,()=>{
    console.log("Serever Started http://localhost:"+Port);
})