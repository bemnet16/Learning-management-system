import { auth } from "@clerk/nextjs"
import axios from "axios"
import { NextResponse } from "next/server"

export async function PATCH(req: Request, { params } : { params : {courseId : string}}) {

    try {
        const {userId} = auth()
        if(!userId){
            return new NextResponse("Unauthorized access denied", {status: 401})
        }

        const {courseId} = params
        const chapterLists = await req.json()


        for(let chapter of chapterLists){
          const res =  await axios.patch(`${process.env.BACK_END_URL}/api/chapters/${chapter.id}/reorder`,{position: chapter.position, courseId: courseId})
        }

        return new NextResponse("successfully reorderd", {status : 200})

    } catch (error) {
        console.log("chapter reorder /api/reorder" , error)
        return new NextResponse("Internal error api/reorder", {status: 500})
    }
    
}