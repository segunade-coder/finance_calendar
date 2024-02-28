/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatList } from "../../../utils/functions";

import { useQueryClient } from "@tanstack/react-query";
import { useRole } from "../../hooks/query";
import { useUpdatePerson } from "../../hooks/mutation";
const SinglePerson = () => {
  const queryClient = useQueryClient();
  const id = useRef(null);
  const { data, isLoading, isError } = useRole();
  const [person, setPerson] = useState([]);
  const navigate = useNavigate();
  const [role, setRole] = useState([]);
  const updatePersonMutation = useUpdatePerson();
  const [loading, setLoading] = useState(false);
  id.current = useParams().id;

  useEffect(() => {
    setLoading(true);
    const tempPeople = [
      queryClient
        .getQueryData(["people"])
        ?.find((person) => person.user_id === id.current),
    ];
    setPerson(() => tempPeople);
    tempPeople !== undefined && setRole(JSON.parse(tempPeople[0]?.role || []));
    setLoading(false);
  }, [id.current]);

  const changeRole = (value) => {
    const newPerson = person[0];
    newPerson.role = JSON.stringify(value);
    setPerson([newPerson]);
    setRole(value);
    updatePersonMutation.mutate({ id: person[0]?.id, value });
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
              </div>
            </div>
          </div>
        ) : (
          <div className="fallback-loading">Nothing here</div>
        )
      ) : (
        <div className="fallback-loading">Loading...</div>
      )}
    </aside>
  );
};

export default SinglePerson;
