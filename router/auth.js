const express = require("express");
const router = express();
const validator = require("../utils/validator");

router.post("/",
    // 1. 檢查 Account and passwd 是否存在
    validator.isAccountandPasswdExist,
    // 2. 檢查 Account and passwd 是否和 Server 端一致
    validator.isUserValid,
    // 3. 紀錄資料在 Session 上
    validator.setSessionInfo,
    // 4. response 回應前端
    (req, res, next) => {
        res.json({ message: "OK!!!" });
        console.log(req.session);
    }
)

module.exports = router;