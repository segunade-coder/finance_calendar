/* eslint-disable react/prop-types */
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { useContext, useEffect, useState } from "react";
import { formatList, returnColor } from "../utils/functions";
import { Link } from "react-router-dom";
import { confirmDialog } from "primereact/confirmdialog";
import { MainContext } from "../utils/Helper";
import { AssignIndividualTask, CreatePerson } from "./Dialogs";
import { toast } from "sonner";
import { InputText } from "primereact/inputtext";

const People = ({ people, setPeople, isLoadingPeople }) => {
  let { io } = useContext(MainContext);
  const [filterArr, setFilterArr] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [visible, setVisible] = useState(false);
  const [addPeopleStatus, setAddPeopleStatus] = useState(false);
  const [assignTo, setAssignTo] = useState("");
  const [visible3, setVisible3] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setFilter("");
    setFilterArr(people);
  }, [people]);
  const addIndTask = (name) => {
    let peep = people.find(
      (peep) => peep.name.toLowerCase().trim() === name.toLowerCase().trim()
    );
    setAssignTo([peep.name]);
    setVisible3(true);
  };

  const handleDelete = (id) => {
    // console.log(people);
    setPeople(people.filter((peep) => peep.id !== id));
    io.volatile.emit("delete-person", { id }, (res) => {
      if (res.status) {
        toast.success(res.message, { id: "delete" });
      } else {
        toast.error(res.message, { id: "delete" });
      }
    });
  };

  const confirmDeletePerson = (id) => {
    confirmDialog({
      message: "Do you want to delete this person?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => handleDelete(id),
      reject: () => {},
    });
  };

  const addPeople = () => {
    if (name !== "" && role !== "" && email !== "") {
      setAddPeopleStatus(true);
      toast.loading("Creating User", { id: "create" });
      io.volatile.emit("add-person", { name, role, email }, (res) =>
        res.status ? toast.success(res.message) : toast.error(res.message)
      );
      setAddPeopleStatus(false);
      setVisible(false);
      setName("");
      setRole("");
      setEmail("");
    }
  };

  const addPeopleFooter = (
    <div>
      <Button
        label="Cancel"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        className="p-button-text"
        size="small"
      />
      <Button
        label="Add"
        icon="pi pi-check-circle"
        onClick={() => addPeople(false)}
        autoFocus
        size="small"
        loading={addPeopleStatus}
      />
    </div>
  );

  const assignTaskIndividuallyFooter = (
    <div>
      <Button
        label="Cancel"
        icon="pi pi-times"
        onClick={() => setVisible3(false)}
        className="p-button-text"
        size="small"
      />
      <Button
        label="Add"
        autoFocus
        icon="pi pi-check-circle"
        // onClick={() => addTasks()}
        size="small"
        loading={addPeopleStatus}
      />
    </div>
  );

  const setFilterFnc = (value) => {
    setFilter(value);
    if (value === "" || value === null) {
      setFilterArr(people);
    } else {
      setFilterArr(
        people.filter(({ name }) =>
          name.toLowerCase().match(value.toLowerCase().trim())
        )
      );
    }
  };
  return (
    <div className="people">
      <div className="people-action">
        <Button
          label=""
          icon={visible ? "pi pi-minus" : "pi pi-plus"}
          // text
          text
          className="no-shadow p-button-rounded"
          size="small"
          onClick={() => setVisible(!visible)}
          disabled={isLoadingPeople}
          // style={{ marginBottom: "1rem" }}
        />
        <InputText
          placeholder="Search People..."
          value={filter}
          onChange={(e) => setFilterFnc(e.target.value)}
          type="search"
          disabled={isLoadingPeople}
        />
      </div>

      <div className="people-card">
        {isLoadingPeople ? (
          <div>loading..</div>
        ) : filterArr.length > 0 ? (
          filterArr.map((peep, i) => (
            <div key={peep.email} className="peep">
              <div className="content">
                <Avatar
                  label={peep.name[0].toUpperCase()}
                  size="large"
                  shape="circle"
                  style={{
                    backgroundColor: returnColor(i)[0],
                    color: returnColor(i)[1],
                  }}
                />
                <div className="details ">
                  <Link to={`person/${peep.user_id}`}>
                    {peep.name}
                    <small
                      style={{
                        display: "block",
                        fontSize: "0.7rem",
                        fontFamily: "Poppins-Medium",
                      }}
                    >
                      {peep.email}
                    </small>
                  </Link>
                  <small className="card-tasks" title={formatList(peep.role)}>
                    {formatList(peep.role)}
                  </small>
                </div>
              </div>
              <div className="cf">
                <i
                  className="pi pi-fw pi-trash"
                  style={{ color: "#EF4444" }}
                  onClick={() => confirmDeletePerson(peep.id)}
                ></i>
              </div>
              <div className="p-footer">
                <Button
                  icon="pi pi-plus"
                  text
                  size="small"
                  className="p-button-outlined no-shadow"
                  severity="help"
                  onClick={() => addIndTask(peep.name)}
                />
              </div>
            </div>
          ))
        ) : (
          <div style={{ color: "#7a7a7a", margin: "0.5rem auto 0" }}>
            Nothing here
          </div>
        )}
      </div>

      <CreatePerson
        showModal={visible}
        setShowModal={setVisible}
        footer={addPeopleFooter}
        name={name}
        role={role}
        email={email}
        setName={setName}
        setRole={setRole}
        setEmail={setEmail}
      />
      <AssignIndividualTask
        showModal={visible3}
        setShowModal={setVisible3}
        assignTo={assignTo}
        footer={assignTaskIndividuallyFooter}
      />
    </div>
  );
};

export default People;
