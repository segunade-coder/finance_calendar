/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MainContext } from "../../utils/Helper";
import { formatList } from "../../utils/functions";
const SinglePerson = () => {
  const id = useRef(null);
  const [person, setPerson] = useState([]);
  const navigate = useNavigate();
  const [role, setRole] = useState([]);
  const { io } = useContext(MainContext);
  const [loading, setLoading] = useState(false);
  id.current = useParams().id;

  useEffect(() => {
    setLoading(true);
    io.emit("get-person", id.current);
    io.on("set-person", ({ data }) => {
      setPerson(data);
      setRole(JSON.parse(data[0]?.role || []));
    });
    setLoading(false);
  }, [id.current]);

  const changeRole = (value) => {
    const newPerson = person[0];
    newPerson.role = JSON.stringify(value);
    setPerson([newPerson]);
    setRole(value);
    io.emit("update-person", { id: person[0]?.id, value });
  };

  return (
    <aside className="__s_person">
      <div>
        <div className="heading">
          <Button
            icon="pi pi-times"
            onClick={() => navigate("../")}
            className="no-shadow p-button-rounded"
            style={{ marginLeft: "-0.8rem" }}
            text
          />
          <p>Edit User</p>
        </div>
      </div>
      {!loading ? (
        person.length > 0 ? (
          <div className="p-card">
            <div className="p-card-body">
              <div
                className="p-card-heading flex"
                style={{ alignItems: "center" }}
              >
                <Avatar icon="pi pi-user" size="large" shape="circle" />
                <span>{person[0]?.name}</span>
              </div>
              <div className="p-card-content">
                <small>Role</small>
                <div> {formatList(person[0]?.role)}</div>
                <MultiSelect
                  id="role"
                  value={role}
                  onChange={(e) => changeRole(e.value)}
                  options={[
                    "Frontend Developer",
                    "Backend Developer",
                    "Marketer",
                    "Supervisor",
                  ]}
                  display="chip"
                />
              </div>
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

export default SinglePerson;
