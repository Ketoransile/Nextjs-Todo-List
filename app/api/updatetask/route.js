import Task from "@/models/Task";
import dbConnect from "@/utils/mongodb";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function PUT(request) {
  await dbConnect();
  const { taskId, editedTitle } = await request.json();
  if (!taskId || !editedTitle) {
    return NextResponse.json(
      {
        message: "Either task id is invalid or no title is is updated",
      },
      { status: 400 }
    );
  }
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId },
      { $set: { title: editedTitle } },
      { new: true }
    );
    if (!updatedTask) {
      return NextResponse.json(
        {
          message: "Task not found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { data: updatedTask, message: "Update Successfull", redirect: "/" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Internal error while updating the task", error);
    return NextResponse.json({
      message: "Failed to update the task",
      status: 500,
    });
  }
}
