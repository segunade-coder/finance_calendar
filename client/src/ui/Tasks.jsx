/* eslint-disable react/prop-types */
import { Avatar } from "primereact/avatar";
import { AvatarGroup } from "primereact/avatargroup";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import {
  checkIfEmpty,
  colors,
  dateExpired,
  formatList,
  formatTimeAgo,
  returnColor,
  statusFormat,
} from "../utils/functions";
import { Tooltip } from "primereact/tooltip";
import { Rating } from "primereact/rating";
import { ProgressBar } from "primereact/progressbar";
import { confirmDialog } from "primereact/confirmdialog";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../utils/Helper";
import { CreateTask } from "./Dialogs";
import { toast } from "sonner";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
const Tasks = ({ tasksArr, setTasksArr, isLoadingTasks, people }) => {
  let { io } = useContext(MainContext);
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState(null);
  const [priority, setPriority] = useState(1);
  const [assignTo, setAssignTo] = useState("");
  const [visible2, setVisible2] = useState(false);
  const [filterArr, setFilterArr] = useState([]);
  const [filter, setFilter] = useState("");
  const [filterSearch, setFilterSearch] = useState("");
  const [sortUser, setSortUser] = useState("");
  useEffect(() => {
    setFilter("");
    setFilterArr(tasksArr);
  }, [tasksArr]);
  useEffect(() => {
    io.on("mail-response", ({ data }) => {
      console.log("running 2");
      if (data.status) {
        toast.success(`${data.message}  ${formatList(data.to)}`);
      }
    });
  }, [io]);

  const deleteTasks = (id) => {
    io.volatile.emit("delete-task", { id }, (res) => {
      if (res.status) {
        setTasksArr(tasksArr.filter((tas) => tas.id !== id));
        toast.success(res.message, { id: "create" });
      } else {
        toast.error(res.message, { id: "create" });
      }
    });
  };

  const filterTasks = (value) => {
    setFilter(value);
    if (value === "All" || value === null || value === undefined) {
      setFilterArr(tasksArr);
    } else {
      setFilterArr(tasksArr.filter(({ status }) => status.match(value)));
    }
  };
  const confirm1 = (id) => {
    confirmDialog({
      message: "Do you want to delete this task?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => deleteTasks(id),
      reject: () => {},
    });
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
      setFilterArr(tasksArr);
    } else {
      setFilterArr(
        tasksArr.filter((a) =>
          a.task.toLowerCase().match(value.toLowerCase().trim())
        )
      );
    }
  };
  const sortUserFnc = (value) => {
    console.log(value);
    setSortUser(value);
    if (value === "" || value === null || value === undefined) {
      setFilterArr(tasksArr);
    } else {
      setFilterArr(
        tasksArr.filter((a) => {
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
          disabled={isLoadingTasks}
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
          disabled={isLoadingTasks}
        />
        <InputText
          placeholder="Search Task..."
          value={filterSearch}
          onChange={(e) => setFilterSearchFnc(e.target.value)}
          type="search"
          disabled={isLoadingTasks}
        />
        <Dropdown
          value={sortUser}
          onChange={(e) => sortUserFnc(e.value)}
          options={people.map((peep) => peep.name)}
          placeholder="Sort by people"
          showClear
          editable
          disabled={isLoadingTasks}
        />
      </div>
      <div className="tasks-card">
        {isLoadingTasks ? (
          <div>loading..</div>
        ) : filterArr.length > 0 ? (
          filterArr.map((tas, i) => (
            <div className="task-card" key={tas.id}>
              <div className="tasks-body">
                <div className="p-card-heading task-content">
                  <Link
                    to={`event/${tas.id}`}
                    state={{
                      event: tasksArr.filter((ta) => ta.id === tas.id),
                      people,
                    }}
                    title={tas.task.length > 22 ? tas.task : ""}
                  >
                    {tas.task}
                  </Link>
                </div>
                <div className="avatar-group">
                  <AvatarGroup>
                    {tas.assignTo &&
                      JSON.parse(tas.assignTo).map(
                        (assign, index) =>
                          index < 2 && (
                            <Avatar
                              shape="circle"
                              size="normal"
                              key={assign}
                              label={assign[0].toUpperCase() + "  "}
                              style={{
                                backgroundColor: returnColor(
                                  index === 0
                                    ? Math.floor(Math.random() * colors.length)
                                    : index,
                                  true
                                )[0],
                                color: returnColor(
                                  index === 0
                                    ? Math.floor(Math.random() * colors.length)
                                    : index,
                                  true
                                )[1],
                              }}
                              title={formatList(tas.assignTo)}
                            />
                          )
                      )}
                    {JSON.parse(tas.assignTo).length > 2 && (
                      <Avatar
                        shape="circle"
                        size="normal"
                        label={JSON.parse(tas.assignTo).length - 2 + "+"}
                        style={{
                          backgroundColor: returnColor(i)[0],
                          color: returnColor(i)[1],
                        }}
                        title={formatList(tas.assignTo)}
                      />
                    )}
                  </AvatarGroup>
                </div>
                <div className="status">
                  <Button
                    severity={statusFormat(tas.status).color}
                    label={statusFormat(tas.status).text}
                    size="small"
                    className="no-shadow"
                  />
                </div>
                <div className="deadline">
                  <Tooltip target=".custom-target-icon" />
                  <i
                    className="custom-target-icon pi pi-calendar p-text-secondary p-overlay-badge"
                    data-pr-tooltip={
                      tas.deadline !== "" && dateExpired(tas.deadline)
                        ? "expired " + formatTimeAgo(new Date(tas.deadline))
                        : "expires " + formatTimeAgo(new Date(tas.deadline))
                    }
                    data-pr-position="right"
                    data-pr-at="right+5 top"
                    data-pr-my="left center-2"
                    style={{
                      cursor: "pointer",
                      color: dateExpired(tas.deadline) ? "red" : "green",
                    }}
                  >
                    {/* {renderDate(tas.deadline)} */}
                  </i>
                </div>
                <div className="rating">
                  <Rating value={tas.priority} cancel={false} readOnly />
                </div>
                <div className="progress">
                  <ProgressBar value={tas.progress}></ProgressBar>
                </div>
                <div className="delete">
                  <i
                    className="pi pi-fw pi-trash"
                    style={{ color: "#EF4444" }}
                    onClick={() => confirm1(tas.id)}
                  ></i>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ color: "#7a7a7a", marginTop: "0.5rem" }}>No Tasks</div>
        )}
      </div>
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

export default Tasks;
