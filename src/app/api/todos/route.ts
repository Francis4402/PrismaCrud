import { todoSchema } from "@/app/todoschema/todoSchema";
import { db } from "@/components/db/db"
import { NextRequest, NextResponse } from "next/server"


export async function GET() {
    try {

        const todos = await db.todo.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });
        
        return NextResponse.json(todos);

    } catch (error) {
        console.log(error);
        return NextResponse.json({message: 'An unexpected error occured'}, {status: 500});
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const result = todoSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({message: 'Invalid input', errors: result.error.errors}, {
                status: 400
            })
        }

        const todoData = result.data;

        const todo = await db.todo.create({
            data: {
                title: todoData.title,
                description: todoData.description,
                isComplete: todoData.isComplete,
            }
        })

        return NextResponse.json(todo, {status: 201});
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}


export async function DELETE(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get("id");

        if (!id) {
            return NextResponse.json({message: "Invalid input"}, {status: 400});
        }

        const deleteTodo = await db.todo.delete({
            where: {
                id: id
            }
        })

        if (!deleteTodo) {
            return NextResponse.json({message: "Todo not found"}, {status: 404});
        }

        return NextResponse.json({message: "Todo deleted"}, {status: 200});
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}


export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const {id, ...rest} = body;
        const res = todoSchema.safeParse(rest);

        if (!res.success) {
            return NextResponse.json({message: 'Invalid input', errors: res.error.errors}, {status: 400});
        }

        const todoData = res.data;

        if (!id) {
            return NextResponse.json({message: "Invalid input"}, {status: 400});
        }

        const updateTodo = await db.todo.update({
            where: {
                id: id
            },
            data: {
                title: todoData.title,
                description: todoData.description,
                isComplete: todoData.isComplete,
            }
        })

        if (!updateTodo) {
            return NextResponse.json({message: "Todo not found"}, {status: 404});
        }
        
        return NextResponse.json(updateTodo, {status: 200});

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}