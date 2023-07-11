var changeErrMsgState = function(msg){
    $("#err-message").text(msg);
};

$(function(){

    $(".login input").keyup(function(){
        changeErrMsgState("");
    });

    $("#login-btn").click(function(){
        var account = $("#account").val();
        var passwd  = $("#passwd").val();

        // 瀏覽器 處理發 requset 的套件
        axios.post("/auth",{ account , passwd })
             .then(function(res){
                var message = res.data.message;
                changeErrMsgState(message);
                // 如果 data.redirect 存在 -> 瀏覽器跳轉到 下一個路徑
                // location.herf --> 瀏覽器移動的路徑
                if(res.data.redirect) location.href= res.data.redirect;
             })
             .catch(function(err){
                 var message = err.response.data.message;
                 changeErrMsgState(message);
             });
    });
});