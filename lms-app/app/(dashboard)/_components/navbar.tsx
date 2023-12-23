import NavbarRoutes from "@/components/navbar-routes"
import MobileSidebar from "./mobile-sidebar"

export const Navbar = () => {
    return(
        <div className="p-3 border-b flex items-center h-full bg-white shadow-sm">
            <MobileSidebar />
            <NavbarRoutes />
        </div>
    )
}