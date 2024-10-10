import Task from "@/models/Task";
import dbConnect from "@/utils/mongodb";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  await dbConnect();
  const { taskId } = await request.json();
  console.log("Received task id is", taskId);
  const response = await Task.findOneAndDelete({ _id: taskId });
  console.log(
    "this output is from deletetask route.js file and this is task object found by it id"
  );
  if (!response) {
    return NextResponse.json({ message: "Task not found" });
  }
  return NextResponse.json(
    { data: response },
    { message: "task deleted successfully" },
    { status: 200 }
  );
  // if (response.status === 200) {
  //   return NextResponse.json(
  //     { data: response },
  //     {
  //       message: "Task deleted Successfully",
  //     },

  //     { status: 200 }
  //   );
  // } else {
  //   return NextResponse.json({
  //     message: "Internal server error while deleting the task",
  //     status: 500,
  //   });
  // }
}
