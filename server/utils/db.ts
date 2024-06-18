import mongoose from "mongoose";
require('dotenv').config()
const url:string=process.env.MONGODB || '';
const connectDB=async()=>{
    try {
        await mongoose.connect(url).then((data:any)=>{
            console.log(`database connected with ${data.connection.host}`);
            
    })
    } catch (error:any) {
        console.log(error.message);
        setTimeout(connectDB,5000)
        
    }
}
export default connectDB;