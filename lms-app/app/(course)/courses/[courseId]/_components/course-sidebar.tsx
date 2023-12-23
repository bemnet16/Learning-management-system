import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { CourseSidebarItem } from "./course-sidebar-item";
import { CourseProgress } from "@/components/course-progress";

interface courseSidebarProps {
  course: { title: string, purchased:  { [key: string]: boolean } };
  chapters: {
    _id: string;
    courseId: string;
    title: string;
    isCompleted: { [key: string]: boolean };
    isFree: boolean;
  }[];
  userId: string;
}

export const CourseSidebar = ({
  course,
  chapters,
  userId,
}: courseSidebarProps) => {
  // const { userId } = auth()
  // if(!userId){
  //     return redirect("/")
  // }

  const purchased = !!course.purchased[userId]
  const completedChapters = chapters.filter((chapter) => !!chapter.isCompleted[userId]).length
  const progressCount = (completedChapters / chapters.length) * 100


  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold">{course.title}</h1>
        {purchased && (
          <div className="mt-10">
            <CourseProgress
            variant="success"
            value={progressCount}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        {chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter._id}
            _id={chapter._id}
            courseId={chapter.courseId}
            label={chapter.title}
            isCompleted={chapter.isCompleted[userId]}
            isLocked={!chapter.isFree && !course.purchased[userId]}
          />
        ))}
      </div>
    </div>
  );
};
