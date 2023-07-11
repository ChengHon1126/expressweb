const express = require("express");
const path = require("path");
const hbs = require("hbs"); //記得 npm install hbs;
const bodyParser = require("body-parser"); //記得 npm install body-parser --save
const session = require("express-session"); // npm install express-session
const app = express();
const portNum = 3000;
const aboutRouter = require("./router/about.js");
const dramasRouter = require("./router/dramas.controllers.js");
const authRouter = require("./router/auth.js");

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
    secret: "c90dis90#" ,
    resave : true,
    saveUninitialized: false, 
    name: " _ntust_tutorial_id",
    ttl: 24*60*60*1
}));
/////////////////////////
app.use("/about", aboutRouter);
app.use("/dramas", dramasRouter);
app.use("/auth", authRouter);

app.get("/",
    function(req,res){
        res.render("index.html");
        console.log(req.session)
    }
);

/////////////////////////
// 1. 加入 login 頁面
// 2. Post / auth API 驗證 + 紀錄資料到 Session 上
// 3. Get / logout 登出 APi
// 4. 加入登入檢查的 Middleware (isUserLogin)
app.get("/login",(req,res)=>{
    res.render("login.html");
})

/////////////////////////

app.get("/about/us",(req,res)=>{
    res.render("aboutus.html")
})
////////////////////////////////
app.listen(portNum, ()=>{
    console.log('Server is runnung at http://localhost:'+portNum);
})