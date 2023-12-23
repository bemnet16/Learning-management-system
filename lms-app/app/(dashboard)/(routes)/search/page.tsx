import axios from "axios";
import { Categories } from "./_components/categories";
import { SearchInput } from "@/components/search-input";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getCourses } from "@/actions/get-courses";
import { CoursesList } from "@/components/courses-list";

interface searchPageProps{
  searchParams: { 
    title?: string,
    categoryId: string
  }
}

const SearchPage = async ({ searchParams } : searchPageProps) => {


  const { userId } = auth()
  if(!userId){
    return redirect("/")
  }

  const categories = await (
    await axios.get(`${process.env.BACK_END_URL}/api/category`)
  ).data;


  const courses = await getCourses({userId, ...searchParams})

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput /> 
      </div>
      <div className="p-6">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default SearchPage;
