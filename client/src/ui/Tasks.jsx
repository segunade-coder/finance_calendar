/* eslint-disable react/prop-types */
import { Avatar } from "primereact/avatar";
import { AvatarGroup } from "primereact/avatargroup";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import {
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
import { useContext } from "react";
import { MainContext } from "../utils/Helper";
import { toast } from "sonner";
const Tasks = ({ tasks }) => {
  let { io } = useContext(MainContext);

  const deleteTasks = (id) => {
    io.volatile.emit("delete-task", { id }, (res) => {
      if (res.status) {
        // setTasksArr(data.filter((tas) => tas.id !== id));
        toast.success(res.message, { id: "create" });
      } else {
        toast.error(res.message, { id: "create" });
      }
    });
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

  return (
    <div className="tasks-card">
      {tasks?.length > 0 ? (
        tasks.map((tas, i) => (
          <div className="task-card" key={tas.id}>
            <div className="tasks-body">
              <div className="p-card-heading task-content">
                <Link
                  to={`event/${tas.id}`}
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
  );
};

export default Tasks;
