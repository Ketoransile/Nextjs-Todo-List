import Task from "@/models/Task";
import dbConnect from "@/utils/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  try {
    const tasks = await Task.find();
    if (!tasks || tasks.length === 0) {
      console.log("Task is empty");
      return NextResponse.json(
        { data: [], message: "Your tasks list is empty" },
        { status: 200 }
      );
    }
    console.log(tasks);
    return NextResponse.json(
      {
        data: tasks,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("server error while getting tasks", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
