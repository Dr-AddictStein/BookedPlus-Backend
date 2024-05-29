import mongoose from "mongoose";

const blogModel = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    thumbnailtitle: {
      type: String,
      required: true,
    },
    blogheader: {
      type: String,
      required: true,
    },
    audio: {
      type: String,
      // required:true
    },
    author: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"AuthorCollection",
        required:true
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const blog = mongoose.model("blogCollection", blogModel);


export default blog;