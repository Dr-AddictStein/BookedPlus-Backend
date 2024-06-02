import mongoose from "mongoose";

const blogModel = mongoose.Schema(
  {
    thumbnail: {
      type: String,
      required: true,
    },
    thumbnailheadline: {
      type: String,
      required: true,
    },
    thumbnaildesc: {
      type: String,
      required: true,
    },

    headline: {
      type: String,
      required: true,
    },

    audio: {
      type:String
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AuthorCollection",
      required: true,
    },
    body: [
      {
        image: {
          type: String,
        },
        header: {
          type: String,
        },
        desc: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const blog = mongoose.model("blogCollection", blogModel);

export default blog;
