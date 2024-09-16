import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
            maxLength : 50 
        },
        email : {
            type : String,
            required : true,
            unique : true,
            minLength : 3,
            maxLength : 50 
        },
        password : {
            type : String,
            required : true,
            minLength : 6,
        },
        phone : {
            type : String,
            minLength : 10,
            maxLength: 15
        },
        location: {
            type : String,
            required:true,
        },
        about: {
            type : String,
            required:true,
        },
        profilePic : {
            type : String,
        },
        role: {
            type: String,
            default : "user"
        },
        cars : [{ type : mongoose.Types.ObjectId, ref : "Car"}]
    },
    {
        timestamps : true
    }
)

export const User = mongoose.model("User", userSchema) 