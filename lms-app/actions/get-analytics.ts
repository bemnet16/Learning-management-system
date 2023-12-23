import axios from "axios";

export const getAnalytics = async (userId: string) => {
  try {
    const courses = (await axios.get(`${process.env.BACK_END_URL}/api/courses`)).data;
    const grouped: { [courseTitle: string]: number } = {};

    courses.forEach((course: any) => {
      const courseTitle = course.title;
      grouped[courseTitle] =
        Object.keys(course.purchased).length * course.price;
    });

    const data = Object.entries(grouped).map(([courseTitle, total]) => ({
      name: courseTitle,
      total: total,
    }));

    const totalRevenue = data.reduce((pre,cur) => pre + cur.total , 0)
    const totalSales =  courses.reduce((pre: number ,cur: {purchased: {}}) => pre + Object.keys(cur.purchased).length, 0)


    return{
        data,
        totalRevenue,
        totalSales
    }

  } catch (error: any) {
    console.log("get analytics", error.message);
    return {
      data: [],
      totalRevenue: 0,
      totalSales: 0,
    };
  }
};
