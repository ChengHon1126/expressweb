////// mongoose 操作
const mongoose = require("mongoose");

//// 1. 建立連線 （connection）
const connConfig = "mongodb://127.0.0.1:27017/nodejs-tutorial"
const conn = mongoose.createConnection(connConfig);

// 一旦連線成功 觸發 callback function
conn.on("connected", ()=>{
    console.log("MongoDB is connected")
})
//// 2. 建立 Schema & Models
//  建立 Schema
let dramaSchema = new mongoose.Schema({
    "dramaId"  : String,
    "category" : String,
    "name"     : String,
    "score"    : Number
},{
    collection : "dramas-table"     //要操作的 collection (table)名稱
});
// {
    //     "_id" : ObjectId("64ad706b3a7cf5f21c38b287"),
    //     "dramaId" : "1002",
    //     "category" : "殭屍",
    //     "name" : "屍戰朝鮮",
    //     "score" : 9.0
    // }

// 建立 Models 物件 (在 conn 連線上, 註冊一個物件)
// ( Node.js 透過 Model 物件 和 collections 互動 (和表格互動))
let dramaModel = conn.model("Dramas", dramaSchema);


//// 3. 透過 Model物件 操作CRUD 
// 非同步操作 --> 使用 Promise 處理
// dramaModel.find({"category":"政治"},{"dramaId":1,"category":1})
//           .then(data=>{
//             console.log(data)
//             conn.close();
//           })
//           .catch(err=>{
//             console.log(err);
//           });

// 非同步操作 --> 使用 Async / await
// let main = async () => {
//   try{
//     // let data = await dramaModel.find();
//     // console.log(data);
    
//     let data2 = await dramaModel.find(
//       { category : "殭屍"},
//       {category: 1, name:1, score: 1, _id:0}
//       );
//       console.log(data2);
//     conn.close();
//   }catch(err){
//     console.log(err);
//     conn.close();
//   }
// }

// main();

///////////////////////////////
// 建立 2nd Schema / Model

const memberSchema = new mongoose.Schema({
  "name": String,
  "age" : Number,
  "math_socre" : Number
},{
  collection : "members",
  versionKey : false
});
const memberModel = conn.model("Member",memberSchema);
/*
let findMember = async ()=> {
  try{
    //使用不同的 model 操作不同的 collection.
    // let data = await memberModel.find({ "math_socre":{"$gte":60}});
    let data = await dramaModel.find({}); 


    console.log(data)

    conn.close();
  }catch(err){
    console.log(err);
  }
};

findMember();
*/


// 新增資料
// let insertMember = async () =>{
//   try{
//     let result = await memberModel.create({"name":"kellyy","math_socre":70});
//     console.log(result);
//     conn.close();
//   }catch(err){
//     console.log(err);
//   }
// };
// insertMember();

// 刪除資料
// let deleteMember = async() =>{
//   try{
//     let result = await memberModel.deleteOne({
//       "__v" : 0
//     });
//     console.log("OK!",result);
//   }catch(err){
//     console.log(err);
//   }
// };


// deleteMember();

// 更新資料
// let updateMember = async()=>{
//   try{
//     let result = await memberModel.updateOne(
//       {"name" : "kellyy"},
//       {"$set" : {
//         "age" : 24
//       }}
//     );
//     console.log("OK!", result);
//   }catch(err){

//   }
// };

// updateMember();

let tset = async()=>{
  try{
    let data = await dramaModel.findOne({},{"dramaId":1}).sort({"dramaId":-1});
    console.log(data["dramaId"]);

    conn.close();
  }catch(err) {
    console.log(err);
  }

}
tset();