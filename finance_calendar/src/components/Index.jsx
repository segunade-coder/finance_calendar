import { NavLink, Outlet } from "react-router-dom";
import { logo } from "../Images.js";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Tag } from "primereact/tag";
import { useState, useEffect } from "react";
import { Sidebar } from "primereact/sidebar";
import socketIOClient from "socket.io-client";
import { MainContext } from "./Helper.js";
const Index = () => {
  const [sideview, setSideview] = useState(false);
  // const [url] = useState("http://localhost:3000");
  const [url] = useState("");

  const io = socketIOClient(url);
  useEffect(() => {
    io.on("connect", () => {
      console.log("connected");
    });

    io.on("connect_failed", () => {
      console.log("failed");
    });
    io.on("connect_error", () => {
      console.error("Error while connecting to server");
      // console.clear();
    });
    io.on("disconnect", () => {
      console.log("disconnected");
    });
  }, [io]);
  return (
    <MainContext.Provider
      value={{
        io,
      }}
    >
      <div>
        <header className="header">
          <div className="logo">
            <img src={logo} alt="Logo" />
            <div className="xtra">
              <a href="#">
                Products <Tag value="new" />
              </a>
              <a href="#">Company </a>
              <a href="#">Connect</a>
              <a href="https://app.rapidsuite.ng/administrator.php">
                Administrator
              </a>
            </div>

            <button>Contact us</button>
            <i
              className="pi pi-align-justify c-menu"
              style={{ color: "white", cursor: "pointer" }}
              onClick={() => setSideview(!sideview)}
            ></i>
          </div>
          <div className="text">
            {/* <h3>Finance and Event Tracking Platform</h3>
          <div className="small">Lorem ipsum dolor sit amet.</div> */}
          </div>
        </header>
        <Sidebar visible={sideview} onHide={() => setSideview(false)}>
          {/* <h2>SideBar</h2> */}
          <div className="xtra">
            <a href="#">
              Products <Tag value="new" />
            </a>
            <a href="#">Company</a>
            <a href="#">Connect</a>
            <a href="https://app.rapidsuite.ng/administrator.php">
              Administrator
            </a>
          </div>
        </Sidebar>
        <nav>
          <NavLink to="cash-in">Cash In</NavLink>
          <NavLink to="cash-out">Cash Out</NavLink>
          <NavLink to="events">Events Calendar</NavLink>
          <NavLink to="others">Others</NavLink>
        </nav>
        <div className="outlet-content">
          <Outlet />
        </div>
      </div>
    </MainContext.Provider>
  );
};

export default Index;
