
import { CourseCard } from "@/components/course-card"

type courseWithProgress = {
    _id:string, 
    userId: string,
    categoryId:string, 
    imageUrl:string,  
    title: string, 
    description: string, 
    price: number, 
    progress:number | null,
    chaptersLength: number
    category: string
}

interface coursesListProps{
    items: courseWithProgress[]
   
}

export const CoursesList = ({ items }: coursesListProps) => {

    return(
        <>
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
            {items.map((item) => (
                <CourseCard
                key={item._id}
                _id={item._id}
                title={item.title}
                imageUrl={item.imageUrl}
                price={item.price}
                progress={item.progress}
                category={item.category}
                chaptersLength={item.chaptersLength}
                />
            ))}
            
            </div>
            {items.length === 0 && (
                <div className="text-center text-sm text-muted-foreground mt-10">
                    No course found
                </div>
            )}
        </>
    )
}