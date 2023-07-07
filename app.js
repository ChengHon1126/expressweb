const express = require("express");
const path = require("path");
const hbs = require("hbs"); //npm install hbs;
const app = express();
const portNum = 3000;
//[module][2] 引入 /router/book.js 程式
const booksRouter = require("./router/book.js");
const aboutRouter = require("./router/about.js");

// [1] 設定模板引擎 (解析 html 檔 , 讓 express 讀懂)
// hbs -> hadle bars. 為一種模板引擎
app.engine("html", hbs.__express);

// [2] 是定模板 (template) 位置 
app.set("views", path.join(__dirname, "application","views"))

// [3] 設定靜態檔的位置, (讀取 *.css/ *.js / *.jpg / *.png / *.mp4 / ... )
app.use( express.static(path.join(__dirname,"application")))

app.get("/",function(req,res){
    // res.send("node.js servers")
    // [4] 使用 render 回傳 html 頁面
    res.render("index.html");
});


//[module][3] 將 /books 的 resquest , 導入到 booksRouter 處理
app.use("/books" , booksRouter);
app.use("/about", aboutRouter);



app.listen(portNum, ()=>{
    console.log('Server is runnung at http://localhost:'+portNum);
})