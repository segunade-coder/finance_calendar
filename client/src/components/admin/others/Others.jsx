import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../../../utils/Helper";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";

const Others = () => {
  const { io } = useContext(MainContext);
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [addCategory, setAddCategory] = useState("");
  const [others, setOthers] = useState([]);
  const footerContent = (
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
        onClick={() => addOthers()}
        autoFocus
        size="small"
      />
    </div>
  );
  const footerContent2 = (
    <div>
      <Button
        label="Cancel"
        icon="pi pi-times"
        onClick={() => setVisible2(false)}
        className="p-button-text"
        size="small"
      />
      <Button
        label="Add"
        icon="pi pi-check-circle"
        onClick={() => handleAddCategory()}
        autoFocus
        size="small"
      />
    </div>
  );
  useEffect(() => {
    io.emit("get-others");
    io.emit("get-others-category");
    io.on("set-others", ({ data }) => {
      setOthers(data);
      io.on("set-others-category", ({ data }) => {
        if (
          data?.others_category !== undefined &&
          data?.others_category !== "" &&
          data?.others_category !== null
        ) {
          setCategoryOptions(JSON.parse(data?.others_category));
        }
      });
    });
  }, [io]);
  const deleteRecord = (data) => {
    return (
      <i
        className="pi pi-fw pi-trash"
        style={{ color: "red" }}
        onClick={() => confirm1(data.id)}
      ></i>
    );
  };
  const deleteOthers = (id) => {
    io.emit("delete-others", { id });
  };
  const addOthers = () => {
    if (
      desc !== "" &&
      amount !== "" &&
      desc !== null &&
      amount !== null &&
      category !== "" &&
      category !== null
    ) {
      io.emit("add-others", { desc, amount, category });

      setVisible(false);
      setDesc("");
      setAmount("");
      setCategory("");
    }
  };
  const confirm1 = (id) => {
    confirmDialog({
      message: "Do you want to delete?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => deleteOthers(id),
      reject: () => {},
    });
  };
  const handleAddCategory = () => {
    if (addCategory !== "" && addCategory !== null) {
      io.emit("add-others-category", {
        category: [...categoryOptions, addCategory],
      });
      setVisible2(false);
      setAddCategory("");
    }
  };
  return (
    <div className="__others">
      <ConfirmDialog />
      <Button
        icon={visible ? "pi pi-minus" : "pi pi-plus"}
        className="p"
        onClick={() => setVisible(!visible)}
        severity="secondary"
        size="small"
        text
      />
      <div className="c-p-card" style={{ marginTop: "2rem" }}>
        <DataTable value={others} sortMode="multiple" width={"100%"}>
          <Column field="description" header="Description" sortable></Column>
          <Column field="amount" header="Amount" sortable></Column>
          <Column field="category" header="Category" sortable></Column>
          <Column field="id" header="Action" body={deleteRecord}></Column>
        </DataTable>
      </div>
      <Dialog
        header="Others"
        visible={visible}
        onHide={() => setVisible(false)}
        style={{ width: "30vw" }}
        footer={footerContent}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}
        >
          <span className="p-float-label">
            <InputNumber
              id="amount"
              value={amount}
              style={{ width: "100%" }}
              onValueChange={(e) => setAmount(e.value)}
            />
            <label htmlFor="amount">Amount</label>
          </span>
          <span className="p-float-label">
            <div
              className="flex"
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <span className="p-float-label" style={{ width: "100%" }}>
                <Dropdown
                  id="categ"
                  options={categoryOptions}
                  value={category}
                  onChange={(e) => setCategory(e.value)}
                />
                <label htmlFor="amount">Category</label>
              </span>
              <Button
                icon="pi pi-plus"
                text
                className="p-button-rounded no-shadow"
                severity="secondary"
                onClick={() => setVisible2(true)}
              ></Button>
            </div>
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
      <Dialog
        header="Add Category"
        visible={visible2}
        onHide={() => setVisible2(false)}
        style={{ width: "30vw" }}
        footer={footerContent2}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <div className="cashin-card">
          <span className="p-float-label" style={{ marginTop: "0.5rem" }}>
            <InputText
              id="addCateg"
              value={addCategory}
              onChange={(e) => setAddCategory(e.target.value)}
            />
            <label htmlFor="amount">Category Name</label>
          </span>
        </div>
      </Dialog>
    </div>
  );
};

export default Others;
