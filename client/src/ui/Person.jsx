/* eslint-disable react/prop-types */
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { formatList, returnColor } from "../utils/functions";
import { Link } from "react-router-dom";
import { confirmDialog } from "primereact/confirmdialog";
import { useDeletePerson } from "../components/hooks/mutation";

const Person = ({ person, i, addIndTask }) => {
  const deletePersonMutation = useDeletePerson();
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
  const handleDelete = (id) => {
    console.log(id);
    deletePersonMutation.mutate(id);
    // io.volatile.emit("delete-person", { id }, (res) => {
    //   if (res.status) {
    //     toast.success(res.message, { id: "delete" });
    //   } else {
    //     toast.error(res.message, { id: "delete" });
    //   }
    // });
  };
  return (
    <div className="peep">
      <div className="content">
        <Avatar
          label={person.name[0].toUpperCase()}
          size="large"
          shape="circle"
          style={{
            backgroundColor: returnColor(i)[0],
            color: returnColor(i)[1],
          }}
        />
        <div className="details ">
          <Link to={`person/${person.user_id}`}>
            {person.name}
            <small
              style={{
                display: "block",
                fontSize: "0.7rem",
                fontFamily: "Poppins-Medium",
              }}
            >
              {person.email}
            </small>
          </Link>
          <small className="card-tasks" title={formatList(person.role)}>
            {formatList(person.role)}
          </small>
        </div>
      </div>
      <div className="cf">
        <i
          className="pi pi-fw pi-trash"
          style={{ color: "#EF4444" }}
          onClick={() => confirmDeletePerson(person.id)}
        ></i>
      </div>
      <div className="p-footer">
        <Button
          icon="pi pi-plus"
          text
          size="small"
          className="p-button-outlined no-shadow"
          severity="help"
          onClick={() => addIndTask(person.name)}
        />
      </div>
    </div>
  );
};

export default Person;
