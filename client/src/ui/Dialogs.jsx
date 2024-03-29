/* eslint-disable react/prop-types */
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { useRole } from "../components/hooks/query";
import { useAddRole } from "../components/hooks/mutation";

export const AssignIndividualTask = ({
  showModal,
  setShowModal,
  footer,
  assignTo,
}) => {
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState(null);
  const [priority, setPriority] = useState(1);

  return (
    <Dialog
      header="Assign Task"
      visible={showModal}
      onHide={() => setShowModal(false)}
      style={{ width: "30vw" }}
      footer={footer}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
    >
      <div className="event-card">
        <span className="p-float-label">
          <InputText
            id="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <label htmlFor="desc">Task</label>
        </span>
        <span className="p-float-label">
          <InputText value={assignTo[0]} readOnly />
          <label htmlFor="desc">Assign To</label>
        </span>
        <span className="p-float-label">
          <Calendar
            id="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.value)}
            showIcon
            selectionMode="range"
            readOnlyInput
          />
          <label htmlFor="deadline">Select Date Range</label>
        </span>
        <Dropdown
          value={priority}
          onChange={(e) => setPriority(e.value)}
          options={[
            { label: "Very Important", value: 5 },
            { label: "Very High", value: 4 },
            { label: "High", value: 3 },
            { label: "Moderate", value: 2 },
            { label: "Low", value: 1 },
          ]}
          optionLabel="label"
          optionValue="value"
        />
      </div>
    </Dialog>
  );
};

export const CreatePerson = ({
  showModal,
  setShowModal,
  footer,
  name,
  role,
  email,
  setName,
  setRole,
  setEmail,
}) => {
  const { data, isLoading, isError } = useRole();
  const [showAddRole, setShowAddRole] = useState(false);
  const [addRole, setAddRole] = useState("");
  const addRoleMutation = useAddRole(role);
  const addRoleFnc = () => {
    if (addRole && addRole !== "") {
      addRoleMutation.mutate(addRole);
      setAddRole("");
    }
  };
  const modalFooterContent = (
    <div>
      <Button
        label="Cancel"
        icon="pi pi-times"
        onClick={() => showAddRole(false)}
        className="p-button-text"
        size="small"
      />
      <Button
        label="Add"
        icon="pi pi-check-circle"
        onClick={() => addRoleFnc()}
        autoFocus
        size="small"
        loading={addRoleMutation.isPending}
      />
    </div>
  );
  return (
    <>
      <AddOptopions
        title={"Add Role"}
        showModal={showAddRole}
        setShowModal={setShowAddRole}
        addOption={addRole}
        footerContent={modalFooterContent}
        setAddOption={setAddRole}
      />
      <Dialog
        header="Add Person"
        visible={showModal}
        onHide={() => setShowModal(false)}
        style={{ width: "30vw" }}
        footer={footer}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <div className="event-card">
          <span className="p-float-label">
            <InputText
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="desc">Name</label>
          </span>
          <span className="p-float-label">
            <InputText
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              keyfilter="email"
            />
            <label htmlFor="desc">Email Address</label>
          </span>
          <div
            className="flex"
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {isError ? (
              <div>Failed to fetch</div>
            ) : (
              <>
                <span className="p-float-label" style={{ width: "100%" }}>
                  <MultiSelect
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.value)}
                    options={
                      isLoading
                        ? isError
                          ? []
                          : []
                        : data
                        ? JSON.parse(data)
                        : []
                    }
                    display="chip"
                    disabled={isLoading}
                  />
                  <label htmlFor="desc">
                    {isLoading ? "Loading..." : "Role"}
                  </label>
                </span>

                <Button
                  icon="pi pi-plus"
                  text
                  className="p-button-rounded no-shadow"
                  severity="secondary"
                  onClick={() => setShowAddRole(true)}
                  loading={isLoading}
                ></Button>
              </>
            )}
          </div>
        </div>
      </Dialog>
    </>
  );
};

export const CreateTask = ({
  showModal,
  setShowModal,
  footer,
  task,
  deadline,
  priority,
  assignTo,
  setTask,
  setDeadline,
  setPriority,
  setAssignTo,
  people,
}) => {
  const peopleTemplate = (people) => {
    const formatter = new Intl.ListFormat("en-GB", {
      style: "narrow",
      type: "conjunction",
    });
    return (
      <div>
        <p style={{ margin: 0, textTransform: "capitalize" }}>{people.name}</p>
        <small
          className="p-card-subtitle"
          style={{ margin: 0, textTransform: "capitalize" }}
        >
          {formatter.format(JSON.parse(people.role))}
        </small>
      </div>
    );
  };
  return (
    <Dialog
      header="Assign Task"
      visible={showModal}
      onHide={() => setShowModal(false)}
      style={{ width: "30vw" }}
      footer={footer}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
    >
      <div className="event-card">
        <span className="p-float-label">
          <InputText
            id="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <label htmlFor="desc">Task</label>
        </span>
        <span className="p-float-label">
          <MultiSelect
            id="role"
            value={assignTo}
            onChange={(e) => setAssignTo(e.value)}
            options={people}
            optionLabel="name"
            optionValue="name"
            itemTemplate={peopleTemplate}
            display="chip"
          />
          <label htmlFor="desc">Assign To</label>
        </span>
        <span className="p-float-label">
          <Calendar
            id="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.value)}
            showIcon
            selectionMode="range"
            readOnlyInput
          />
          <label htmlFor="deadline">Select Date Range</label>
        </span>
        <span className="p-float-label">
          <Dropdown
            value={priority}
            onChange={(e) => setPriority(e.value)}
            options={[
              { label: "Very Important", value: 5 },
              { label: "Very High", value: 4 },
              { label: "High", value: 3 },
              { label: "Moderate", value: 2 },
              { label: "Low", value: 1 },
            ]}
            optionLabel="label"
            optionValue="value"
          />
          <label htmlFor="deadline">Priority</label>
        </span>
      </div>
    </Dialog>
  );
};

export const CreateCashRegister = ({
  header,
  visible,
  setVisible,
  footerContent,
  amount,
  category,
  desc,
  setAmount,
  setCategory,
  setDesc,
  categoryOptions,
}) => {
  return (
    <Dialog
      header={header}
      visible={visible}
      onHide={() => setVisible(false)}
      style={{ width: "30vw" }}
      footer={footerContent}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
    >
      <div className="cashin-card">
        <span className="p-float-label">
          <InputNumber
            id="amount"
            value={amount}
            onValueChange={(e) => setAmount(e.value)}
          />
          <label htmlFor="amount">Amount</label>
        </span>
        <span className="p-float-label">
          <Dropdown
            id="categories"
            options={categoryOptions}
            value={category}
            onChange={(e) => setCategory(e.value)}
          />
          <label htmlFor="categories">Category</label>
        </span>
        <span className="p-float-label">
          <InputTextarea
            id="desc"
            autoResize
            rows={5}
            cols={10}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <label htmlFor="desc">Description</label>
        </span>
      </div>
    </Dialog>
  );
};

export const SummaryBreakdown = ({
  showDialog,
  setShowDialog,
  summary,
  props,
}) => {
  return (
    <Dialog
      header="Breakdown"
      visible={showDialog}
      style={{ width: "50vw" }}
      onHide={() => setShowDialog(false)}
    >
      {summary.map((details) => (
        <span
          key={details[props]}
          data-pr-tooltip="see more"
          className="card flex"
          style={{ flexWrap: "nowrap", gap: "0.7rem" }}
        >
          <span>{details.category}</span>
          <span>{details[props].toLocaleString()}</span>
        </span>
      ))}
    </Dialog>
  );
};
export const AddOptopions = ({
  showModal,
  setShowModal,
  footerContent,
  addOption,
  setAddOption,
  title,
}) => {
  return (
    <Dialog
      header={title ? title : "Add"}
      visible={showModal}
      onHide={() => setShowModal(false)}
      style={{ width: "30vw" }}
      footer={footerContent}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
    >
      <div className="cashin-card">
        <span className="p-float-label" style={{ marginTop: "0.5rem" }}>
          <InputText
            id="addCateg"
            value={addOption}
            onChange={(e) => setAddOption(e.target.value)}
          />
          <label htmlFor="amount">{title}</label>
        </span>
      </div>
    </Dialog>
  );
};
