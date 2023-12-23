import { lazy } from "react";
import Main from "./components/Index.jsx";
const Cashin = lazy(() => import("./components/cashin/Cashin.jsx"));
const Cashout = lazy(() => import("./components/cashout/Cashout.jsx"));
const EventCalendar = lazy(() =>
  import("./components/eventsCalendar/EventCalendar.jsx")
);
const SingleEvent = lazy(() =>
  import("./components/eventsCalendar/SingleEvent.jsx")
);
const SinglePerson = lazy(() =>
  import("./components/eventsCalendar/SinglePerson.jsx")
);
const Others = lazy(() => import("./components/others/Others.jsx"));
export {
  Cashin,
  Cashout,
  EventCalendar,
  Main,
  SingleEvent,
  SinglePerson,
  Others,
};
