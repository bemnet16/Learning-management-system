import { usePathname, useRouter } from "next/navigation"

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";


interface sidebarItemProps {
    icon: LucideIcon,
    label: string,
    href: string
}

const SidebarItem = ({ icon: Icon, label, href }: sidebarItemProps) => {

    const pathname = usePathname()
    const router = useRouter()

    const onClick = () => {
        router.push(href)
    }

    const isActive = (pathname === "/" && href === "/") || (pathname === href) || (pathname.startsWith(`${href}/`))

    return (
        <button
            onClick={onClick}
            type="button"
            className={cn("flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20", isActive && " text-sky-800 font-[600] bg-sky-300/20 hover:bg-sky-200/20 hover:text-sky-700")}
        >
            <div className="flex items-center gap-x-2 py-4">
                <Icon  
                size={22}
                className={cn("text-slate-500",isActive && "text-sky-700")} />
                {label}
            </div>
            <div 
            className={cn("ml-auto opacity-0 border-2 h-full border-sky-700",isActive && "opacity-100")}/>
        </button>
    );
}

export default SidebarItem;