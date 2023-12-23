import axios from "axios";

export const getProgress = async (
  userId: string,
  courseId: string
): Promise<number[]> => {
  try {
    const publishedChapters = (
      await axios.get(`http://127.0.0.1:5000/api/chapters/${courseId}/published`)
    ).data;


    const validCompletedChapters = publishedChapters.filter(
      (chapter: {
        _id: string;
        isCompleted: { [key: string]: boolean };
      }) => chapter.isCompleted[userId]
    );

    const progressPercentage =
      (validCompletedChapters.length / publishedChapters.length) * 100;

    return [publishedChapters.length, progressPercentage];
  } catch (error) {
    console.log("[get progress]", error);
    return [0, 0];
  }
};
