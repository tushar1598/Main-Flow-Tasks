import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditTask() {
  const nevigate = useNavigate();
  const { id } = useParams();
  const [Task, setTask] = useState({ task: "", status: "" });

  useEffect(() => {
    const fetchTask = async () => {
      const res = await axios.get(
        `http://localhost:9000/users/fetch-update-task/${id}`
      );
      setTask(res.data.task);
    };
    fetchTask();
  }, []);

  const Handler = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:9000/users/update-task", {
      task: Task,
    });
    setTask(res.data.updatedtask);
    toast.success("Data Updated Successfully");
    nevigate("/users/tasks");
  };

  const ChangeHandler = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div id="task-update">
        <form onSubmit={Handler}>
          <label className="lables-update" htmlFor="task">
            Task
          </label>
          <input
            id="task"
            type="text"
            name="task"
            value={Task.task}
            placeholder="Task Name"
            required
            onChange={ChangeHandler}
          />
          <label className="lables-update" htmlFor="Status">
            Status
          </label>
          <select
            name="status"
            value={Task.status}
            onChange={ChangeHandler}
            required
          >
            <option value="">Choose a task</option>
            <option value="Completed">Completed</option>
            <option value="Not Completed">Not Completed</option>
            <option value="Pending">Pending</option>
          </select>
          <input id="csk" type="submit" value="Edit Task" />
        </form>
      </div>
    </>
  );
}

export default EditTask;
