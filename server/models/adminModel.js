import mongoose from "mongoose";


const adminSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true
        },
        email : {
            type : String,
            required : true
        },
        password : {
            type : String,
            required : true
        },
        role: {
            type : String,
            required : true,
            default : 'Admin'
        }

    }
)

export const Admin = mongoose.model('Admin', adminSchema) 