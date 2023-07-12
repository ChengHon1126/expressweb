const express = require("express");
const router = express();

router.get("/", (req,res)=>{
    res.send("/about 的路徑！")
})
router.get("/user", (req,res)=>{
    res.json({
        userName : "cheng",
        passWord : "123"
    })
})

// router.get("/us",(req,res)=>{
//     res.render("aboutus.html");
// })
module.exports = router;