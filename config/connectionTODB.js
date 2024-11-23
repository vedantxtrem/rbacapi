import { mongoose } from "mongoose";

const connectionToDB = async () =>{
    try{
        const {connection} = await mongoose.connect(
            "mongodb://localhost:27017"  
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