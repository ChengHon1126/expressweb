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

let readFilePromise = (dataPath)=>{
    return new Promise((resolve,reject)=>{
        fs.readFile(dataPath,"utf-8",(err,data)=>{
            if(err){
                reject("錯誤"+err);
            }else{
                resolve(JSON.parse(data));
            }
        })
    })
}
// 使用 Promise
router.get("/multi_data_promise",(req,res)=>{
    let output ={}
    readFilePromise("./models/data1.json")
    .then(data1=>{
        output["data1"] = data1;
        return readFilePromise("./models/data2.json")    
    })
    .then(data2=>{
        output["data2"] = data2;
        return readFilePromise("./models/data3.json")
    })
    .then(data3=>{
        output["data3"] = data3;
        return readFilePromise("./models/data4.json")
    })
    .then(data4=>{
        output["data4"] = data4;
        return readFilePromise("./models/data5.json")
    })
    .then(data5=>{
        output["data5"] = data5;
        output["message"] = "這是 Promise";
        res.json(output);
    })
    .catch(err=>{
        res.send("讀取錯誤"+err);
    })
})
// 使用 async/await 
router.get("/multi_data_await",async (req,res)=>{
    try{
        let result = {};
        let data1 = await readFilePromise("./models/data1.json");
        let data2 = await readFilePromise("./models/data2.json");
        let data3 = await readFilePromise("./models/data3.json");
        let data4 = await readFilePromise("./models/data4.json");
        let data5 = await readFilePromise("./models/data5.json");
        result["data1"] = data1;
        result["data2"] = data2;
        result["data3"] = data3;
        result["data4"] = data4;
        result["data5"] = data5;
        result["message"] = "這是用 Async/Await 方法"
        res.json(result)
    }
    catch(err){
        console.log(err);
        res.send("讀檔錯誤！！！");
    }
})


// [module][1]將 router 導出 , 等著別人引入使用。
module.exports =router;