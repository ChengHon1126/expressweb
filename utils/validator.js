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

module.exports = {
    "isTokenExist" : isTokenExist,
    "isTokenValid" : isTokenValid
};