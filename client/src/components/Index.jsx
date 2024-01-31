import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logo } from "../Images.js";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Tag } from "primereact/tag";
import { useState, useEffect } from "react";
import { Sidebar } from "primereact/sidebar";
import socketIOClient from "socket.io-client";
import { MainContext } from "../utils/Helper.js";
import { tabLinks } from "../ui/tablinks.js";
import { Toaster, toast } from "sonner";
import { Avatar } from "primereact/avatar";
import { returnColor } from "../utils/functions.js";
const Index = () => {
  const [sideview, setSideview] = useState(false);
  const [url] = useState("http://localhost:3000");
  const [user, setUser] = useState({
    user_id: "",
    user: "",
    admin: false,
  });
  const navigate = useNavigate();
  // const [url] = useState("");

  const io = socketIOClient(url, {
    withCredentials: true,
  });
  useEffect(() => {
    io.on("connect", () => {
      toast.dismiss("err");
    });
    io.emit("check-status");
    io.on("status", (user_details) => {
      setUser(user_details);
    });
    io.on("connect_failed", () => {
      // toast("Connection lost", { id: "err_con" });
      console.log("failed");
    });
    io.on("connect_error", (err) => {
      if (err.message.includes("authorized")) navigate("/login");
      else
        toast.loading("Connection lost. Reconnecting", {
          id: "err",
          duration: 1000 * 60 * 60 * 24 * 24,
        });
    });
    io.on("disconnect", () => {
      toast.error("You're currently offline", {
        id: "err",
        duration: 1000 * 60 * 60 * 24 * 24,
      });
    });
  }, []);
  return (
    <MainContext.Provider
      value={{
        io,
        url,
        user,
      }}
    >
      <div>
        <Toaster richColors closeButton />
        <header className="header">
          <div className="logo">
            <img src={logo} alt="Logo" />
            <div className="xtra">
              <a href="#">
                Products <Tag value="new" />
              </a>
              <a href="#">Company </a>
              <a href="#">Contact us</a>
              <a
                href="https://app.rapidsuite.ng/administrator.php"
                target="_blank"
                rel="noreferrer"
              >
                Administrator
              </a>
            </div>

            <button>Logout</button>
            <i
              className="pi pi-align-justify c-menu"
              style={{
                color: "white",
                cursor: "pointer",
                marginRight: "0.5rem",
              }}
              onClick={() => setSideview(!sideview)}
            ></i>
            <Avatar
              label={user.user[0]?.toUpperCase()}
              size="normal"
              style={{
                backgroundColor: returnColor(0)[0],
                color: returnColor(0)[1],
              }}
              title={user.user}
            />
          </div>
          <div className="text"></div>
        </header>
        <Sidebar visible={sideview} onHide={() => setSideview(false)}>
          {/* <h2>SideBar</h2> */}
          <div className="xtra">
            <a href="#">
              Products <Tag value="new" />
            </a>
            <a href="#">Company</a>
            <a href="https://app.rapidsuite.ng/administrator.php">
              Administrator
            </a>
            <a href="#">Logout</a>
          </div>
        </Sidebar>
        <nav>
          {tabLinks.map((link, i) => (
            <NavLink to={link.link} key={i + link}>
              {link.name}
            </NavLink>
          ))}
        </nav>
        <div className="outlet-content">
          <Outlet />
        </div>
      </div>
    </MainContext.Provider>
  );
};

export default Index;
