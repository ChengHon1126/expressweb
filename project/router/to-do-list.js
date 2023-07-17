const express = require("express");
var router = express.Router();
const models = require("../models");

// to-do-list 頁面清單
router.get("/page/list",(req,res)=>{
    let name = req.session.userInfo.name;
    res.render("to-do-list.html",{templateName: name});
});

// to-do-list 清單資料 response 給前端
router.get("/list",async (req,res)=>{
    try{
        let result = await models.todo.find({},{
            to_do_id: 1,subject:1,
            reserved_time: 1,brief:1,
            level: 1,author: 1, _id : 0
          });

          res.json({result:result});
    }catch(err){
        console.log(err);
        res.status(500).json({ message:"Server 端發生錯誤"});
    }
});

// 新增 to-do-list 畫面
router.get("/page/detail",(req,res)=>{
    let name = req.session.userInfo.name
    res.render("to-do-detail.html",{templateName: name});
});

// 新增 NewID 
router.get("/the-newest-id",async (req,res)=>{
    try{
        let lastToid = await models.todo.findOne({},{to_do_id :1}).sort({to_do_id:-1});
        let newestId = Number(lastToid.to_do_id) + 1;
        
        res.json({result : newestId});
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Server 端發生錯誤"});
    }
    // res.json({result:result});
})

// Post to-do-list /detail/:to_do_id
// 新增 payload 到資料庫 
router.post("/detail/:to_do_id",
    async (req,res)=>{
        try{
            let data = req.body;
            let result = await models.todo.create(data);
            console.log("新增結果：",result);
            res.json({message:"ok."})
        }catch(err){
            console.log(err);
            res.status(500).json({message:"Server 端發生錯誤"});
        }
})

router.get("/detail/:to_do_id", async (req,res)=>{
    try{
        let todoId = req.params.to_do_id;
        let result = await models.todo.findOne({to_do_id:todoId});
        res.json({result: result});
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Server 端發生錯誤"});
    }

    
});
router.delete("/detail/:to_do_id",async(req,res)=>{
    try{
        let todoId = req.params.to_do_id;
        let result = await models.todo.deleteOne({to_do_id:todoId});
        console.log("刪除結果：",result);
        res.json({message:"ok."});
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Server 端發生錯誤"});
    }

})
// to-do-list 待辦事項資料詳細
// router.get("detail/:to_do_id",(req,res)=>{
//     let id = req.params.to_do_id;
//     console.log(id);
// })





// to-do-list 清單頁面
// router.get("/page/list",
//     (req,res)=>{
//         res.render("to-do-list.html",{ 
//             templateName : req.session ? req.session.userInfo.name : ""
//         });
//     }
// );

// // to-do-list 細節頁面 
// router.get("/page/detail",
//     (req,res)=>{
//         res.render("to-do-detail.html",{
//             templateName : req.session ? req.session.userInfo.name : ""
//         });
//     }
// );

module.exports = router;