import { useContext, useEffect, useState } from "react";
import "./eventCalendar.css";
import { Outlet } from "react-router-dom";
import { MainContext } from "../../utils/Helper.js";
import { ConfirmDialog } from "primereact/confirmdialog";
import People from "../../ui/People.jsx";
import Tasks from "../../ui/Tasks.jsx";
const EventCalendar = () => {
  let { io } = useContext(MainContext);

  const [people, setPeople] = useState([]);
  const [isLoadingPeople, setIsLoadingPeople] = useState(false);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);
  const [tasksArr, setTasksArr] = useState([]);
  document.title = "Events";
  useEffect(() => {
    setIsLoadingTasks(true);
    setIsLoadingPeople(true);
    io.emit("get-people");
    io.emit("get-tasks");
    io.on("set-people", ({ data }) => {
      setPeople(data);
      setIsLoadingPeople(false);
    });
    io.on("set-tasks", ({ data }) => {
      setTasksArr(data);
      setIsLoadingTasks(false);
    });
  }, []);

  return (
    <div className="__events">
      <ConfirmDialog />
      <People
        people={people}
        setPeople={setPeople}
        isLoadingPeople={isLoadingPeople}
      />
      <Tasks
        people={people}
        tasksArr={tasksArr}
        setTasksArr={setTasksArr}
        isLoadingTasks={isLoadingTasks}
      />

      <Outlet />
    </div>
  );
};

export default EventCalendar;
