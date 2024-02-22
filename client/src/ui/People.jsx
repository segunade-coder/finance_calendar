/* eslint-disable react/prop-types */
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { AssignIndividualTask, CreatePerson } from "./Dialogs";
import { InputText } from "primereact/inputtext";
import { usePeople } from "../components/hooks/query";
import Person from "./Person";
import { useAddPerson } from "../components/hooks/mutation";

const People = () => {
  const { data, isLoading: isLoadingPeople, isError } = usePeople();
  const [people, setPeople] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [visible, setVisible] = useState(false);
  const [assignTo, setAssignTo] = useState("");
  const [visible3, setVisible3] = useState(false);
  const [filter, setFilter] = useState("");
  const addPersonMutation = useAddPerson();
  useEffect(() => {
    setPeople(data);
  }, [data]);
  const addIndTask = (name) => {
    let peep = people.find(
      (peep) => peep.name.toLowerCase().trim() === name.toLowerCase().trim()
    );
    setAssignTo([peep.name]);
    setVisible3(true);
  };

  const addPeople = () => {
    if (name !== "" && role !== "" && email !== "") {
      addPersonMutation.mutate({ name, role, email });
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
        loading={addPersonMutation.isPending}
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
        // loading={addPeopleStatus}
      />
    </div>
  );

  const setFilterFnc = (value) => {
    setFilter(value);
    if (value === "" || value === null) {
      setPeople(people);
    } else {
      setPeople(
        data.filter(({ name }) =>
          name.toLowerCase().match(value.toLowerCase().trim())
        )
      );
    }
  };
  if (isError) return <div>Error</div>;
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
        {isLoadingPeople && !people ? (
          <div>Loading</div>
        ) : people?.length > 0 ? (
          people.map((person, index) => (
            <Person
              person={person}
              i={index}
              key={index + person.name}
              addIndTask={addIndTask}
            />
          ))
        ) : (
          <div style={{ color: "#7a7a7a", margin: "0.5rem auto 0" }}>
            No User
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
