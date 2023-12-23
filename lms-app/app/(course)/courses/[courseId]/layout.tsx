import { auth } from "@clerk/nextjs";
import axios from "axios";
import { redirect } from "next/navigation";
import { CourseSidebar } from "./_components/course-sidebar";
import { CourseNavbar } from "./_components/course-navbar";

const CourseLayout = async ({
    children,
    params
}: { children: React.ReactNode; params: { courseId: string}}) => {

    const { userId } = auth()
    if(!userId){
        return redirect("/")
    }

const course = (await axios.get(`${process.env.BACK_END_URL}/api/courses/${params.courseId}`)).data

const chapters = await (await axios.get(`${process.env.BACK_END_URL}/api/chapters/${params.courseId}/published`)).data



    return ( 
        <div className="h-full">
            <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
                <CourseNavbar
                course={course}
                chapters={chapters}
                // progressCount={progressCount}
                />
            </div>

            <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
                <CourseSidebar 
                userId={userId}
                course={course}
                chapters={chapters}
                // progress={progressCount}
                />
            </div>
            <main className="md:pl-80 h-full pt-[80px]">
            {children}
            </main>
        </div>
     );
}
 
export default CourseLayout;