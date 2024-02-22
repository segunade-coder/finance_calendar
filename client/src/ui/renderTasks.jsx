/* eslint-disable react/prop-types */
import { Button } from "primereact/button";

import { useContext, useEffect, useState } from "react";
import { MainContext } from "../utils/Helper";
import { CreateTask } from "./Dialogs";
import { toast } from "sonner";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { checkIfEmpty } from "../utils/functions";
import { usePeople, useTasks } from "../components/hooks/query";
import Tasks from "./Tasks";
const RenderTasks = () => {
  const queryTasks = useTasks();
  const { data: people } = usePeople();
  let { io } = useContext(MainContext);
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState(null);
  const [priority, setPriority] = useState(1);
  const [assignTo, setAssignTo] = useState("");
  const [visible2, setVisible2] = useState(false);
  const [filter, setFilter] = useState("");
  const [filterSearch, setFilterSearch] = useState("");
  const [sortUser, setSortUser] = useState("");
  useEffect(() => {
    setTasks(() => queryTasks.data);
  }, [queryTasks.data]);

  const filterTasks = (value) => {
    setFilter(value);
    if (value === "All" || value === null || value === undefined) {
      setTasks(queryTasks.data);
    } else {
      setTasks(queryTasks.data.filter(({ status }) => status.match(value)));
    }
  };

  const assignTaskFooter = (
    <div>
      <Button
        label="Cancel"
        icon="pi pi-times"
        onClick={() => setVisible2(false)}
        className="p-button-text"
        size="small"
      />
      <Button
        label="Add"
        icon="pi pi-check-circle"
        onClick={() => addTasks()}
        autoFocus
        size="small"
      />
    </div>
  );

  const addTasks = () => {
    const isEmpty = checkIfEmpty([
      { task },
      { deadline },
      { priority },
      { "Assign to": assignTo },
    ]);
    if (isEmpty.length === 0) {
      toast.loading("Creating task", { id: "create" });
      io.volatile.emit(
        "add-task",
        {
          task,
          deadline,
          assignTo,
          status: 0,
          priority,
          progress: 0,
        },
        (res) => {
          if (res.status) {
            toast.success(res.message, { id: "create" });
            setVisible2(false);
            setAssignTo("");
            setTask("");
            setDeadline("");
            setPriority(1);
          } else {
            toast.error(res.message, { id: "create" });
          }
        }
      );
    } else {
      toast.error(isEmpty[0]);
    }
  };

  const setFilterSearchFnc = (value) => {
    setFilterSearch(value);
    if (value === "" || value === null || value === undefined) {
      setTasks(queryTasks.data);
    } else {
      setTasks(
        queryTasks.data.filter((a) =>
          a.task.toLowerCase().match(value.toLowerCase().trim())
        )
      );
    }
  };
  const sortUserFnc = (value) => {
    setSortUser(value);
    if (value === "" || value === null || value === undefined) {
      setTasks(queryTasks.data);
    } else {
      setTasks(
        queryTasks.data.filter((a) => {
          const a_t = JSON.parse(a.assignTo);
          return a_t
            .map((user) => user.toLowerCase().match(value.toLowerCase().trim()))
            .some((user) => user);
        })
      );
    }
  };

  return (
    <div className="tasks">
      <div className="tasks-heading">
        <Button
          label=""
          size="small"
          icon={visible2 ? "pi pi-minus" : "pi pi-plus"}
          text
          className="no-shadow p-button-rounded"
          // severity="secondary"
          onClick={() => setVisible2(!visible2)}
          disabled={queryTasks.isLoading}
        />
        <Dropdown
          value={filter}
          onChange={(e) => filterTasks(e.value)}
          options={[
            { label: "All", value: "" },
            { label: "Success", value: 2 },
            { label: "Pending", value: 0 },
            { label: "Working on", value: 3 },
            { label: "Stuck", value: 1 },
          ]}
          optionLabel="label"
          optionValue="value"
          placeholder="filter task"
          showClear
          disabled={queryTasks.isLoading}
        />
        <InputText
          placeholder="Search Task..."
          value={filterSearch}
          onChange={(e) => setFilterSearchFnc(e.target.value)}
          type="search"
          disabled={queryTasks.isLoading}
        />
        <Dropdown
          value={sortUser}
          onChange={(e) => sortUserFnc(e.value)}
          options={people?.map((peep) => peep.name)}
          placeholder="Sort by people"
          showClear
          editable
          disabled={queryTasks.isLoading}
        />
      </div>
      {queryTasks.isLoading && !tasks ? (
        <div>Loading</div>
      ) : (
        <Tasks tasks={tasks} />
      )}
      <CreateTask
        showModal={visible2}
        setShowModal={setVisible2}
        people={people}
        task={task}
        deadline={deadline}
        assignTo={assignTo}
        priority={priority}
        footer={assignTaskFooter}
        setAssignTo={setAssignTo}
        setDeadline={setDeadline}
        setPriority={setPriority}
        setTask={setTask}
      />
    </div>
  );
};

export default RenderTasks;
