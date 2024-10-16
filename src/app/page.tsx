import { Button } from "@/components/ui/button";
import TodoList from "./Components/TodoList";
import CreateTodo from "./Components/CreateTodo";
import UpdateTodo from "./Components/UpdateTodo";

export default function Home() {
  return (
    <div className="max-w-7xl flex flex-col gap-10 mx-auto p-10">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Todo</h1>
        <CreateTodo />
      </div>

      <TodoList />
    </div>
  );
}
