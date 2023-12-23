"use client"

import {AlertDialog,AlertDialogAction,AlertDialogCancel,AlertDialogContent,AlertDialogDescription,AlertDialogFooter, AlertDialogHeader} from "@/components/ui/alert-dialog"
import { AlertDialogTitle, AlertDialogTrigger } from "@radix-ui/react-alert-dialog";


interface ConfirmModalProps{
    children: React.ReactNode;
    onConfirm: () => void
}

export const ConfirmModal = ({
    children,
    onConfirm
}: ConfirmModalProps) => {

    return(
        <AlertDialog>
            <AlertDialogTrigger asChild>
                { children }
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action can&apos;t be undo!
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>
                        Continue anyway
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        )
}