/* eslint-disable no-unused-vars */
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useContext, useEffect, useRef, useState } from "react";
import "./eventCalendar.css";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { Avatar } from "primereact/avatar";
import { AvatarGroup } from "primereact/avatargroup";
import { Calendar } from "primereact/calendar";
import { Rating } from "primereact/rating";
import { ProgressBar } from "primereact/progressbar";
import { Link, Outlet } from "react-router-dom";
import { MainContext } from "../Helper.js";
import { Tooltip } from "primereact/tooltip";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
const EventCalendar = () => {
  let { io } = useContext(MainContext);

  const cm = useRef(null);
  const menu = useRef(null);
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [addPeopleStatus, setAddPeopleStatus] = useState(false);
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState(null);
  const [priority, setPriority] = useState(1);
  const [assignTo, setAssignTo] = useState("");
  const [isLoadingPeople, setIsLoadingPeople] = useState(false);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);
  const [tasksArr, setTasksArr] = useState([]);
  const [people, setPeople] = useState([]);
  const colorsReversed = [
    ["#DD571C", "#ffffff"],
    ["#4caf4f", "#ffffff"],
    ["#9c27b0", "#ffffff"],
    ["#126180", "#FFFFFF"],
    ["#eab308", "#ffffff"],
    ["#3A5311", "#ffffff"],
    ["#2196f3", "#ffffff"],
    ["#4B5320", "#ffffff"],
    ["#7A3803", "#ffffff"],
    ["#E34A27", "#FFFFFF"],
    ["#028A0F", "#ffffff"],
    ["#48AAAD", "#ffffff"],
    ["#241571", "#FFFFFF"],
  ];
  const colors = [
    ["#2196f3", "#ffffff"],
    ["#7A3803", "#ffffff"],
    ["#9c27b0", "#ffffff"],
    ["#4caf4f", "#ffffff"],
    ["#E34A27", "#FFFFFF"],
    ["#028A0F", "#ffffff"],
    ["#eab308", "#ffffff"],
    ["#990F02", "#ffffff"],
    ["#4B5320", "#ffffff"],
    ["#DD571C", "#ffffff"],
    ["#3A5311", "#ffffff"],
    ["#3944BC", "#ffffff"],
  ];
  useEffect(() => {
    setIsLoadingPeople(true);
    setIsLoadingTasks(true);
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
  }, [io]);

  // button to add people
  const footerContent = (
    <div>
      <Button
        label="Cancel"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        className="p-button-text"
        size="small"
      />
      <Button
        label="Add"
        icon="pi pi-check-circle"
        onClick={() => addPeople(false)}
        autoFocus
        size="small"
        loading={addPeopleStatus}
      />
    </div>
  );

  // button to assign task globally
  const footerContent2 = (
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
        loading={addPeopleStatus}
      />
    </div>
  );

  // button to asign task individually
  const footerContent3 = (
    <div>
      <Button
        label="Cancel"
        icon="pi pi-times"
        onClick={() => setVisible3(false)}
        className="p-button-text"
        size="small"
      />
      <Button
        label="Add"
        autoFocus
        icon="pi pi-check-circle"
        onClick={() => addTasks()}
        size="small"
        loading={addPeopleStatus}
      />
    </div>
  );

  const addPeople = () => {
    // setPeople((prevPeople) => [
    //   ...prevPeople,
    //   { id: people[people.length - 1]?.id + 1 || 1, name, role },
    // ]);
    if (name !== "" && role !== "") {
      io.emit("add-person", { name, role });
      setVisible(false);
      setName("");
      setRole("");
    }
  };
  const returnColor = (i, reversed = false) => {
    let index = i;
    index = index >= colors.length ? 0 : i;
    return reversed ? colorsReversed[index] : colors[index];
  };
  const addIndTask = (name) => {
    let peep = people.find(
      (peep) => peep.name.toLowerCase().trim() === name.toLowerCase().trim()
    );
    setAssignTo([peep.name]);
    setVisible3(true);
    console.log(assignTo);
  };
  const handleDelete = (id) => {
    // console.log(people);
    setPeople(people.filter((peep) => peep.id !== id));
    io.emit("delete-person", { id });
  };
  const formatter = new Intl.ListFormat("en-GB", {
    style: "narrow",
    type: "conjunction",
  });
  const formatList = (role) => {
    const newRole = formatter.format(JSON.parse(role));
    return newRole;
  };
  const peopleTemplate = (people) => {
    let role = JSON.parse(people.role);

    return (
      <div>
        <p style={{ margin: 0, textTransform: "capitalize" }}>{people.name}</p>
        <small
          className="p-card-subtitle"
          style={{ margin: 0, textTransform: "capitalize" }}
        >
          {formatter.format(role)}
        </small>
      </div>
    );
  };
  const addTasks = () => {
    setVisible2(false);
    if (
      task !== "" &&
      deadline !== "" &&
      deadline !== null &&
      assignTo !== "" &&
      priority !== ""
    ) {
      io.emit("add-task", {
        task,
        deadline,
        assignTo,
        status: 0,
        priority,
        progress: 0,
      });

      setVisible3(false);
      setAssignTo("");
      setTask("");
      setDeadline("");
      setPriority(1);
    }
  };
  const renderDate = (date) => {
    const formatter = Intl.DateTimeFormat("en-GB", {
      // dateStyle: "short",
      day: "2-digit",
      month: "short",
      year: "2-digit",
    });
    return formatter.format(new Date(date));
  };
  const statusFormat = (id) => {
    id = Number(id);
    switch (id) {
      case 0:
        return { text: "Pending", color: "secondary" };
      case 1:
        return { text: "Stuck", color: "danger" };
      case 2:
        return { text: "Done", color: "success" };
      case 3:
        return { text: "Working on", color: "warning" };

      default:
        return { text: "Pending", color: "secondary" };
    }
  };
  const deleteTasks = (id) => {
    setTasksArr(tasksArr.filter((tas) => tas.id !== id));
    io.emit("delete-task", { id });
  };
  const formatTimeAgo = (date) => {
    let formatter = new Intl.RelativeTimeFormat(undefined, {
      numeric: "auto",
    });
    const DIVISION = [
      { amount: 60, name: "seconds" },
      { amount: 60, name: "minutes" },
      { amount: 24, name: "hours" },
      { amount: 7, name: "days" },
      { amount: 4.34524, name: "weeks" },
      { amount: 12, name: "months" },
      { amount: Number.POSITIVE_INFINITY, name: "years" },
    ];

    let duration = (date - new Date()) / 1000;
    for (let i = 0; i < DIVISION.length; i++) {
      const division = DIVISION[i];
      if (Math.abs(duration) < division.amount) {
        return formatter.format(Math.round(duration), division.name);
      }
      duration /= division.amount;
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
  const confirm2 = (id) => {
    confirmDialog({
      message: "Do you want to delete this person?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => handleDelete(id),
      reject: () => {},
    });
  };
  return (
    <div className="__events">
      <ConfirmDialog />
      <div className="people">
        <p className="p-card-subtitle mb-1" style={{ color: "#6a6a6a" }}>
          People
        </p>
        <Button
          label=""
          icon={visible ? "pi pi-minus" : "pi pi-plus"}
          // text
          severity="help"
          onClick={() => setVisible(!visible)}
          style={{ marginBottom: "1rem" }}
        />

        <div className="people-card">
          {isLoadingPeople ? (
            <div>loading..</div>
          ) : people.length > 0 ? (
            people.map((peep, i) => (
              <div key={peep.name + Math.random()} className="peep p-card">
                <div className="content p-card-body">
                  <Avatar
                    label={peep.name[0].toUpperCase()}
                    size="large"
                    shape="circle"
                    style={{
                      backgroundColor: returnColor(i)[0],
                      color: returnColor(i)[1],
                    }}
                  />
                  <div className="details p-card-content">
                    <p className="m-0">
                      <Link
                        to={`person/${peep.name
                          .toLowerCase()
                          .replace(/ /g, "-")}`}
                        state={{
                          person: people.filter((per) => per.id === peep.id),
                        }}
                      >
                        {peep.name}
                      </Link>
                    </p>
                    <small className="m-0 p-card-subtitle">
                      {formatList(peep.role)}
                    </small>
                  </div>
                  <div className="p-card-foote">
                    <Button
                      icon="pi pi-plus"
                      text
                      size="small"
                      className="p-button-outlined no-shadow"
                      severity="help"
                      onClick={() => addIndTask(peep.name)}
                    />
                  </div>
                </div>
                <div className="p-card-footer cf">
                  <i
                    className="pi pi-fw pi-trash"
                    style={{ color: "#EF4444" }}
                    onClick={() => confirm2(peep.id)}
                  ></i>
                </div>
              </div>
            ))
          ) : (
            <div style={{ color: "#7a7a7a", marginTop: "0.5rem" }}>
              No People
            </div>
          )}
        </div>
      </div>
      <div className="tasks">
        <p className="p-card-subtitle mb-1" style={{ color: "#6a6a6a" }}>
          Tasks
        </p>

        <Button
          label=""
          icon={visible2 ? "pi pi-minus" : "pi pi-plus"}
          // text
          severity="secondary"
          onClick={() => setVisible2(!visible2)}
        />
        <div className="tasks-card">
          {isLoadingTasks ? (
            <div>loading..</div>
          ) : tasksArr.length > 0 ? (
            tasksArr.map((tas, i) => (
              <div className="p-card" key={tas.id}>
                <div className="p-card-body tasks-body">
                  <div className="p-card-heading task-content">
                    <Link
                      to={`event/${tas.id}`}
                      state={{
                        event: tasksArr.filter((ta) => ta.id === tas.id),
                        people,
                      }}
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
                                      ? Math.floor(
                                          Math.random() * colors.length
                                        )
                                      : index,
                                    true
                                  )[0],
                                  color: returnColor(
                                    index === 0
                                      ? Math.floor(
                                          Math.random() * colors.length
                                        )
                                      : index,
                                    true
                                  )[1],
                                }}
                                title={assign[0].toUpperCase()}
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
                        tas.deadline !== "" &&
                        formatTimeAgo(new Date(tas.deadline))?.includes("ago")
                          ? "expired " + formatTimeAgo(new Date(tas.deadline))
                          : "expires " + formatTimeAgo(new Date(tas.deadline))
                      }
                      data-pr-position="right"
                      data-pr-at="right+5 top"
                      data-pr-my="left center-2"
                      style={{
                        cursor: "pointer",
                        color: formatTimeAgo(new Date(tas.deadline))?.includes(
                          "ago"
                        )
                          ? "red"
                          : "green",
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
                  <div>
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
            <div style={{ color: "#7a7a7a", marginTop: "0.5rem" }}>
              No Tasks
            </div>
          )}
        </div>
      </div>
      {/* dialog to add people  */}
      <Dialog
        header="Add People"
        visible={visible}
        onHide={() => setVisible(false)}
        style={{ width: "30vw" }}
        footer={footerContent}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <div className="event-card">
          <span className="p-float-label">
            <InputText
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="desc">Name</label>
          </span>
          <span className="p-float-label">
            <MultiSelect
              id="role"
              value={role}
              onChange={(e) => setRole(e.value)}
              options={[
                "Frontend Developer",
                "Backend Developer",
                "Marketer",
                "CEO",
                "Project Designer",
                "UI/UX Designer",
                "Supervisor",
              ]}
              display="chip"
            />
            <label htmlFor="desc">Role</label>
          </span>
        </div>
      </Dialog>

      {/* dialog to assign task globally  */}
      <Dialog
        header="Assign Task"
        visible={visible2}
        onHide={() => setVisible2(false)}
        style={{ width: "30vw" }}
        footer={footerContent2}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <div className="event-card">
          <span className="p-float-label">
            <InputText
              id="task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <label htmlFor="desc">Task</label>
          </span>
          <span className="p-float-label">
            <MultiSelect
              id="role"
              value={assignTo}
              onChange={(e) => setAssignTo(e.value)}
              options={people}
              optionLabel="name"
              optionValue="name"
              itemTemplate={peopleTemplate}
              display="chip"
            />
            <label htmlFor="desc">Assign To</label>
          </span>
          <span className="p-float-label">
            <Calendar
              id="deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.value)}
              showIcon
              selectionMode="range"
              readOnlyInput
            />
            <label htmlFor="deadline">Select Date Range</label>
          </span>
          <span className="p-float-label">
            <Dropdown
              value={priority}
              onChange={(e) => setPriority(e.value)}
              options={[
                { label: "Very Important", value: 5 },
                { label: "Very High", value: 4 },
                { label: "High", value: 3 },
                { label: "Moderate", value: 2 },
                { label: "Low", value: 1 },
              ]}
              optionLabel="label"
              optionValue="value"
            />
            <label htmlFor="deadline">Priority</label>
          </span>
        </div>
      </Dialog>

      {/* dialog to asign task individually  */}
      <Dialog
        header="Assign Task"
        visible={visible3}
        onHide={() => setVisible3(false)}
        style={{ width: "30vw" }}
        footer={footerContent3}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <div className="event-card">
          <span className="p-float-label">
            <InputText
              id="task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <label htmlFor="desc">Task</label>
          </span>
          <span className="p-float-label">
            <InputText value={assignTo[0]} readOnly />
            <label htmlFor="desc">Assign To</label>
          </span>
          <span className="p-float-label">
            <Calendar
              id="deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.value)}
              showIcon
              selectionMode="range"
              readOnlyInput
            />
            <label htmlFor="deadline">Select Date Range</label>
          </span>
          <Dropdown
            value={priority}
            onChange={(e) => setPriority(e.value)}
            options={[
              { label: "Very Important", value: 5 },
              { label: "Very High", value: 4 },
              { label: "High", value: 3 },
              { label: "Moderate", value: 2 },
              { label: "Low", value: 1 },
            ]}
            optionLabel="label"
            optionValue="value"
          />
        </div>
      </Dialog>
      <Outlet />
    </div>
  );
};

export default EventCalendar;
