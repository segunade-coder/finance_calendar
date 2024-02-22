import { useContext, useEffect } from "react";
import "./eventCalendar.css";
import { Outlet } from "react-router-dom";
import { MainContext } from "../../../utils/Helper.js";
import People from "../../../ui/People.jsx";
import { formatList } from "../../../utils/functions.js";
import { toast } from "sonner";
import RenderTasks from "../../../ui/renderTasks.jsx";
import { ConfirmDialog } from "primereact/confirmdialog";

const EventCalendar = () => {
  let { io } = useContext(MainContext);

  document.title = "Events";
  useEffect(() => {
    io.emit("get-mailStatus");
    io.on("mail-response", (data) => {
      if (Object.keys(data).length > 0) {
        setTimeout(() => {
          if (data?.status) {
            toast.success(`${data.message}  ${formatList(data.to)}`);
          } else {
            toast.error(`Unable to send mail`);
          }
        }, 5000);
      }
    });
  }, []);

  return (
    <div className="__events">
      <ConfirmDialog />
      <People />

      <RenderTasks />

      <Outlet />
    </div>
  );
};

export default EventCalendar;
