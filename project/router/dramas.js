const express = require("express");
const models   = require("../models");
const validator = require("../utils/validator");


let router    = express.Router();

router.get("/page",(req,res)=>{
    let name = req.session.userInfo.name;
    res.render("dramas.html", { templateName : name});
});

///// Get dramas/list?type?=
router.get("/list",async (req,res)=>{
    try{
        // 連接資料庫
        // 在資料庫找 category 資料
        let category = req.query.type;
        let type = category==="全"?{} : {"category" : category};
        let result = await models.dramas.find(type);
        
        res.json({result:result});
        // response 回前端
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Server 端發生錯誤"});
    }
});

//// Post dramas/detail
//// payload {category: 犯罪 ,name: 123 ,score: 1.5}
router.post("/detail", async (req,res)=>{
    try{
        // 新增編號 MaxNum + 1 
        let lastElem = await models.dramas.findOne({},{dramaId:1}).sort({"dramaId":-1});
        let newDramaId = Number(lastElem.dramaId) + 1;
        req.body.dramaId = String(newDramaId);
        console.log(req.body);
        // 新增 req.body 到 dramas collection
        let result = await models.dramas.create(req.body);
        console.log("更新結果 ：",result);
        res.json({message:"ok."})
        
        // response 回前端
        // res.json({result :result});
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Server 端發生錯誤"});
    }
})

//// Put dramas/detail/:dramaId
//// payload {name: 111, score: 1}
router.put("/detail/:dramaId",
    validator.isDramaIdValid,
    async (req,res,next)=>{
        try{
            //// 取得 dramaId 中 
            let dramaId = req.params.dramaId;
            ////對應資料庫的資料 並更改為 payload 資料
            let result = await models.dramas.updateOne(
                {dramaId},
                {"$set": req.body
            })
            console.log("修改結果：",result);
            res.json({message: "ok."});
        }catch(err){
            console.log(err);
            res.status(500).json({message:"Server 端發生錯誤"});
        }
})


//// Delete dramas/detail/:dramaId
    router.delete("/detail/:dramaId",
    validator.isDramaIdValid,
    async (req,res,next)=>{
        try{
            let dramaId = req.params.dramaId;
            let result = await models.dramas.deleteOne({dramaId});
            console.log("刪除結果：" , result);
            res.json({message:"ok."});
        }catch(err){
            console.log(err);
            res.status(500).json({message:"Server 端發生錯誤"});
        }
    }
)



// router.get("/page",
//     (req,res)=>{
//         let name = req.session.userInfo.name;
//         res.render("dramas.html",{ templateName : name });
//     }
// );


// router.get("/list",
//     (req,res)=>{
//         let category = req.query.type;
//         let query    = (category && category !== "全") ? { category } : {};
//         model.dramas
//              .find(query,{_id : 0 , __v : 0})
//              .then(result=>{
//                  res.json({result});
//              })
//              .catch(err=>{
//                  res.status(500).json({message:"Server internal fault."});
//              });
//     }
// );


// router.post("/detail",
//     (req,res)=>{
//         model.dramas
        
//             ////// 和下方邏輯相同 
//             //  .find({},{"dramaId":1})
//             //  .sort({"dramaId":-1})
//             //  .limit(1)
//             //////
//              .findOne({},{"dramaId":1})
//              .sort({"dramaId":-1})
//             //////
            
//              .then(ele=>{
//                 let newDramaId      = Number(ele.dramaId) + 1 ;
//                 req.body["dramaId"] = String(newDramaId);
//                 return model.dramas.create(req.body);
//              })
//              .then(result=>{
//                  res.json({message:"ok."});
//              })
//              .catch(err=>{
//                  console.log(err);
//                  res.status(500).json({message:"Server internal fault."});
//              });
//     }
// );



module.exports = router;