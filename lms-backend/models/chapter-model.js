import mongoose from "mongoose";

const chapterSchema = mongoose.Schema(
  {
    courseId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    title: String,
    description: String,
    videoUrl: String,
    assetId: String,
    playbackId: String,
    position: Number,
    isCompleted: {
      type: Map,
      of: Boolean,
      default: {},
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    isFree: {
      type: Boolean,
      default: false,
    },
    purchased: {
      type: Map,
      of: Boolean,
      default: {},
    },
    userProgress: {
      type: Map,
      of: Boolean,
      default: {},
    },
  },
  { timestamps: true }
);

const chapterModel = mongoose.model("Chapter", chapterSchema);

export default chapterModel;
