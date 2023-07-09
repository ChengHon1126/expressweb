const express = require("express");
const path = require("path");
const hbs = require("hbs"); //記得 npm install hbs;
const bodyParser = require("body-parser"); //記得 npm install body-parser --save
const app = express();
const portNum = 3000;
//[module][2] 引入 /router/book.js 程式
const booksRouter = require("./router/book.js");
const aboutRouter = require("./router/about.js");
// const dramasRouter = require("./router/dramas.views.js")
const dramasRouter = require("./router/dramas.controllers.js")

// [Views][1] 設定模板引擎 (解析 html 檔 , 讓 express 讀懂)
// hbs -> hadle bars. 為一種模板引擎
app.engine("html", hbs.__express);

// [Views][2] 是定模板 (template) 位置 
app.set("views", path.join(__dirname, "application","views"))

// [Views][3] 設定靜態檔的位置, (讀取 *.css/ *.js / *.jpg / *.png / *.mp4 / ... )
// --> 處理 靜態檔 相關的 requests
app.use( express.static(path.join(__dirname,"application")))

//// 使 express 解析 Form Data.
// [Body-Parser][1] 解析 application/json
app.use(bodyParser.json());

// [Body-Parser][2] 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extend: false,      // 是否用 額外套件 解析字串
    limit : "1mb",      // 限制 參數資料大小    
    parameterLimit : "10000"    // 限制參數個數
}))


app.get("/",function(req,res){
    // res.send("node.js servers")
    // [4] 使用 render 回傳 html 頁面
    res.render("index.html");
});

app.get("/shop",(req,res)=>{
    res.render("template.html");
});

app.get("/data",(req,res)=>{
    res.json({
        name : "cheng", 
        age : 19,
        message : "今天好熱喔～～"
    });
})
app.get("/about/us",(req,res)=>{
    res.render("aboutus.html")
})

//[module][3] 將 /books 的 resquest , 導入到 booksRouter 處理
app.use("/books" , booksRouter);
app.use("/about", aboutRouter);
app.use("/dramas", dramasRouter);

////////////////////////////////
// Middleware (中介函式)
app.get("/hello",(req,res,next)=>{
    console.log("我是 Middleware 1");
    // [1] 顯示前端 name 參數 
    console.log(`您是 ${req.query.name}`);

    // [2] Middleware 間 傳參數
    // req (request 物件) 上 設定資料
    req.test = { name:"Cheng", age:19 };

    let name = req.query.name;
    if(!name){
        res.json({
            message:"name 人呢？？？？"
        })
    }else{
        next();
    }
    // next();     //往下一個 Middleware 執行
 },
 (req,res,next)=>{
    console.log("我是 Middleware 2");
    console.log(`您今年 ${req.query.age} 歲`);
    next();
 },
 (req,res,next)=>{
    console.log("我是 Middleware 3");
    console.log("req.test: ", req.test);
    next();
 },
 (req,res)=>{
    console.log("我是 Middleware 4");
    // res.send("Hello 木瓜牛奶好好喝！！！！")
    res.json(req.test);
 }
);
////////////////////////////////
app.listen(portNum, ()=>{
    console.log('Server is runnung at http://localhost:'+portNum);
})