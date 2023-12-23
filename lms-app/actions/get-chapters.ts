import axios from "axios";
import { error } from "console";

interface getChaptersProps {
  userId: string;
  chapterId: string;
  courseId: string;
}

export const getChapters = async ({
  userId,
  chapterId,
  courseId,
}: getChaptersProps) => {
  try {
    const course = (
      await axios.get(`http://127.0.0.1:5000/api/courses/${courseId}`)
    ).data;
    const chapters: {
      _id: string;
      title:string,
      position: string;
      isFree: boolean;
      playbackId: string;
      description: string
      isCompleted: {[key:string]: boolean}
    }[] = (await axios.get(`http://127.0.0.1:5000/api/chapters/${courseId}/published`))
      .data;

    const chapter =
      chapters.find(
        (chapter) =>
          chapter._id === chapterId
      ) || null;

    if (!course || !chapter) {
      throw new Error("Course or Chapters is not found!");
    }

    const purchased = course.purchased[userId];
    const isCompleted = chapter.isCompleted[userId]

    let muxData = null;
    let nextChapter: {_id: string} | null = null;
    let attachments: string[] = [];

    if (purchased) {
      attachments = course.attachments;
    }

    if (chapter.isFree || purchased) {
      muxData = chapter.playbackId;
      nextChapter = chapters[chapters.indexOf(chapter) + 1] || null;
    }


    return{
        course,
        chapter,
        muxData,
        attachments,
        nextChapter,
        purchased,
        isCompleted
    }


  } catch (error) {
    console.log("[Get chapters]", error);
    return {
      chapter: null,
      course: null,
      muxData: null,
      attachments: [],
      nextChapter: null,
      isCompleted: null,
      purchased: null,
    };
  }
};
