/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Slider } from "primereact/slider";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { Rating } from "primereact/rating";
import { Calendar } from "primereact/calendar";
import { MainContext } from "../../utils/Helper.js";
import { toast } from "sonner";
import {
  checkIfEmpty,
  // formatTimeAgo,
  renderDate,
  statusFormat,
} from "../../utils/functions.js";
import { InputTextarea } from "primereact/inputtextarea";

const SingleEvent = () => {
  const id = useRef(null);
  const { io } = useContext(MainContext);
  const navigate = useNavigate();
  const [indTask, setIndTask] = useState([]);
  const [updateTask, setUpdateTask] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");
  const [statusText, setStatusText] = useState("");
  const [assignTo, setAssignTo] = useState([]);
  const [people, setPeople] = useState([]);
  const [progress, setProgress] = useState(0);
  const [priority, setPriority] = useState(0);
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(false);
  id.current = useParams().id;
  useEffect(() => {
    setLoading(true);
    io.emit("get-people");
    io.on("set-people", ({ data }) => {
      setPeople(data);
    });
    io.emit("get-task", id.current);
    io.on("set-task", ({ data }) => {
      setIndTask(data);
      setUpdateTask(data[0]?.task);
      setUpdateStatus(getStatus(data[0]?.status));
      setStatusText(getStatus(data[0]?.status));
      setStatusText(data[0]?.status);
      setProgress(data[0]?.progress);
      setAssignTo(JSON.parse(data[0]?.assignTo));
      setPriority(data[0]?.priority);
      setDeadline(new Date(data[0]?.deadline));
    });
    setLoading(false);
  }, [id.current]);

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

  const handleUpdate = (e) => {
    e.preventDefault();
    const isEmpty = checkIfEmpty([
      { task: updateTask },
      { deadline },
      { "Assign to": assignTo },
    ]);
    if (isEmpty.length > 0) {
      toast.error(isEmpty[0], { id: "update" });
    } else {
      io.volatile.emit(
        "update-task",
        {
          id: indTask[0]?.id,
          task: updateTask,
          assignTo,
          priority,
          status: getStatusNumber(updateStatus),
          deadline,
          progress,
        },
        (res) => {
          if (res.status) {
            toast.success("Update completed", { id: "update" });
          }
        }
      );
    }
  };
  const setUpdateStatusFnc = (val) => {
    setUpdateStatus(val);
    setStatusText(getStatusNumber(val));
  };
  return (
    <aside className="__s-event">
      <div>
        <div className="heading">
          <Button
            icon="pi pi-times"
            onClick={() => navigate("../")}
            className="no-shadow p-button-rounded"
            style={{ marginLeft: "-0.8rem" }}
            text
          />
          <p>Edit Task</p>
        </div>
      </div>
      {!loading ? (
        indTask.length > 0 ? (
          <div className="s-event-cont">
            <div className="p-card-body" style={{ padding: "0.5rem 0.5rem" }}>
              <div>
                <InputTextarea
                  value={updateTask}
                  onChange={(e) => setUpdateTask(e.target.value)}
                />
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
              <small>Progress</small>
              <div className="slider">
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
              <small>Deadline </small>
              <div className="deadline">
                <span className="date">{renderDate(deadline)}</span>
                <Calendar
                  value={deadline}
                  onChange={(e) => setDeadline(e.value)}
                  showButtonBar
                  showIcon
                />
              </div>
              <small>Assign To</small>
              <div className="p-people ">
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
        ) : (
          <div className="loading">Nothing here</div>
        )
      ) : (
        <div className="loading">Loading...</div>
      )}
    </aside>
  );
};

export default SingleEvent;
