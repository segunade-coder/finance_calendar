/* eslint-disable react/prop-types */
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { useState } from "react";
import { formatList } from "../utils/functions";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";

export const rolesArray = [
  "Frontend Developer",
  "Backend Developer",
  "Marketer",
  "CEO",
  "Project Designer",
  "UI/UX Designer",
  "Supervisor",
];

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
  return (
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
        <span className="p-float-label">
          <MultiSelect
            id="role"
            value={role}
            onChange={(e) => setRole(e.value)}
            options={rolesArray}
            display="chip"
          />
          <label htmlFor="desc">Role</label>
        </span>
      </div>
    </Dialog>
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
    return (
      <div>
        <p style={{ margin: 0, textTransform: "capitalize" }}>{people.name}</p>
        <small
          className="p-card-subtitle"
          style={{ margin: 0, textTransform: "capitalize" }}
        >
          {formatList(people.role)}
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
