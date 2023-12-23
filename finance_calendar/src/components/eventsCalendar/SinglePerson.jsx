/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MainContext } from "../Helper";
const SinglePerson = () => {
  let { id } = useParams();
  const [person, setPerson] = useState([[]]);
  const navigate = useNavigate();
  const [role, setRole] = useState([]);
  const { io } = useContext(MainContext);
  useEffect(() => {
    try {
      if (window?.history?.state?.usr?.person !== undefined) {
        setPerson(window.history.state?.usr?.person);
        setRole(JSON.parse(window.history.state?.usr?.person[0]?.role));
      } else {
        navigate("../");
      }
    } catch (error) {
      navigate("../");
    }
  }, [id]);

  const changeRole = (value) => {
    const newPerson = person[0];
    newPerson.role = JSON.stringify(value);
    setPerson([newPerson]);
    setRole(value);
    io.emit("update-person", { id: person[0]?.id, value });
  };
  const formatter = new Intl.ListFormat("en-GB", {
    style: "narrow",
    type: "conjunction",
  });
  const formatList = (role) => {
    if (role) {
      const newRole = formatter.format(JSON.parse(role));
      return newRole;
    }
  };
  return (
    <div className="__s_person">
      <div>
        <Button
          icon="pi pi-arrow-left"
          onClick={() => navigate("../")}
          className="no-shadow p-button-rounded"
          style={{ marginLeft: "-0.8rem", marginBottom: "0.5rem" }}
          text
        ></Button>
      </div>
      {person.map((peep, i) => (
        <div key={i} className="p-card">
          <div className="p-card-body">
            <div
              className="p-card-heading flex"
              style={{ alignItems: "center" }}
            >
              <Avatar icon="pi pi-user" size="large" shape="circle" />
              <span>{peep?.name}</span>
            </div>
            <div className="p-card-content">
              <small>Role</small>
              <div> {formatList(peep?.role)}</div>
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
      ))}
    </div>
  );
};

export default SinglePerson;
