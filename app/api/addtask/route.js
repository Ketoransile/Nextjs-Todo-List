import Task from "@/models/Task";
import dbConnect from "@/utils/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  await dbConnect();

  const { title } = await request.json();
  try {
    const existingTask = await Task.findOne({ title });
    if (existingTask) {
      return NextResponse.json(
        {
          message: "Task already registered",
        },
        { status: 401 }
      );
    }
    const newTask = new Task({ title });
    await newTask.save();
    return NextResponse.json(
      { data: newTask },
      { message: "Task added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("server error", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
