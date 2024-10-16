"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import * as z from 'zod';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { todoSchema } from "../todoschema/todoSchema"

interface TodoFormProps {
    defaultValues: {
        title: string
        description: string,
        isComplete: boolean,
    };
    onSubmit: (data: z.infer<typeof todoSchema>) => void;
    submitButtonText: string;
    isSubmitting: boolean;
}

const TodoForm = ({defaultValues, onSubmit, submitButtonText, isSubmitting}: TodoFormProps) => {

    const form = useForm<z.infer<typeof todoSchema>>({
        resolver: zodResolver(todoSchema),
        defaultValues: defaultValues
    })

  return (
    <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField control={form.control} name="title" render={({field}) => (
                <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                        <Input {...field} type="text" />
                    </FormControl>

                    <FormMessage />
                </FormItem>
            )} />

            <FormField control={form.control} name="description" render={({field}) => (
                <FormItem>
                    <FormLabel>Description</FormLabel>

                    <FormControl>
                        <Textarea className="resize-none" {...field} />
                    </FormControl>

                    <FormMessage />
                </FormItem>
            )} />

            <FormField control={form.control} name="isComplete" render={({field}) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">

                    <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>

                    <div className="space-y-1 leading-none">
                        <FormLabel>Mark as completed</FormLabel>
                    </div>

                    <FormMessage />
                </FormItem>
            )} />

            <Button type="submit" disabled={isSubmitting}>{submitButtonText}</Button>
        </form>
    </Form>
  )
}

export default TodoForm