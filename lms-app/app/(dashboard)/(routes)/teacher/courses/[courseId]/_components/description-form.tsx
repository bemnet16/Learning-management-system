"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface descriptionFormProps {
  intialData: {
    description: string;
  };
  courseId: string;
}

const formSchema = z.object({
  description: z.string().min(1, { message: "Course description is required" }),
});

const DescriptionForm = ({ intialData, courseId }: descriptionFormProps) => {
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
      const res = await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("successfully updataed");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("something went wrong!!");
    }
  };

  return (
    <div className="mt-6 bg-slate-100 border rounded-md p-4">
      <div className="font-semibold flex items-center justify-between">
        Course Description
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
      {!isEditing && <p className={cn("mt-2 text-sm", !intialData.description && "text-slate-500 italic")}>{intialData.description || "No Descriptions"}</p>}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 mt-4"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-sm text-slate-600">
                      fill course description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isSubmitting}
                        placeholder="e.g. This course is about...."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      <FormMessage />
                      Give description for your course.
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

export default DescriptionForm;
