import Mux from "@mux/mux-node"
import { auth } from "@clerk/nextjs"
import axios from "axios"
import { NextResponse } from "next/server"

const { Video } = new Mux(
    process.env.MUX_TOKEN_ID!,
    process.env.MUX_TOKEN_SECRET!
)

export async function DELETE(req:Request, { params } : { params: { courseId: string, chapterId: string}}) {
    try {
        const { userId } = auth()
        if(!userId){
            return new NextResponse("Unauthorized access denied", {status: 401})
        }

         const exitsingMuxData = await axios.get(`${process.env.BACK_END_URL}/api/chapters/${params.chapterId}/course/${params.courseId}`)

            if(exitsingMuxData.data.assetId){
                await Video.Assets.del(exitsingMuxData.data.assetId)
            }


        await axios.delete((`${process.env.BACK_END_URL}/api/chapters/${params.chapterId}/course/${params.courseId}`))
        

        return new NextResponse("chapter deleted!!")

    } catch (error) {
        console.log("chapter Id delete api", error)
        return new NextResponse("chapter Id delete", {status: 500})
    }
    
}





export async function PATCH(req: Request, { params } : { params : { courseId: string, chapterId: string}}) {
    try {


        const {userId} = auth()
        if(!userId){
            return new NextResponse("Unauthorized access denied", { status: 401})
        }

        const values = await req.json()
        
        let chapter;

        
        if(values.videoUrl){

            const exitsingMuxData = await axios.get(`${process.env.BACK_END_URL}/api/chapters/${params.chapterId}/course/${params.courseId}`)
            // if(exitsingMuxData.data.assetId){
            //     await Video.Assets.del(exitsingMuxData.data.assetId)
            // }
            const asset = await Video.Assets.create({
                input: values.videoUrl,
                playback_policy: "public",
                test: false
            })
            
             chapter = await axios.patch(`${process.env.BACK_END_URL}/api/chapters/${params.chapterId}/course/${params.courseId}`,{...values,userId, assetId: asset.id, playbackId: asset.playback_ids?.[0]?.id})
            
        }else{
             chapter = await axios.patch(`${process.env.BACK_END_URL}/api/chapters/${params.chapterId}/course/${params.courseId}`,{...values,userId})
        }
            

        return new NextResponse(chapter.data)
        
    } catch (error) {
        console.log("api courses courseId chapters chapterId", error)
        return new NextResponse("Internal Error chapter Id", {status : 500})
    }
}