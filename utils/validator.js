const session = require("express-session");

 // 1. 檢查 headers 是否有 token
 let isTokenExist = (req, res, next) => {    
    if( !req.headers["x-cheng-token"] ){
        console.log("[Middleware 1] 無 token 值")
        res.status(400).json({message: "token 人呢？！？！？！？"});
    }else next();
}

// 2. 檢查 token 值 是否正確
let isTokenValid =( req, res, next)=>{
    if( req.headers["x-cheng-token"] !== "NODEJS"){

        // status_code -> 403 , 表示無權限 (Fornidden.)
        res.status(403).json({message: "您沒有權限！！！！！"});
    }else next();
}


let isAccountandPasswdExist = (req,res,next)=>{
    if(!req.body.account || !req.body.passwd){
        res.status(400).json({ message: "帳號 or 密碼 人呢？？？" })
    }else{
        next();
    }
}


let isUserValid = (req,res,next)=>{
    if(!(req.body.account==="cheng"&&req.body.passwd==="123")){
        res.status(400).json({message:"帳號 or 密碼 錯誤"});
    }else{
        next();
    }
}


let setSessionInfo = (req,res,next)=>{
    console.log("userInfo")
    req.session.userInfo= {
        name : "cheng",
        isLogined : true
    }
    console.log(req.session);
    next();
}

module.exports = {
    "isTokenExist" : isTokenExist,
    "isTokenValid" : isTokenValid,
    "isAccountandPasswdExist" : isAccountandPasswdExist,
    "isUserValid" : isUserValid,
    "setSessionInfo": setSessionInfo
};