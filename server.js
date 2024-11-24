import app from './app.js'
import connectionToDB from './config/connectionTODB.js';
import cloudinary from 'cloudinary'

cloudinary.v2.config({
  cloud_name: process.env.CNAME ,
  api_key: process.env.CAPIKEY,
  api_secret: process.env.CSECRET,
});


const PORT = process.env.PORT || 5000;

app.listen(PORT,async()=>{
    await connectionToDB();
    console.log(`App is running at http:localhost:${PORT}`);
});