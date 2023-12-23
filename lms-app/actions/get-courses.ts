import axios from "axios";
import { getProgress } from "@/actions/get-progress";

type course = {
  _id: string;
  purchased: { [key: string]: boolean };
  categoryId: string;
};

type GetCourses = {
  userId: string;
  title?: string;
  categoryId?: string;
};

export const getCourses = async ({ userId, title, categoryId }: GetCourses) => {
  try {
    const categories = (await axios.get(`${process.env.BACK_END_URL}/api/category`))
      .data;

    let courses = (
      await axios.get(
        `${process.env.BACK_END_URL}/api/courses?${
          categoryId ? `categoryId=${categoryId}` : ""
        }&${title ? `title=${title}` : ""}`
      )
    ).data;

    courses = courses.filter(
      (course: { isPublished: boolean }) => course.isPublished
    );

    const courseWithProgress = await Promise.all(
      courses.map(async (course: course) => {
        const category = categories.find(
          (cate: { _id: string; name: string }) =>
            cate._id === course.categoryId
        ).name;

        if (!course.purchased[userId]) {
          const chaptersLength = (
            await axios.get(
              `${process.env.BACK_END_URL}/api/chapters/${course._id}/published`
            )
          ).data.length;

          return {
            ...course,
            progress: null,
            chaptersLength: chaptersLength,
            category: category,
          };
        }

        const [chaptersLength, progressPercentage] = await getProgress(
          userId,
          course._id
        );

        return {
          ...course,
          progress: progressPercentage,
          chaptersLength: chaptersLength,
          category: category,
        };
      })
    );

    return courseWithProgress;
  } catch (error) {
    console.log("Get course", error);
    return [];
  }
};
