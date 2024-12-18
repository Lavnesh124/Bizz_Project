import mongoose from "mongoose";

const connectDB = async () => {
    try {
        console.log(process.env.MONGO_URI)
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongoDB is connected");
    }
    catch (err) {
        console.log(err);
    }
}
export default connectDB;
