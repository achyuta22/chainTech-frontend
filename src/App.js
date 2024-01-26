import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [tasks, setTasks] = useState([]);
  // useEffect(() => {
  //   setTimeout(async () => {
  //     const d = await getTasks();
  //   });
  // }, []);
  const getTasks = async () => {
    const { data } = await axios.get("http://localhost:5000/user/allTasks");
    console.log("getting tasks");
    console.log(data.data);
    setTasks(data.data);
  };
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("http://localhost:5000/user/allTasks");
      console.log("getting tasks");
      console.log(data.data);
      setTasks(data.data);
    };
    fetchData();
  }, []);
  const addtask = async (e) => {
    e.preventDefault();
    console.log("add task", title, description);
    if (title && description) {
      try {
        const { data } = await axios.post(
          "http://localhost:5000/user/createTask",
          {
            title: title,
            description: description,
          }
        );
        console.log("Task created successfully:", data);
        alert("Task added succesffully");
        setTitle("");
        setDescription("");
        getTasks();
      } catch (error) {
        console.log("error occurred while adding task to database");
      }
    } else {
      alert("title and description should be valid");
    }
  };

  const deleteTask = async (taskTitle) => {
    console.log(taskTitle);
    console.log("deleting the task");
    const deletedTask = await axios.delete(
      `http://localhost:5000/user/deleteTask?title=${taskTitle}`
    );
    console.log(deletedTask);
    getTasks();
  };
  return (
    <div className="App">
      <div className="box" id="heading">
        <h1>Tasks To Do </h1>
      </div>
      <div className="box">
        <form>
          {tasks.map((task) => (
            <div className="item1" key={task._id}>
              <input
                type="checkbox"
                name="checkbox"
                onChange={() => deleteTask(task.title)}
              />
              <div className="title-description">
                <p className="title">{task.title}</p>
              </div>
            </div>
          ))}
        </form>

        <div className="item2">
          <div>
            <input
              type="text"
              name="thing"
              placeholder="Title"
              value={title}
              autocomplete="off"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <br />
          <div>
            <input
              type="text"
              name="thing"
              placeholder="Description"
              autocomplete="off"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />

            <button type="submit" name="list" onClick={addtask}>
              +{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
