"use client"

import { Button } from "@/components/ui/button"
import { useConfettiStore } from "@/hooks/use-confetti-store"
import axios from "axios"
import { CheckCircle, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

interface courseProgressButtonProps{
    chapterId: string,
    courseId: string,
    isCompleted?: boolean,
    nextChapterId?: string
}

export const CourseProgressButton = ({ chapterId,courseId,isCompleted,nextChapterId}: courseProgressButtonProps) => {
    const router = useRouter()
    const confetti = useConfettiStore()
    const [isLoading,setIsLoading] = useState(false)

    const onClick = async () => {
        try {
            setIsLoading(true)
            await axios.post(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
                isCompleted: !isCompleted
            })

            if(!isCompleted && !nextChapterId){
                confetti.onOpen()
            }

            if(!isCompleted && nextChapterId){
                router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
            }

            toast.success("Progress updated")
            router.refresh()

        } catch (error) {
            toast.error("something went wrong!")
        }finally{
            setIsLoading(false)
        }
    }


    const Icon = isCompleted ? XCircle : CheckCircle

    return(
       <Button onClick={onClick } disabled={isLoading} className="w-full md:w-auto" type="button" variant={isCompleted? "outline":"success"}>
        {isCompleted ? "Not Completed" : "Mark as complete"}
        <Icon className="h-4 2-4 ml-2" />
       </Button>
    )

}