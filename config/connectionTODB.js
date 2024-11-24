import { mongoose } from "mongoose";

const connectionToDB = async () =>{
    try{
        const {connection} = await mongoose.connect(
            process.env.MONGO_URI  
        )
        if(connection){
            console.log('connected to MONGODB');
        }
    }catch(e){
        console.log(e);
        process.exit(1);
    }
}

export default connectionToDB;