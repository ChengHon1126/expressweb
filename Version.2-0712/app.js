const express = require("express");
const path = require("path");
const hbs = require("hbs"); //記得 npm install hbs;
const bodyParser = require("body-parser"); //記得 npm install body-parser --save
const session = require("express-session"); // npm install express-session
const app = express();
const portNum = 3000;

const dramasRouter = require("./router/dramas.controllers.js");
const authRouter = require("./router/auth.js");

const validator = require("./utils/validator.js");

const RedisStore = require("connect-redis").default;
const redis = require("redis");
const redisClient = redis.createClient(); 
redisClient.connect().catch(console.error);


/////////////////////////
app.engine("html", hbs.__express);
app.set("views", path.join(__dirname, "application","views"))
app.use( express.static(path.join(__dirname,"application")))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extend: false,      // 是否用 額外套件 解析字串
    limit : "1mb",      // 限制 參數資料大小    
    parameterLimit : "10000"    // 限制參數個數
}))
/////////////////////////
// 處理 session 資料的 Middleware
// 後面才可以用 req.session 做資料存取
app.use(session({
    store : new RedisStore({ client : redisClient}),  // session 存放資料的地方
    secret : "abcd1234" ,  // session 資料加密使用
    resave : true,          // 不論修改 , 是否要回存到 store 上
    saveUninitialized : false, // 初始化的 session , 是否要存到 store 上
    name   : "_ntust_tutorial_id",  // cookie 的 key 值
    ttl    : 24*60*60*1             // session 資料有效時間 (以 s 為單位)
}));



app.get("/login",(req,res)=>{
    // console.log(req.session)
    res.render("login.html");
    
})

// 登出 ＡＰＩ
app.use("/logout",(req,res,next)=>{
    req.session.destroy();
    res.clearCookie("_ntust_tutorial_id");
    res.redirect("/login");

    next();
})
/////////////////////////

////////////////////////////////
app.get("/",
    validator.checkLogin,

    function(req,res){
        res.render("index.html");
        // console.log(req.session)
    }
);
app.use("/dramas", validator.checkLogin,dramasRouter);
app.use("/auth", authRouter);
app.get("/about/us",(req,res)=>{
    validator.checkLogin,
    res.render("aboutus.html")
});
////////////////////////////////
app.listen(portNum, ()=>{
    console.log('Server is runnung at http://localhost:'+portNum);
})

