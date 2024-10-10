import EditTask from "@/app/edit/[edittaskid]/page";
import { Button, Checkbox } from "@nextui-org/react";
import axios from "axios";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import React from "react";

const Todo = ({ description, taskId, todos, setTodos }) => {
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete("/api/deletetask", {
        data: { taskId },
      });
      if (response.status === 200) {
        console.log("deleted successfully");
        const remainingTodos = todos.filter((e) => e._id !== taskId);
        setTodos(remainingTodos);
      } else {
        alert("task deletion failed");
      }
    } catch (error) {
      console.error("axios error while deleting task", error);
    }
  };
  const handleEdit = async () => {
    console.log("handle Edit");
  };
  return (
    <div className="flex items-center justify-center gap-32 mb-4">
      <div className="flex">
        <Checkbox color="primary" />
        <Link href="/edit">
          <p className="text-white text-lg w-64 truncate">{description}</p>
        </Link>
      </div>
      <div className="flex gap-4">
        <Link href={`/edit/${taskId}`}>
          <Button color="success" onClick={handleEdit}>
            Edit
          </Button>
        </Link>
        <Button color="danger" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default Todo;
