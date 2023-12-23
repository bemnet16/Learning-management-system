import axios from "axios";
import { getProgress } from "./get-progress";

type DashboardCourses = {
  completedCourses: any[];
  courseInProgress: any[];
};

export const GetDashboardCourses = async (
  userId: string
): Promise<DashboardCourses> => {
  try {
    const categories = (await axios.get(`${process.env.BACK_END_URL}/api/category`))
      .data;
    const purchasedCourses = (
      await axios.get(
        `${process.env.BACK_END_URL}/api/courses/user/${userId}/purchased`
      )
    ).data;

    const refinedCourses = await Promise.all(
      purchasedCourses.map(async (course: any) => {
        const publishedChapters = (
          await axios.get(
            `${process.env.BACK_END_URL}/api/chapters/${course._id}/published`
          )
        ).data;

        const category = categories.find(
          (cate: { _id: string; name: string }) =>
            cate._id === course.categoryId
        ).name;

        return {
          ...course,
          chaptersLength: publishedChapters.length,
          category: category,
        };
      })
    );

    for (let course of refinedCourses) {
      const [, progress] = await getProgress(userId, course._id);
      course["progress"] = progress;
    }

    const completedCourses = refinedCourses.filter(
      (course) => course.progress === 100
    );

    const courseInProgress = refinedCourses.filter(
      (course) => (course.progress ?? 0) < 100
    );

    return {
      completedCourses: completedCourses,
      courseInProgress: courseInProgress,
    };
  } catch (error: any) {
    console.log("get dashboard courses", error.message);
    return {
      completedCourses: [],
      courseInProgress: [],
    };
  }
};
