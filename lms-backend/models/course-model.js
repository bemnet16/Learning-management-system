import mongoose from "mongoose";

const courseSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      reqiured: true,
    },

    description: String,

    imageUrl: String,

    attachments: {
      type: [{ type: String }],
      default: [],
    },
    purchased: {
      type: Map,
      of: Boolean,
      default: {},
    },

    price: {
      type: Number,
      default: 0,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },

    categoryId: String,
  },
  { timestamps: true }
);

const courseModel = mongoose.model("Course", courseSchema);

export default courseModel;
