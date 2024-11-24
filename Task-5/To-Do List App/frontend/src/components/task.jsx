import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../contexts/usercontext";

function Task() {
  const { data } = useContext(UserContext);
  const [Task, setTask] = useState({ task: "", status: "" });
  const [AllTasks, setAllTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:9000/users/fetch-task/?id=${data._id}`
      );
      setAllTasks(res.data.tasks);
    };
    fetchData();
  }, [Task]);

  const Delete = async (id) => {
    const res = await axios.delete(
      `http://localhost:9000/users/delete-task/?id=${id}`
    );
    if (res.data.deleted) {
      toast.success("Data Deleted Successfully");
      setTask({ task: "", status: "" });
    }
  };

  const Handler = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:9000/users/create-task", {
      task: Task,
      user: data._id,
    });
    setTask(res.data.task);
    toast.success("Data Created Successfully");
    setTask({ task: "", status: "" });
  };

  const ChangeHandler = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div id="parent">
        <div id="form">
          <form onSubmit={Handler}>
            <label className="lables" htmlFor="Task">
              Task
            </label>
            <input
              type="text"
              name="task"
              value={Task.task}
              placeholder="Task Name"
              required
              onChange={ChangeHandler}
            />
            <label className="lables" htmlFor="Status">
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

            <input id="submit" type="submit" value="Submit" />
          </form>
        </div>

        <div id="table">
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Status</th>
                <th>Delete</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {AllTasks.map((e, i) => (
                <>
                  <tr>
                    <td>{e.task}</td>
                    <td>{e.status}</td>
                    <td>
                      <button className="delete" onClick={() => Delete(e._id)}>
                        Delete
                      </button>
                    </td>
                    <td>
                      <Link className="edit" to={`/users/update-task/${e._id}`}>
                        <button>Edit</button>
                      </Link>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Task;
