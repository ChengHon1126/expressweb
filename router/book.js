//建立 router
const express = require("express");
const router = express.Router(); //產生Router 物件,存入變數。
const fs = require("fs");

// 路徑設定 / API設定
router.get("/",(req,res)=>{
    res.send("我是 /books 的跟路徑");
})
router.get("/pages",(req,res)=>{
    res.json({message : "我是 /book/pages 的路徑！"})
});

router.get("/data",(req,res)=>{
    fs.readFile("data.json","utf-8",(err,data)=>{ //err -> 錯誤資訊。 data -> 傳入資料。
        if(err){
            console.log(err);
            res.send("檔案有錯誤！！！！")
        }else{
            console.log(data);
            console.log(typeof(data))

            console.log("-".repeat(50))

            let result = JSON.parse(data); // 轉成 JSON (object) 資料型別
            console.log(result);
            console.log(typeof(result));
            res.json(result);
        }
    })
})
// [module][1]將 router 導出 , 等著別人引入使用。
module.exports =router;