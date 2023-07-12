const express = require("express");
const router = express.Router();
const model = require("../models"); // require 為資料夾的話, 預設會去找 index.js.

// /dramas/page -> 回傳 dramas.html
router.get("/page", (req, res) => {
    res.render("dramas.html");
});

// Get /list?type={} --> 取得資料
router.get("/list",async (req,res)=>{
    try{
        // 全部搜尋
        // let data = await model.dramas.find({});

        // type 搜尋
        let condition = req.query.type ==="全" ?{} : {category : req.query.type};
        let data = await model.dramas.find(condition);
        res.json({result: data});
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Server 端發生錯誤"})
    }
});

// Post /detail  --> 新增資料
// payload : { category:.. ,name: .. , score: ..  }
router.post("/detail",async (req,res)=>{
    try{
        // 1. 取得最新 dramaId
        let lastElem = await model.dramas.findOne({},{
            "dramaId":1}).sort({"dramaId":-1});
        let newElem = Number(lastElem["dramaId"])+1;
        req.body["dramaId"] = String(newElem);
        // 2. 新增資料
        let result = await model.dramas.create(req.body);
        console.log("更新結果", result);

        res.json({message:"ok."});
        
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Server 端發生錯誤"});
    }
})


// Put /detatil/:dramaId --> 修改資料
// payload :{name: AAA, score: 1}
router.put("/detail/:dramaId",async (req,res)=>{
    try{let dramaId = req.params.dramaId;
    let result = await model.dramas.updateOne(
        {dramaId},{"$set": {"name":req.body.name, "score": req.body.score}}
    );
    console.log("更新結果 ：",result);

    res.json({message :"ok."});
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Server 端發生錯誤"});
    }
})



// delete /detail/:dramaId --> 刪除資料
router.delete("/detail/:dramaId",async(req,res)=>{
    try{
        let dramaId = req.params.dramaId;
        // console.log(dramaId);
        let result = await model.dramas.deleteMany(
            {"dramaId": dramaId }
        );

        res.json({message:"ok."});
        console.log("刪除結果：",result);
        }catch(err){
            console.log(err);
            res.status(500).json({message:"Server 端發生錯誤"});
    }
})
module.exports = router;