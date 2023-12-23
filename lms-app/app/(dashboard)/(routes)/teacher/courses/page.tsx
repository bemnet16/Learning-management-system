import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import axios from "axios";



const CoursesPage = async () => {


    const {userId} = auth()
    if(!userId){
        return redirect("/")
    }

    const courses = await (await axios.get("http://127.0.0.1:5000/api/courses")).data

    return ( 
        <div className="p-6">
           <DataTable columns={columns} data={courses} />
        </div>
     );
}
 
export default CoursesPage;