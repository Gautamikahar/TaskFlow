// //so this is the library which it will find from the node_modules 


// const mongoose = require("mongoose");
// console.log("db.js loaded");
// //whenever the node find this file it will immediatly tries 
// // to connect so instead we make a function so that whenever 
// // we call it  , it will call then only and execute 
// const connectDB = async () => {
//     try {
//         //await will wait until the connection is establised 
//         console.log(process.env.MONGO_URI);
//         await mongoose.connect(process.env.MONGO_URI);
//         console.log("MongoDB connected succesfully ");

//     }catch(error){
//         console.log("Database Connection Failed");
//         console.log(error.message);
        
//         //1 means the the program ended because of an error
//         process.exit(1);
//     }
// };
// console.log("About to export:", connectDB);
// module.exports = connectDB;
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        console.log("1. About to connect...");

        await mongoose.connect(process.env.MONGO_URI);

        console.log("2. MongoDB Connected Successfully");

    } catch (error) {
        console.log("3. Database Connection Failed");
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;