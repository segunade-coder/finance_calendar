import { useContext, useEffect } from "react";
// import { useUser } from "./hooks/user";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import axios from "axios";
// import { BASE_URL } from "./services/api";
import { UserContext } from "../contexts/GlobalContext";
const ProtectedRoute = () => {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();
  useEffect(() => {
    setUser({ ...user, admin: true });
    // axios
    //   .get(`${BASE_URL}/account`, { withCredentials: true })
    //   .then(({ data }) => {
    //     console.log(user);
    //     setUser(() => ({ ...data }));
    //   })
    //   .catch((err) => console.log(err));
  }, []);

  return user.loggedIn ? (
    !user.admin ? (
      <Navigate to="events" />
    ) : (
      <Outlet />
    )
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoute;
