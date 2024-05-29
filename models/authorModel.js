import mongoose from "mongoose";

const authorSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
});

const author = mongoose.model("AuthorCollection",authorSchema);

export default author;