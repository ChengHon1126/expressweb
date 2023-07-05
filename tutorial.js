// 同步 非同步處理機制
// 處理讀取檔案
const fs = require("fs");
// 註解多行 option + shift + A
 /* 
let data1 = fs.readFileSync("./models/data1.json","utf-8");
console.log("data1 已完成！");
let data2 = fs.readFileSync("./models/data2.json","utf-8");
console.log("data2 已完成！");
let data3 = fs.readFileSync("./models/data3.json","utf-8");
console.log("data3 已完成！");
 */
// 註解單行 commad + C
// 區塊註解 commad + K + C , 取消 commad + K + U
// console.log(JSON.parse(data1));
// console.log(JSON.parse(data2));
// console.log(JSON.parse(data3));



///////////////////////////////////////
// 2. 使用 Promise
// 1) 宣告 Promise
// let readFilePromise = (dataPath)=>{
//     return new Promise((resolve,reject)=>{
//         fs.readFile(dataPath, "utf-8", (err,data)=>{
//             if(err){
//                 reject(err);
//             }else{
//                 resolve(data);
//             };
//         });
//     });
// };

// readFilePromise("./models/data1.json")
//     .then(result=>{
//         console.log(result);
//     })
//     .catch(err=>{
//         console.log(err);
//     });

// Promise 特性
// flipCoin function
let flipCoin = ()=>{
    return new Promise((resolve, reject)=>{
        // 延遲時間 執行, 以毫秒 (ms) 為單位。
        setTimeout(()=>{
            if(Math.random()>0.2){
                resolve("上課囉！！");
            }else{
                reject("翹課哩 -.-");
            }
        }, 500)
    });
};

// flipCoin()
//     .then(result=>{
//         console.log("我是 flipCoin function 的 .then 區！"); 
//         console.log(result);
//     })
//     .catch(err=>{
//         console.log("我是 flipCoin function 的 .catch 區！");
//         console.log(err)
//     });


// .then() 可以執行多行，
// flipCoin()
//     .then(result =>{
//         console.log("-".repeat(30));
//         console.log("我是 fliptCoin function 的 .then 區！")
//         console.log(result);
//     })
//     .then(r1 =>{
//         console.log("r1 :"+r1);
//     })
//     .then(r2 =>{
//         console.log("r2 :"+r2);
//         return "ABCD"; // retrun 回傳值會丟給下一個 .then , So r3 = "ABCD".
//     })
//     .then(r3 =>{
//         console.log("r3 :"+ r3);
//     })
//     .catch(err=>{
//         console.log("我是 fliptCoin function 的 .catch 區！")
//         console.log(err);
//     })

// PromiseAll
// a) 全部都完成 (fulfilled, 成功狀態) , 進入 .then  區。
// b) 只要有一個失敗 rejected, 失敗狀態 , 進入 .catch 區。
// Promise.all([
//     flipCoin(),
//     flipCoin(),
//     flipCoin()
// ]).then(result=>{
//     console.log("我是 Promise.all 的 .then 區");
//     console.log(result);
// }).catch(err=>{
//     console.log("我是 Promise.all 的 .catch 區");
//     console.log(err);
// })

// 使用 Promise 讀取多個檔案
// let output = {};
// readFilePromise("./models/data1.json")
//     .then(data1=>{
//         output["data1"] = data1;
//         return readFilePromise("./models/data2.json");
//     })
//     .then(data2 => {
//         output["data2"] = data2;
//         return readFilePromise("./models/data3.json");
//     })
//     .then(data3 =>{
//         output["data3"] = data3;
//         return readFilePromise("./models/data4.json");
//     })
//     .then(data4 =>{
//         output["data4"] = data4;
//         return readFilePromise("./models/data5.json");
//     })
//     .then(data5 =>{
//         output["data5"] = data5;
//         console.log(output);
//     })
//     .catch(err =>{
//         console.log("讀取檔案失敗"+ err);
//     })

// 使用 asyc/await 
let main = async ()=>{
    try{
        let r = await flipCoin(); // 轉成 '同步' 語言 --> 執行完才會往下走。
        console.log("OK" +r);
    }catch(err){
        console.log(err);
    }
};
main();

let FilePromise = (dataPath)=>{
    return new Promise((resolve,reject)=>{
        fs.readFile(dataPath, "utf-8",(err,data)=>{
            if(err){
                reject("讀取失敗！！"+ err);
            }else{
                resolve(JSON.parse(data));
            }
        })
    }
)};

//使用 (async/await) 方法
let readfile = async()=>{
    
    try{
        // 1. 使用 await 轉成 '同步'語法, 執行完才會往下。
        // 2. await 後的 function 必須要 return Promise。
        // 3. await 要在 async function 裡才能執行。
        // 4. 使用 try-catch 錯誤處理（取代 .then / .catch）

        let output1  = {};
        let data1 = await FilePromise("./models/data1.json");
        let data2 = await FilePromise("./models/data2.json");
        let data3 = await FilePromise("./models/data3.json");
        let data4 = await FilePromise("./models/data4.json");
        output1["data1"] = data1;
        output1["data2"] = data2;
        output1["data3"] = data3;
        output1["data4"] = data4;
        console.log(output1);
    }
    catch(err){
        console.log(err);
    }
};
readfile();