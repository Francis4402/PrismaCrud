"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import * as z from 'zod';
import { useState } from "react"
import { todoSchema } from "../todoschema/todoSchema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { mutate } from "swr"
import TodoForm from "./todoform";
import { Todo } from "@prisma/client";
import { GoPencil } from "react-icons/go";


const UpdateTodo = ({todo} : {todo: Todo}) => {

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isDiaogOpen, setDialogOpen] = useState(false)

    const form = useForm<z.infer<typeof todoSchema>>({
        resolver: zodResolver(todoSchema),
        defaultValues: {
            title: "",
            description: "",
            isComplete: false,
        }
    })

    const onSubmit = async (data: z.infer<typeof todoSchema>) => {
        setIsSubmitting(true);
        try {
            await fetch('api/todos', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({...data, id: todo.id}),
            })

            form.reset();
            setIsSubmitting(false);
            toast.success("Todo Updated")
            setDialogOpen(false)
            mutate("/api/todos")
        } catch (error) {
            console.log(error)
            toast.error("failed to update todo")
        }
    }

  return (
    <Dialog open={isDiaogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
            <Button variant={"ghost"}><GoPencil /></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white">
            <DialogHeader>
                <DialogTitle>Update Todo</DialogTitle>
            </DialogHeader>

            <TodoForm defaultValues={{title: todo.title ?? '', description: todo.description ?? '', isComplete: todo.isComplete}} submitButtonText="update" onSubmit={onSubmit} isSubmitting={isSubmitting} />
        </DialogContent>
    </Dialog>
  )
}

export default UpdateTodo