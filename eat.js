console.log("要不要吃宵夜？");
let eat = ()=>{
    return new Promise((resolve, resject)=>{
        setTimeout(()=>{
            if(Math.random()>0.5){
                resolve("吃！");
            }else{
                resject("不吃！");
            }
        },3000)
    })
};

eat()
    .then(result=>{
        console.log(result);
    })
    .catch(err=>{
        console.log(err);
    });