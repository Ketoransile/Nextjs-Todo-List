import Task from "@/models/Task";
import dbConnect from "@/utils/mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const taskId = searchParams.get("taskId");
  if (!taskId) {
    return NextResponse.json(
      {
        message: "Task Id is required",
      },
      { status: 400 }
    );
  }
  try {
    const task = await Task.findOne({ _id: taskId });
    if (!task) {
      return NextResponse.json(
        {
          message: "No task exists whith this id",
        },
        { status: 404 }
      );
    }
    console.log("this is task objext returned from gettask route", task);
    return NextResponse.json(
      {
        data: task,
        message: "Successfully fetched data ",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("cannot fetch task with that is", error);
  }
}
