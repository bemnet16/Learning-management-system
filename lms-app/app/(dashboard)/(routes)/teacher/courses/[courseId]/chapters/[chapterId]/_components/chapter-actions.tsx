"use client"

import { ConfirmModal } from "@/components/modals/confirm-modal"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

interface chapterActionsProps{
    disabled: boolean,
    courseId: string,
    chapterId: string,
    isPublished: boolean
}

export const ChapterActions = ({
    disabled, courseId, chapterId, isPublished
} : chapterActionsProps) => {

    const router = useRouter()
    const [isLoading,setIsLoading] = useState(false)

    const onDelete = async() => {
        try {
            setIsLoading(true)
            await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`)
            toast.success("Chapter deleted successfully! ")
            router.refresh()
            router.push(`/teacher/courses/${courseId}`)
        } catch (error) {
            toast.error("Something went wrong!!")
        }finally{
            setIsLoading(false)
        }

    }


    const onPublish = async() => {
        try{
            setIsLoading(true)
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, {isPublished: !isPublished})
            toast.success(`chapter successfully ${isPublished ? "Unpublished" : "published"}!`)
            router.refresh()

        }catch(error){
            toast.error("something went wrong!")
        }finally{
            setIsLoading(false)
        }
    }



    return(<div className="flex items-center gap-x-2">
        <Button 
        onClick={onPublish} 
        disabled={disabled || isLoading} 
        variant="outline" size="sm">
            {isPublished ? "Unpublish" : "Publish"}
        </Button>
        <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
            <Trash className="h-4 w-4" />
        </Button>
        </ConfirmModal>

    </div>)
}