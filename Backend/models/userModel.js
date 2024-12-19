import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    BusinessName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: Number,
        required: true,
    },
    gstNumber: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
export default User;
