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
} from "./routes";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="" element={<Main />}>
            <Route path="" element={<Navigate to="/events" />} />
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
                  <Suspense fallback={<div>Loading event...</div>}>
                    <SingleEvent />
                  </Suspense>
                }
              />
              <Route
                path="person/:id"
                element={
                  <Suspense fallback={<div>Loading person...</div>}>
                    <SinglePerson />
                  </Suspense>
                }
              />
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
