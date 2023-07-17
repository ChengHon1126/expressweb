const express = require('express');
const path = require("path");
const app = express();
const hbs = require("hbs");
const bodyParser = require("body-parser");
const session = require("express-session");
const validator = require("./utils/validator");

const redis = require("redis");
const RedisStore = require("connect-redis").default;
const redisClient = redis.createClient();
redisClient.connect().catch(console.error);


////////////////////////////

const apiDocs        = require("./router/api-docs");
const toDoListRouter = require("./router/to-do-list");
const dramasRouter   = require("./router/dramas");
const aboutRouter    = require("./router/about");
const authRouter     = require("./router/auth");
// const imagesRouter   = require("./router/images");

////////////////////////////
//// hbs and bodyParser setting.
// 設定模板引擎
app.engine("html", hbs.__express);
// 設定靜態檔案位置
app.set("views", path.join(__dirname, "application","views"))
app.use( express.static(path.join(__dirname,"application")))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extend : false,
  limit : "1mb",
  parameterLimit : "10000"
}))
////////////////////////////
////session setting
app.use(session({
  store  : new RedisStore ({client : redisClient}),
  secret : "abcd1234",
  resave : true,          // 不論修改 , 是否要回存到 store 上
  saveUninitialized : false, // 初始化的 session , 是否要存到 store 上
  name   : "_ntust_tutorial_id",  // cookie 的 key 值
  ttl    : 24*60*60*1 
}));


////////////////////////////
// Router
app.use("/dramas",validator.checkLogined, dramasRouter);
app.use("/about", validator.checkLogined, aboutRouter);
app.use("/to-do-list",validator.checkLogined, toDoListRouter);
app.use("/auth",authRouter);
// app.use("/images",imagesRouter);

////////////////////////////

app.use(`/api-docs`,apiDocs);

// app.use((req,res,next)=>{
//   console.log(req.session);
//   next();
// })


app.get("/",validator.checkLogined,(req,res)=>{
  let name = req.session.userInfo.name;
  res.render("welcome.html" ,{templateName : name} );
});

app.get("/welcome",validator.checkLogined,(req,res)=>{
  res.redirect("/");
})

app.get("/login",(req,res)=>{
  res.render("login.html");
})

app.get("/logout",(req,res,next)=>{
  req.session.destroy();
  res.clearCookie("_ntust_tutorial_id");
  res.redirect("/login");

  next()
});


app.use((req,res)=>{
  res.status(404).send("API 尚未開發！");
});



app.listen(8088,function(){
    console.log("Server is running at http://localhost:" + String(8088));
});
