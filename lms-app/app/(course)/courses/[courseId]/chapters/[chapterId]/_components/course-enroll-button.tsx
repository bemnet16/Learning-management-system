"use client"

import axios from "axios"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/format"
import toast from "react-hot-toast"

interface courseEnrollButtonProps{
    price: number,
    courseId: string
}

export const CourseEnrollButton = ({courseId,price}: courseEnrollButtonProps) => {

    const [isLoading,setIsLoading] = useState(false)

    const onClick = async () => {
        try {
            setIsLoading(true)
            const reponse = await axios.post(`/api/courses/${courseId}/checkout`)
            
            window.location.assign(reponse.data.url)
            
        } catch (error: any) {
            console.log("course enroll btn", error.message)
            toast.error("Something went wrong!")
        }finally{
            setIsLoading(false)
        }
    }

    return (
        <Button onClick={onClick} disabled={isLoading} className="w-full md:w-auto " size="sm">
            Enroll for {formatPrice(price)}
        </Button>   )
}