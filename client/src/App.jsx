import { Suspense } from "react";
import "./App.css";
import {
  Cashin,
  Cashout,
  EventCalendar,
  Main,
  SingleEvent,
  SinglePerson,
  Others,
  Login,
} from "./routes";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="" element={<Navigate to="login" />} />
          <Route path="login" element={<Login />} />
          {/* admin routes */}
          {/* <Route element={<ProtectedRoute />}> */}
          <Route path="a" element={<Main />}>
            <Route path="" element={<Navigate to="events" />} />
            <Route
              path="cash-in"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Cashin />
                </Suspense>
              }
            />
            <Route
              path="cash-out"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Cashout />
                </Suspense>
              }
            />
            <Route
              path="others"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Others />
                </Suspense>
              }
            />
            <Route
              path="events"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <EventCalendar />
                </Suspense>
              }
            >
              <Route
                path="event/:id"
                element={
                  <Suspense
                    fallback={
                      <div className="fallback-loading">
                        <i className="pi pi-spin pi-spinner"></i>
                      </div>
                    }
                  >
                    <SingleEvent />
                  </Suspense>
                }
              />
              <Route
                path="person/:id"
                element={
                  <Suspense
                    fallback={
                      <div className="fallback-loading">
                        <i className="pi pi-spin pi-spinner"></i>
                      </div>
                    }
                  >
                    <SinglePerson />
                  </Suspense>
                }
              />
            </Route>
          </Route>
          {/* user routes */}
          <Route path="events" element={<div>normal user routes</div>} />
          {/* </Route> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
