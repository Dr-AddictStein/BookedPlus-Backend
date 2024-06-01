import mongoose from "mongoose";

const authorSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
},{timestamps:true});

const author = mongoose.model("AuthorCollection",authorSchema);

export default author;