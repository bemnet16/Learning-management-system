import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized user detected!");}

  return { userId };
};

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(({metadata,file}) => {console.log(file.url)}),

  courseAttachment: f(["image","video","text","pdf","audio"])
  .middleware(() => handleAuth())
  .onUploadComplete(()=>{}),

  chapterVideo: f({video : {maxFileCount: 1, maxFileSize: "2GB"}})
  .middleware(()=>handleAuth())
  .onUploadComplete(()=>{})
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
