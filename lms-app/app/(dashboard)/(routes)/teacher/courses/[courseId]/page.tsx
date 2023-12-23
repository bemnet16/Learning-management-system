// "use client"

import { IconBadge } from "@/components/icon-bage";
import { auth } from "@clerk/nextjs";
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from "lucide-react";
import { redirect } from "next/navigation";

import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-form";
import ImageForm from "./_components/image-form";
import CategoryForm from "./_components/category-form";
import PriceForm  from "./_components/price-form";
import AttachmentsForm from "./_components/attachments-form";
import ChapterForm from "./_components/chpater-form";
import { Banner } from "@/components/banner";
import { Actions } from "./_components/actions";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();

  if (!userId) {  
    redirect("/");
  }

  const courseRes = await fetch( `${process.env.BACK_END_URL}/api/courses/${params.courseId}`);
  const course = await courseRes.json();

  const categoryRes = await fetch( `${process.env.BACK_END_URL}/api/category`)
  const categories = await categoryRes.json()

  // interface chapterType{
  //   title: string,
  //   isPublished: Boolean,
  //   _id: string,
  //   position: number
  // }

  const courseChaptersRes = await fetch( `${process.env.BACK_END_URL}/api/chapters/${params.courseId}`);
  const courseChapters :{title: string, _id: string, isPublished: boolean, position: number, isFree: string}[]= await courseChaptersRes.json()

  // courseChapters.sort((a,b) => a.position - b.position)
  
  const publishedChapters = courseChapters.some((chapter) => chapter.isPublished)


  if (!course) {
    redirect("/");
  }

  if (course.userId !== userId) {
    redirect("/");
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    publishedChapters
    // courseChapters.some((chapter) => chapter.isPublished)
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `${completedFields}/${totalFields}`;

  const isComplete = requiredFields.every(Boolean)

  return (
    <>{!course.isPublished  && (
      <Banner label="The course is not published. It will not be visible to the students!"/>
    )}
    {course.isPublished && (
      <Banner label="The course is Published. It is visible to the students." variant="success" />
    )}
    <div className="p-6 ">
      <div className="flex items-center justify-between bg-green-200 rounded-lg p-6">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-semibold">Course Setup</h1>
          <span className="text-sm text-slate-700">
            Complete all fields {completionText}
          </span>
        </div>
        <Actions 
         disabled={!isComplete}
         courseId={params.courseId}
         isPublished={course.isPublished}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl font-medium">Customize your course</h2>
          </div>
          <TitleForm intialData={course} courseId={course._id} />
          <DescriptionForm intialData={course} courseId={course._id} />
          <ImageForm intialData={course} courseId={course._id} />
          <CategoryForm 
          intialData={course} 
          courseId={course._id} 
          options={categories.map((category : {name: string, _id: string}) => ({label: category.name, value: category._id}))} />
        </div>


        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={ListChecks} />
              <h2 className="text-xl font-medium">
                Course Chapters
              </h2>
            </div>
             <ChapterForm courseChapters={courseChapters } courseId={course._id} />
          </div>

          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={CircleDollarSign} />
              <h2 className="text-xl font-medium">Price</h2>
            </div>
              <PriceForm intialData={course} courseId={course._id} />
          </div>

          <div>
             <div className="flex items-center gap-x-2">
              <IconBadge icon={File} />
              <h2 className="text-xl font-medium">Resources & Attachments</h2>
            </div>
             <AttachmentsForm intialData={course} courseId={course._id} />
          </div>


        </div>



      </div>
    </div>
    </>
  );
};

export default CourseIdPage;

