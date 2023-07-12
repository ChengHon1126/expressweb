const express = require("express");
const fs = require("fs");
const router = express.Router();
const validator = require("../utils/validator.js");
// 此時 validator 變數即為 {
//     "isTokenExist" : isTokenExist,   // value 為 middleware 本人
//     "isTokenValid" : isTokenValid
// };

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
// .use -> request 100% 會經過的 Middleware
// router.use(
//     validator.isTokenExist,
//     validator.isTokenValid
// )
// GET /dramas/list  --> 取得資料
// [work1] 加入參數檢查 Middleware
// [work3] 使用 公用的 Middleware（實名 Middleware）
router.get("/list",
    /////////////// 使用 validator.js 的 Middleware 
    // validator.isTokenExist,
    // validator.isTokenValid,

    // 1. 檢查 type 參數 是否存在
    (req,res,next)=>{
        if(!req.query.type){
            // 調整 status_code = 400 --> 前端接到 才會跳到 error 區的程式。
            res.status(400).json({ message: "Type 人呢？？？"});
        }else next();
    },

    // 2. 檢查 type 參數值 是否正確
    (req,res,next)=>{
        let data = ["犯罪","殭屍","愛情","政治","其他","全"];

        if(data.indexOf(req.query.type) === -1){
            console.log("資料有誤");
            res.status(400).json({ message: "Type資料有誤！！！！！！" });
        }else next();
    },

    // 最後的 Middleware (處理業務邏輯)
    async (req, res) => {     
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
// [work2] 加入 token 檢查
router.post("/detail",
    // /////////////// 使用 validator.js 的 Middleware 
    // validator.isTokenExist, //檢查 token 是否存在
    // validator.isTokenValid, //檢查 token 是否正確
    async (req, res) => {
        try {
            
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