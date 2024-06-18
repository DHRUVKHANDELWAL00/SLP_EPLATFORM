import {app} from './app'
import connectDB from './utils/db';
//create server
require("dotenv").config();
//cloudinary
import {v2 as cloudinary} from "cloudinary";
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    secret_key:process.env.CLOUD_SECRET_KEY,
})
app.listen(process.env.PORT,()=>{
    console.log(`listeinging on port ${process.env.PORT}`);
    connectDB();
})
// {
//   "compilerOptions": {
//     "module": "NodeNext",
//     "moduleResolution": "NodeNext"
//   }
// }