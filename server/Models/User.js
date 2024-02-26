import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min:6
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

export const User = mongoose.model("User", UserSchema)