const express =require("express");
const router = express.Router();
const model = require("../models");
const validator = require("../utils/validator");

router.post("/",
    /// 檢查是否有輸入 帳密
    validator.isaccountandPasswdExist,
    
    /// 檢查 帳密 是否正確
    validator.isUserValid,

    // 設定 sessionInfo
    async (req,res,next)=>{
        let account = req.body.account;
        let name =await model.members.findOne({account});
        req.session.userInfo = {
            name: name["account"],
            isLogin : true
        }
        next();
    },
    (req,res)=>{
        res.json({ 
            message:"OK",
            redirect : "/"
        });
    }
)
module.exports = router;