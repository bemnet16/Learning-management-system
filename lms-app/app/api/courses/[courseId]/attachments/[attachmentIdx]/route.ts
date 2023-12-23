import { auth } from "@clerk/nextjs"
import axios from "axios"
import { NextResponse } from "next/server"

export async function DELETE(req: Request, { params } : { params : { courseId : string, attachmentIdx : number}}){
    try {
        const {userId} = auth()
        if(!userId){
            return new NextResponse("Unauthorized access denied!", {status : 401})
        }

        const {courseId, attachmentIdx} = params
        const course = await axios.delete(`${process.env.BACK_END_URL}/api/courses/${courseId}/attachments/${attachmentIdx}`)

        return new NextResponse(course.data)

    } catch (error) {
        console.log("delet attachment url", error)
        return new NextResponse("Internal Error", {status : 500} )
    }
}