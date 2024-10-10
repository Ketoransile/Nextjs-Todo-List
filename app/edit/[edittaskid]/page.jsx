// "use client";
// import Task from "@/models/Task";
// import { Button, Input, Card, CardBody } from "@nextui-org/react";
// import axios from "axios";
// import { useEffect, useState } from "react";

// const EditTask = ({ params }) => {
//   const [task, setTask] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editedTitle, seteditedTitle] = useState("");
//   console.log(
//     "this output is from page.jsx of [edittaskid] and the eresult is params",
//     params
//   );
//   const taskId = params.edittaskid;
//   useEffect(() => {
//     async function getTask() {
//       try {
//         const response = await axios.get(`/api/gettask?taskId=${taskId}`);
//         console.log("response from edittaskid page.jsx", response);
//         setTask(response.data.data);
//         seteditedTitle(response.data.data.title);
//         setLoading(false);
//       } catch (error) {
//         console.error(
//           "error while sending to the task id to the gettask route",
//           error
//         );
//         setError("failed to fetch task");
//         setLoading(false);
//       }
//     }
//     getTask();
//   }, [taskId]);

//   const handleSaveEdit = async () => {
//     try {
//       const response = await axios.put(`/api/updatetask`, {
//         taskId,
//         editedTitle,
//       });
//       if (response.status === 200) {
//         alert("task updated successfully");
//         console.log("Task updated successfully", response);
//       } else {
//         console.log("there was an error updatinf the task");
//       }
//     } catch (error) {
//       console.error("Internal server error updating the task");
//     }
//   };
//   if (loading) {
//     return <p>Loading....</p>;
//   }
//   if (error) {
//     return <p>{error}</p>;
//   }
//   return (
//     <div className="flex flex-col justify-center gap-6 items-center">
//       <h1 className="text-2xl text-white text-center pt-10"> Edit your task</h1>
//       <div className="flex gap-4 justify-center items-center px-20 pt-20">
//         <h2 className="text-white text-lg">Your Previous Task Description</h2>
//         <Card>
//           <CardBody>
//             <p></p>
//           </CardBody>
//         </Card>
//         <h2 className="text-white text-lg">Enter your task</h2>
//         <Input
//           type="text"
//           label="Edit you task here"
//           className=""
//           required
//           onChange={(e) => {
//             seteditedTitle(e.target.value);
//           }}
//         />
//       </div>

//       <Button color="success" onClick={handleSaveEdit}>
//         Save
//       </Button>
//     </div>
//   );
// };

// export default EditTask;
"use client";
import { Button, Input, Card, CardBody } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditTask = ({ params }) => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");

  const router = useRouter();
  const taskId = params.edittaskid;

  useEffect(() => {
    async function getTask() {
      try {
        const response = await axios.get(`/api/gettask?taskId=${taskId}`);
        console.log("response from edittaskid page.jsx", response);
        setTask(response.data.data);
        // setEditedTitle(response.data.data.title);
        setLoading(false);
      } catch (error) {
        console.error("error while fetching the task", error);
        setError("Failed to fetch task");
        setLoading(false);
      }
    }
    getTask();
  }, [taskId]);

  const handleSaveEdit = async () => {
    try {
      if (!editedTitle) {
        alert("You must add new task before saving");
        return;
      }
      const response = await axios.put(`/api/updatetask`, {
        taskId,
        editedTitle,
      });
      if (response.status === 200) {
        // alert("Task updated successfully");
        console.log("Task updated successfully", response);
        setTask(response.data.data);
        setEditedTitle("");
        if (response.data.redirect) {
          router.push(response.data.redirect);
        }
      } else {
        console.error("Error updating the task");
      }
    } catch (error) {
      console.error("Internal server error while updating the task", error);
    }
  };
  if (loading) {
    return <p className="text-white text-center text-lg pt-10">Loading....</p>;
  }
  if (error) {
    return <p className="text-white text-center text-lg pt-10">{error}</p>;
  }

  return (
    <div className="flex flex-col justify-center gap-6 items-center">
      <h1 className="text-2xl text-white text-center pt-10">Edit your task</h1>

      <div className="flex gap-4 justify-center items-center px-20 pt-20">
        <h2 className="text-white text-lg">Previous Task Description</h2>
        <Card>
          <CardBody>
            <p>{task.title}</p> {/* Display the task's original title */}
          </CardBody>
        </Card>
      </div>

      <div className="flex gap-4 justify-center items-center px-20 pt-20">
        <h2 className="text-white text-lg">Edit you task</h2>
        <Input
          type="text"
          value={editedTitle} // Bind the value to editedTitle
          placeholder="Enter your new task here"
          required
          onChange={(e) => setEditedTitle(e.target.value)}
        />
      </div>
      <div className="flex  gap-4 justify-between items-center">
        <Link href="/">
          <Button color="primary">Back</Button>
        </Link>
        <Button color="success" onClick={handleSaveEdit}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditTask;
