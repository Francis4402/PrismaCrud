import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { mutate } from "swr";

const DeleteButton = ({id}: {id: string}) => {

    const handleDelete = async () => {
        try {
            await fetch(`/api/todos?id=${id}`, {
                method: "DELETE",
            });
            
            toast.success("Todo Deleted")
            mutate("/api/todos");
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete todo")
        }        
    }
    
  return (
    <Button variant={"ghost"} size={"icon"} onClick={handleDelete}>
        <TrashIcon className="h-4 w-4" />
    </Button>
  )
}

export default DeleteButton