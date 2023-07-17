const models = require("../models/index");
// 檢查 account / passwd 是否 空白
exports.isaccountandPasswdExist = (req,res,next)=>{
    if(!req.body.account || !req.body.passwd){
        res.status(400).json({message: "請輸入帳號密碼"});
        return;
    }
    next();
}
// 檢查 account / passwd 是否與 mongodb 一致
exports.isUserValid =async (req,res,next)=>{
    try{
        let account = req.body.account;
        let passwd  = req.body.passwd; 
        let result  = await models.members.findOne({account});
        if(!(result["account"] === account && result["passwd"] === passwd)){
            res.status(400).json({message:"帳號密碼錯誤"});
            return;
        }
        next();
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Server 端發生錯誤"});
    }

};

exports.isDramaIdValid = async (req,res,next)=>{
    let dramaId = req.params.dramaId;
    let data = await models.dramas.findOne({dramaId});
    if(data === null ){
        console.log("DramaId 不存在");
        res.status(400).json({message:"Not Found ID"});
        return;
    }
    console.log(data);
    next();
}



// 檢查 是否為登入狀態
exports.checkLogined = (req,res,next)=>{
    if ( !req.session.userInfo || req.session.userInfo.isLogin !== true){
        res.redirect("/login");
        return;
    };
    next();
}