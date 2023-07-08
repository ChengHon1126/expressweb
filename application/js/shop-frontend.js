// alert("你好, 我是 js 檔");  //  跳出警示訊息。

// 等 HTML 上得標前完成, 才開始執行
// jQuery (Javascript 語法糖)
// 進階 -> Vue.js / React.js / Angular.js
$(function(){
    console.log("嗨嗨 , 我是 .js");

    // $("#wording").text("JS 修改文字～～～");

    setTimeout(()=>{
        $("#wording").text("JS 修改文字～～～");
    },1000)

    // 透過 class 綁定 click 事件 (事件聆聽)
    $(".test-btn").click(()=>{
        alert("按到按鈕！！！");

        // 前後端串接
        // 當 button 被 click 時, 向後端發 requests 取得 Object
        // ajax -> 非同步請求
        $.ajax({
            url  : "data",
            type : "GET"
        })
        .then(res=>{
            console.log(res);
            // 接到 response 後 , 發送 div
            $("#wording").after(`<div style="color:blue"> ${ res["message"] } </div>`)
        })
        .catch(err=>{
            console.log(err);
        });
    });
});