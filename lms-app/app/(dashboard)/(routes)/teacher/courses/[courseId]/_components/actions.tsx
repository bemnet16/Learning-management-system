"use client"

import { ConfirmModal } from "@/components/modals/confirm-modal"
import { Button } from "@/components/ui/button"
import { useConfettiStore } from "@/hooks/use-confetti-store"
import axios from "axios"
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

interface ActionsProps{
    disabled: boolean,
    courseId: string,
    isPublished: boolean
}

export const Actions = ({
    disabled, courseId, isPublished
} : ActionsProps) => {

    const router = useRouter()
    const confetti = useConfettiStore()
    const [isLoading,setIsLoading] = useState(false)

    const onDelete = async() => {
        try {
            setIsLoading(true)
            await axios.delete(`/api/courses/${courseId}`)
            toast.success("The course deleted successfully! ")
            router.refresh()
            router.push(`/teacher/courses`)
        } catch (error) {
            toast.error("Something went wrong!!")
        }finally{
            setIsLoading(false)
        }

    }


    const onPublish = async() => {
        try{
            setIsLoading(true)
            await axios.patch(`/api/courses/${courseId}`, {isPublished: !isPublished})
            toast.success(`The course is ${isPublished ? "Unpublished" : "published"} successfully!`)
            if(!isPublished){
                confetti.onOpen()
            }
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