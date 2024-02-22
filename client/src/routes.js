import { lazy } from "react";
import Main from "./components/admin/Index.jsx";
import Login from "./components/login/Login.jsx";
const Cashin = lazy(() => import("./components/admin/cashin/Cashin.jsx"));
const Cashout = lazy(() => import("./components/admin/cashout/Cashout.jsx"));
const EventCalendar = lazy(() =>
  import("./components/admin/eventsCalendar/EventCalendar.jsx")
);
const SingleEvent = lazy(() =>
  import("./components/admin/eventsCalendar/SingleEvent.jsx")
);
const SinglePerson = lazy(() =>
  import("./components/admin/eventsCalendar/SinglePerson.jsx")
);
const Others = lazy(() => import("./components/admin/others/Others.jsx"));
export {
  Cashin,
  Cashout,
  EventCalendar,
  Main,
  Login,
  SingleEvent,
  SinglePerson,
  Others,
};
