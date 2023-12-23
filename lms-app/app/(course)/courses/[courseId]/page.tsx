import axios from "axios";
import { redirect } from "next/navigation";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const courseChapters = (
    await axios(
      `${process.env.BACK_END_URL}/api/chapters/${params.courseId}/published`
    )
  ).data

  if (!courseChapters) {
    return redirect("/");
  }

  return redirect(
    `/courses/${params.courseId}/chapters/${courseChapters[0]._id}`
  );
};

export default CourseIdPage;
