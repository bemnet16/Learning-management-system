"use client";

import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import Image from "next/image";

interface imageFormProps {
  intialData: {
    imageUrl: string;
  };
  courseId: string;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, { message: "Image is required" }),
});

const ImageForm = ({ intialData, courseId }: imageFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((cur) => !cur);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.patch(`/api/courses/${courseId}`, values);
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
        Course Image
        <Button onClick={toggleEdit} variant={"ghost"}>
          {isEditing && <>Cancel</>}
          {!isEditing && intialData.imageUrl && (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              Change
            </>
          )}

          {!isEditing && !intialData.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Image
            </>
          )}
        </Button>
      </div>

      {!isEditing &&
        (!intialData.imageUrl ? (
          <div className="flex items-center justify-center bg-slate-200 rounded-md h-60">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
           <Image alt="upload image" src={intialData.imageUrl} fill className="object-cover rounded-md" />
          </div>
        ))}
      {isEditing && (
        <div>
            <FileUpload 
            endpoint="courseImage"
            onChange={(url) => {
                if(url){
                    onSubmit({imageUrl:url})
                }
            }}
            />
            <div className="text-xs mt-4 text-muted-foreground">
                16:9 aspect ration recommended
            </div>
        </div>
      )}
    </div>
  );
};

export default ImageForm;
