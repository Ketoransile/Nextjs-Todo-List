"use client";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import axios from "axios";

const AddTask = ({ todos, setTodos }) => {
  const [title, setTitle] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      alert("task cannot be empty");
      return;
    }
    try {
      const response = await axios.post("/api/addtask", { title });
      // console.log(
      //   "this output is from reponse object when adding new task",
      //   response.data.data
      // );
      // console.log("full response object", response);
      const newTask = response.data.data;

      if (response.status === 200) {
        setTodos((prevTodos) => [newTask, ...prevTodos]);
        setTitle("");
      } else {
        alert("adding task failed");
      }
    } catch (error) {
      console.error("axios error", error);
    }
  };
  return (
    <div className="flex gap-8 items-center justify-center mb-10">
      <Input
        type="text"
        label="Enter you task here"
        className="w-1/4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Button color="primary" onClick={handleSubmit}>
        Add Task
      </Button>
    </div>
  );
};

export default AddTask;
