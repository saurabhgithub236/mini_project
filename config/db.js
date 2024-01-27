import mongoose  from "mongoose";

const connectDB= async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to database successfully ${conn.connection.host}`.bgMagenta.white)
    } catch (error) {
        console.log(`error connecting to mongodb ${error}`.bgRed.white);
    }
};

export default connectDB;