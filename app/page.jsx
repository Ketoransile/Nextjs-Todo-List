"use client";
import { useState, useEffect } from "react";
import AddTask from "@/components/AddTask";
import TodoList from "@/components/TodoList";
import { Input, Checkbox, Button } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
export default function Home() {
  const [todos, setTodos] = useState([]);

  const addNewTask = (newTask) => {
    setTodos((prevTodos) => [newTask, ...prevTodos]);
  };

  return (
    <>
      <div className="flex flex-col">
        <div>
          <h1 className="text-3xl text-center font-bold text-white pt-20 font-serif mb-10">
            Welcome to Your Todo
          </h1>
          <AddTask todos={todos} setTodos={setTodos} />
          <TodoList todos={todos} setTodos={setTodos} />
        </div>
      </div>
    </>
  );
}
