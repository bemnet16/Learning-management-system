"use client"

import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import {Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage} from "@/components/ui/form"
import {Input,InputProps} from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import toast from "react-hot-toast"

const formSchema = z.object({
    title: z.string().min(1,{message: "Title is required"})
})

const CreatePage = () => {

    const router = useRouter()

    const form = useForm<z.infer <typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            title: ""
        }
    })

    const {isSubmitting, isValid} = form.formState 

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            const response = await axios.post("/api/courses",values)
            router.push(`/teacher/courses/${response.data._id}`)
            toast.success("The course created successfully!")
        }catch{
            toast.error("something went wrong to create course!!!")
        }
    }

    return ( 
        <div className="max-w-2xl mx-auto flex md:items-center md:justify-center h-full p-6">
            <div>
            <h1 className="text-2xl">
                Name your course
            </h1>
            <p className="text-sm text-slate-600">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur, aliquid vel? Quidem dolore facilis esse ratione quis eveniet accusantium delectus?
            </p>
            <Form {...form}>
                <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 mt-8">
                    <FormField 
                    control={form.control}
                    name="title"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>
                                Course title
                            </FormLabel>
                            <FormControl>
                                <Input 
                                disabled={isSubmitting}
                                placeholder="e.g : Next JS full course"
                                {...field}/>
                            </FormControl>
                            <FormDescription>
                                what course you teach?
                                <FormMessage />
                            </FormDescription>
                        </FormItem>
                    )}/>
                    <div className="flex items-center gap-x-2">
                        <Link href="/">
                            <Button  type="button" variant={"ghost"}>
                                Cancel
                            </Button>
                        </Link>
                        <Button type="submit" disabled={!isValid || isSubmitting } >
                            Continue
                        </Button>
                    </div>
                </form>
            </Form>
            </div>
        </div>
     );
}
 
export default CreatePage;