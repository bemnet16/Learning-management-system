"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";

import { Pencil } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ChapterTitleFormProps {
  intialData: {
    title: string;
  };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  title: z.string().min(1, { message: "Chapter title is required" }),
});

const ChapterTitleForm = ({
  intialData,
  courseId,
  chapterId,
}: ChapterTitleFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((cur) => !cur);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: intialData,
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
      toast.success("successfully updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("something went wrong!!");
    }
  };

  return (
    <div className="mt-6 bg-slate-100 border rounded-md p-4">
      <div className="font-semibold flex items-center justify-between">
        Chapter Title
        <Button onClick={toggleEdit} variant={"ghost"}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className="mt-2 text-sm">{intialData.title}</p>}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-sm text-slate-600">
                      fill chapter title
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="e.g. Introduction to the course"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      <FormMessage />
                      Give title for your chapter.
                    </FormDescription>
                  </FormItem>
                );
              }}
            />
            <div className="flex items-center justify-end gap-x-2 ml-auto">
              <Button type="submit" disabled={!isValid || isSubmitting}>
                save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default ChapterTitleForm;
