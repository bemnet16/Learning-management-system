"use client";

import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { Pencil, PlusCircle, VideoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import  MuxPlayer,{ MaxResolution } from "@mux/mux-player-react"

interface chapterVideoFormProps {
  intialData: {
    videoUrl: string;
    playbackId: string;
  };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1, { message: "Video is required" }),
});

const ChapterVideoForm = ({ intialData, courseId, chapterId }: chapterVideoFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((cur) => !cur);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
      toast.success("successfully uploaded");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("something went wrong!!");
    }
  };

  return (
    <div className="mt-6 bg-slate-100 border rounded-md p-4">
      <div className="font-semibold flex items-center justify-between">
        Chapter Video
        <Button onClick={toggleEdit} variant={"ghost"}>
          {isEditing && <>Cancel</>}
          {!isEditing && intialData.videoUrl && (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              Change
            </>
          )}

          {!isEditing && !intialData.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Video
            </>
          )}
        </Button>
      </div>

      {!isEditing &&
        (!intialData.videoUrl ? (
          <div className="flex items-center justify-center bg-slate-200 rounded-md h-60">
            <VideoIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <MuxPlayer playbackId={intialData.playbackId ||  ""}  />
          </div>
        ))}
      {isEditing && (
        <div>
            <FileUpload 
            endpoint="chapterVideo"
            onChange={(url) => {
                if(url){
                    onSubmit({videoUrl:url})
                }
            }}
            />
            <div className="text-xs mt-4 text-muted-foreground">
               Upload this chapter video!
            </div>
        </div>
      )}
      {intialData.videoUrl && !isEditing &&(
        <div className="text-xs text-muted-foreground mt-4">
            Video can take a few minutes to process. Refresh the page if video doesn&apos;t appear.
        </div>
      )}
    </div>
  );
};

export default ChapterVideoForm;
