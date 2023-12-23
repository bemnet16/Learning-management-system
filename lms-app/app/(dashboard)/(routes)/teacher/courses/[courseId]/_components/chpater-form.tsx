"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

import { Loader2, PlusCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChaptersList } from "./chpaters-list";

interface chapterFormProps {
  courseChapters: {
    title: string;
    _id: string;
    isPublished: boolean;
    position: number;
    isFree: string;
  }[];
  courseId: string;
}

const formSchema = z.object({
  title: z.string().min(1, { message: "chapter title is required" }),
});

const ChapterForm = ({ courseChapters, courseId }: chapterFormProps) => {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleCreating = () => {
    setIsCreating((cur) => !cur);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.post(`/api/courses/${courseId}/chapters`, {
        ...values,
        position: courseChapters.length,
      });
      toast.success("successfully Created");
      toggleCreating();
      router.refresh();
    } catch (error) {
      toast.error("something went wrong!!");
    }
  };

  const onReorder = async (updatedData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);
      await axios.patch(
        `/api/courses/${courseId}/chapters/reorder`,
        updatedData
      );
      toast.success("reorderd seccessfully");
    } catch (error) {
      toast.error("something went wrong, can't reorder chapters!");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (chapterId: string) => {
    router.push(`/teacher/courses/${courseId}/chapters/${chapterId}`)
  }

  return (
    <div className="relative mt-6 bg-slate-100 border rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full right-0 top-0 bg-slate-600/20 flex items-center justify-center rounded-md">
          <Loader2 className="animate-spin h-8 w-8 text-sky-700"/>
        </div>
      )}
      <div className="font-semibold flex items-center justify-between">
        Course Chapters
        <Button onClick={toggleCreating} variant={"ghost"}>
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              add chapter
            </>
          )}
        </Button>
      </div>
      {isCreating && (
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
                      give chapter title
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="e.g. Introduction to chapter"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      <FormMessage />
                      Give title for this Chapter.
                    </FormDescription>
                  </FormItem>
                );
              }}
            />
            <div className="flex items-center justify-end gap-x-2 ml-auto">
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Create
              </Button>
            </div>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !courseChapters.length && "text-slate-500 italic"
          )}
        >
          {!courseChapters.length && "No Chapters"}
          {courseChapters.length > 0 && (
            <ChaptersList
              onEdit={onEdit}
              onReorder={onReorder}
              items={courseChapters || []}
            />
          )}
        </div>
      )}
      {!isCreating && (
        <div className="text-xs text-muted-foreground mt-4">
          Drag and drop to reorder the chapters
        </div>
      )}
    </div>
  );
};

export default ChapterForm;
