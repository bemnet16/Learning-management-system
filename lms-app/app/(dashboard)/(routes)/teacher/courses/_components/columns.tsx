"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react"

import { DropdownMenu,DropdownMenuContent ,DropdownMenuTrigger,DropdownMenuItem } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type course = {
    _id: string,
    title: string,
    price: number,
    isPublished: boolean
}

export const columns: ColumnDef<course>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
        const price = parseFloat(row.getValue("price") || "0")
        const formattedPrice = Intl.NumberFormat("en-US",{
            style:"currency",
            currency:"USD"
        }).format(price)

        return(<div className="">{formattedPrice}</div> )
    }
  },
  {
    accessorKey: "isPublished",
   header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Published
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
        const { isPublished } = row.original

        return(
            <div className="flex items-center justify-center">
            <Badge className={cn("px-3",isPublished && "bg-sky-700")}>
                {isPublished ? "Published" : "Draft"}
            </Badge>
            </div>
        )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
        const { _id } = row.original

        return(
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-4 w-8 p-0">
                        <span className="sr-only">
                            Open menu
                        </span>
                        <MoreHorizontal className="h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <Link href={`/teacher/courses/${_id}`}>
                    <DropdownMenuItem>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                    </DropdownMenuItem>
                    </Link>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }
  }
]
