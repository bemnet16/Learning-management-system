"use client"

import {Compass, Layout,List, BarChart} from "lucide-react"
import SidebarItem from "./sidebar-item";
import { usePathname } from "next/navigation";

const guestRoutes = [
    {
        icon: Layout,
        label: "Dashboard",
        href: "/"
    },
    {
        icon: Compass,
        label: "Browse",
        href: "/search"
    }
]

const teacherRoutes = [
    {
        icon: List,
        label: "Courses",
        href: "/teacher/courses"
    },
    {
        icon: BarChart,
        label: "Analytics",
        href: "/teacher/analytics"
    }
]

const SidebarRoutes = () => {

    const pathname = usePathname()

    const isTeacher = pathname?.includes("/teacher")
    const routes = isTeacher ? teacherRoutes : guestRoutes;



    return ( 
        <div className="flex flex-col w-full">
        {routes.map((route) => {
            return(
                <SidebarItem 
                    key={route.href}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
            />
            )
        })}                   
        </div>
     );
}
 
export default SidebarRoutes;