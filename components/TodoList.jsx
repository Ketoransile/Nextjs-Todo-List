"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Todo from "./Todo";

const TodoList = ({ todos, setTodos }) => {
  // console.log("todos before useeffect", todos);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("/api/gettasks");
        // console.log("response from todolist ", response);
        // console.log(
        //   "This output is from TodoList that fetches response",
        //   response
        // );
        if (response.data.length === 0) {
          throw new Error("No tasks available");
        }
        // console.log(response.data.data);
        setTodos(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error while fetching tasks from MongoDB", error);
        setError("Failed to fetch tasks");
        setLoading(false);
      }
    };
    fetchTasks();
  }, [setTodos]);
  // console.log(
  //   "Your todo list in the todolist componentss are like the followind \n",
  //   todos
  // );
  if (loading)
    return <p className="text-white text-center text-lg pt-10">Loading...</p>;
  if (error)
    return <p className="text-white text-center text-lg pt-10">{error}</p>;
  return (
    <>
      {!todos && (
        <p className="text-white text-center text-lg pt-10">
          Your to do list is Empty
        </p>
      )}
      {todos?.map((todo, index) => (
        <Todo
          todos={todos}
          setTodos={setTodos}
          key={index}
          description={todo.title}
          taskId={todo._id}
          createdAt={todo.createdAt}
          updatedAt={todo.updatedAt}
        />
      ))}
    </>
  );
};

export default TodoList;
