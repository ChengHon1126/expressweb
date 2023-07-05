const express = require("express");
const app = express();
const portNum = 3000;
//[module][2] 引入 /router/book.js 程式
const booksRouter = require("./router/book.js");
const aboutRouter = require("./router/about.js");

app.get("/",function(req,res){
    res.send("node.js servers12323")
});


//[module][3] 將 /books 的 resquest , 導入到 booksRouter 處理
app.use("/books" , booksRouter);
app.use("/about", aboutRouter);



app.listen(portNum, ()=>{
    console.log('Server is runnung at http://localhost:'+portNum);
})