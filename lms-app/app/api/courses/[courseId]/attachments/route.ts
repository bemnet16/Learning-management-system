import { auth } from "@clerk/nextjs"
import axios from "axios"
import { NextResponse } from "next/server"

export async function POST(req: Request, { params } : {params : { courseId : string}}){
    try {
        const {userId} = auth()
        if(!userId){
            return new NextResponse("Unauthorized access denied", {status : 401})
        }        
        
        const {courseId} = params
        const url = await req.json()

        const course = await axios.post(`${process.env.BACK_END_URL}/api/courses/${courseId}/attachments`,{...url,userId})

        console.log("uuuu",url)
        return new NextResponse(course.data)

    } catch (error) {
        console.log("course attachments api post", error)
        return new NextResponse("internal error course attachments",{status : 500})
    }
}