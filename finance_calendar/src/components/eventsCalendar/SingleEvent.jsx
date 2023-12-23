/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Slider } from "primereact/slider";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { Rating } from "primereact/rating";
import { Calendar } from "primereact/calendar";
import { MainContext } from "../Helper.js";

const SingleEvent = () => {
  const { id } = useParams();
  const { io } = useContext(MainContext);
  const navigate = useNavigate();
  const [indTask, setIndTask] = useState([[]]);
  const [updateStatus, setUpdateStatus] = useState("");
  const [statusText, setStatusText] = useState("");
  const [assignTo, setAssignTo] = useState([]);
  const [people, setPeople] = useState([]);
  const [progress, setProgress] = useState(0);
  const [priority, setPriority] = useState(0);
  const [deadline, setDeadline] = useState("");
  useEffect(() => {
    try {
      if (window?.history?.state?.usr?.event !== undefined) {
        setIndTask(window.history.state?.usr?.event);
        setPeople(window.history.state?.usr?.people);
        setUpdateStatus(getStatus(window.history.state?.usr?.event[0]?.status));
        setStatusText(getStatus(window.history.state?.usr?.event[0]?.status));
        setStatusText(window.history.state?.usr?.event[0]?.status);
        setProgress(window.history.state?.usr?.event[0]?.progress);
        setAssignTo(JSON.parse(window.history.state?.usr?.event[0]?.assignTo));
        setPriority(window.history.state?.usr?.event[0]?.priority);
        setDeadline(new Date(window.history.state?.usr?.event[0]?.deadline));
      } else {
        navigate("../");
      }
    } catch (error) {
      navigate("../");
    }
  }, [id]);

  const getStatus = (id) => {
    id = Number(id);
    switch (id) {
      case 0:
        return "Pending";
      case 1:
        return "Stuck";
      case 2:
        return "Done";
      case 3:
        return "Working on";

      default:
        return "Pending";
    }
  };
  const getStatusNumber = (id) => {
    switch (id) {
      case "Pending":
        return 0;
      case "Stuck":
        return 1;
      case "Done":
        return 2;
      case "Working on":
        return 3;
      default:
        return 0;
    }
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
  const peopleTemplate = (people) => {
    const formatter = new Intl.ListFormat("en-GB", {
      style: "narrow",
      type: "conjunction",
    });
    return (
      <div>
        <p style={{ margin: 0, textTransform: "capitalize" }}>{people.name}</p>
        <small
          className="p-card-subtitle"
          style={{ margin: 0, textTransform: "capitalize" }}
        >
          {formatter.format(JSON.parse(people.role))}
        </small>
      </div>
    );
  };
  const renderDate = (date) => {
    if (date !== "" && date !== undefined) {
      const formatter = Intl.DateTimeFormat("en-GB", {
        // dateStyle: "short",
        day: "2-digit",
        month: "short",
        year: "2-digit",
      });
      return formatter.format(new Date(date));
    }
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
  const handleUpdate = (e) => {
    e.preventDefault();
    io.emit("update-task", {
      id: indTask[0]?.id,
      assignTo,
      priority,
      status: getStatusNumber(updateStatus),
      deadline,
      progress,
    });
  };
  const setUpdateStatusFnc = (val) => {
    setUpdateStatus(val);
    setStatusText(getStatusNumber(val));
  };
  return (
    <div className="__s-event">
      <div>
        <Button
          icon="pi pi-arrow-left"
          onClick={() => navigate("../")}
          className="no-shadow p-button-rounded"
          style={{ marginLeft: "-0.8rem", marginBottom: "0.5rem" }}
          text
        ></Button>
      </div>
      {indTask.map((task) => (
        <div className="s-event-cont p-card" key={Math.random()}>
          <div className="p-card-body" style={{ padding: "0.5rem 0.5rem" }}>
            <small>Task</small>
            <div className="p-card">
              <div className="p-card-body">{task.task}</div>
            </div>
            <small>Status</small>
            <div className="flex no-wrap p-card-body">
              <Button
                severity={statusFormat(statusText).color}
                label={statusFormat(statusText).text}
                size="small"
                className="no-shadow"
                style={{ flexBasis: "100%" }}
              />
              <Dropdown
                value={updateStatus}
                onChange={(e) => setUpdateStatusFnc(e.value)}
                options={["Pending", "Working on", "Done", "Stuck"]}
              ></Dropdown>
            </div>
            <div className="slider p-card">
              <div className="p-card-body">
                <small>Progress</small>
                <Slider
                  value={progress}
                  onChange={(e) => setProgress(e.value)}
                />
                <InputText
                  value={progress}
                  onChange={(e) => setProgress(e.target.value)}
                  keyfilter="pnum"
                />
              </div>
            </div>
            <small>Deadline </small>
            <div className="deadline  p-card">
              <div className="p-card-body">
                <div className="p-card-heading">{renderDate(deadline)}</div>
                <br />
                <Calendar
                  value={deadline}
                  onChange={(e) => setDeadline(e.value)}
                  showButtonBar
                  showIcon
                />
              </div>
              <div
                className=""
                style={{
                  padding: "0.2rem 0.5rem",
                  textTransform: "capitalize",
                }}
              >
                {formatTimeAgo(new Date(deadline))}
              </div>
            </div>
            <small>Assign To</small>
            <div className="people p-card">
              <div className="p-card-body">
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
              </div>
            </div>
            <small>Priority</small>
            <div className="priority flex no-wrap">
              <Rating
                value={priority}
                cancel={false}
                onChange={(e) => setPriority(e.value)}
              />
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
            <Button
              label="Update"
              icon="pi pi-check-circle"
              severity="success"
              className="w-100"
              style={{ marginTop: ".8rem" }}
              onClick={(e) => handleUpdate(e)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SingleEvent;
