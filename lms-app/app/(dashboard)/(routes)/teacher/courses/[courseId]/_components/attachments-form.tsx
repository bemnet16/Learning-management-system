"use client";

import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { PlusCircle, File, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";

interface attachmentsFormProps {
  intialData: {
    attachments: string[];
  };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1, { message: "Image is required" }),
});

const AttachmentsForm = ({ intialData, courseId }: attachmentsFormProps) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [deletingUrl, setDeletingUrl] = useState<number | null>(null);

  const toggleEdit = () => setIsEditing((cur) => !cur);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.post(
        `/api/courses/${courseId}/attachments`,
        values
      );
      toast.success("successfully uploaded");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("something went wrong!!");
    }
  };

  const onDelete = async (attachmentIdx : number) => {  
    try {
      setDeletingUrl(attachmentIdx)
      console.log(typeof attachmentIdx)
     await axios.delete(`/api/courses/${courseId}/attachments/${attachmentIdx}`)
     toast.success("Attachment successfully deleted!")
      router.refresh()
    } catch (error) {
      toast.error("something went wrong!")
    }finally{
      setDeletingUrl(null)
    }
  }

  return (
    <div className="mt-6 bg-slate-100 border rounded-md p-4">
      <div className="font-semibold flex items-center justify-between">
        Course Attachments
        <Button onClick={toggleEdit} variant={"ghost"}>
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <PlusCircle className="w-4 h-4 mr-2" />
              Add file
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <>
          {intialData.attachments.length === 0 && (
            <p className="text-sm text-slate-500 italic">
              No course attachments yet!
            </p>
          )}
          {intialData.attachments.length > 0 && (
            <div className="space-y-2">
              {intialData.attachments.map((attachmentUrl, attachmentIdx) => {
                return (
                  <div
                    key={attachmentIdx}
                    className="flex items-center p-3 bg-sky-200 border-sky-200 text-sky-700 border rounded-md"
                  >
                    <File className="h-4 w-4 mr-2 flex-shrink-0" />
                    <p className="text-xs line-clamp-1 cursor-pointer">
                      {attachmentUrl}
                    </p>
                    {deletingUrl === attachmentIdx && (
                      <div className="ml-auto">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    )}
                    {deletingUrl !== attachmentIdx && (
                      <button onClick={() => onDelete(attachmentIdx)} className="ml-auto hover:opacity-75 transition">
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs mt-4 text-muted-foreground">
            Add anything your students might need to complete the course.
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentsForm;
