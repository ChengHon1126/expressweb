const express = require("express");
const fs = require("fs");
const router = express.Router();

let readFilePromise = (dataPath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(dataPath, "utf-8", (err, data) => {
            if (err) reject(err);
            else resolve(JSON.parse(data));
        })
    })
}

// /dramas/page -> 回傳 dramas.html
router.get("/page", (req, res) => {
    res.render("dramas.html");
});
router.get("/list", async (req, res) => {       //RESTful API  !!!!!!
    // router.get("/getDramaListData",async(req,res)=>{    // API 不佳
    // res.json({ message: "嗨嗨～～～"});

    // 純讀取 models/sample2.json , response 給前端
    // try{
    //     let data = await readFilePromise("models/sample2.json");
    //     res.json({ result : data });
    // }catch{
    //     res.status(500).json({ message : "資料有問題"});
    // }

    // 讀取 models/sample2.json 
    // 再透過 type 過濾資料 , 最後 response 給前端
    try {
        let data = await readFilePromise("models/sample2.json");
        let type = req.query.type;
        //過濾資料
        if (type === "全") {
            res.json({ result: data })
        } else { 
            let filtereData = data.filter(ele => ele["category"] === type);
            res.json({ result: filtereData });
        }
    } catch (err) {
        ///// Status code 整理
        // 2xx --> 請求 ok
        // 3xx --> 請求 ok , 但資源換位置 , response 會告訴你下一個位置
        // 4xx --> Client 端問題, ex: 參數帶錯
        // 5xx --> Server 端問題, ex: app.js 出現 bug
        res.status(500).json({ message: "資料有問題" });
    }
});

// POST /dramas/CreateNewDramaData  --> 新增資料 
router.post("/data", async (req, res) => {      // RESTful API  !!!!
    // router.post("/createNewDramaData",async (req,res)=>{  // API 不佳
    try {
        ////////// 1) 不管 dramaID
        // 將 req.body （Form Data）寫入到 sample2.json 裡
        // // 1. 先讀出此 Array
        // let data = await readFilePromise("models/sample2.json");

        // // 2. 使用 .push
        // data.push(req.body);

        // // 3. 再把 資料寫出去 sample2.json (同步處理) , 因為 data 為陣列 array 所以需要將它轉為字串。
        // fs.writeFileSync("models/sample2.json", JSON.stringify(data),"utf8");


        // res.json({message:"ok."});
        ////////// 2) 新增 dramaID  （Primary Key, 主鍵）
        // 1. 先讀出此 Array
        let data = await readFilePromise("models/sample2.json");

        // 2. 使用 .push
        // data --> [{},{},{},{},....]
        // 需抓出最新的 dramaID
        let latestDramaID = data.map( ele=> ele["dramaId"])     // 取得 dramaID
                                .filter(v=> v!== undefined)     // 過濾 undefined 資料
                                .sort((a,b)=>b-a)[0];           // 由大到小 排序

        let newDramaID =  Number(latestDramaID) + 1; // 因 latestDramaID 為字串
        req.body.dramaId =  String(newDramaID);     // 因 newDramaID 為整數

        data.push(req.body);

        // 3. 再把 資料寫出去 sample2.json (同步處理) , 因為 data 為陣列 array 所以需要將它轉為字串。
        fs.writeFileSync("models/sample2.json", JSON.stringify(data), "utf8");


        res.json({ message: "ok." });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "系統有問題。" })
    }
});

module.exports = router;