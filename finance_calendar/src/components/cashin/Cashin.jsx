import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { useContext, useEffect, useState } from "react";
import { Card } from "primereact/card";
import "./cashin.css";
import { MainContext } from "../Helper";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
const Cashin = () => {
  const { io } = useContext(MainContext);
  const [visible, setVisible] = useState(false);
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [cashin, setCashin] = useState([]);
  const [cashout, setCashout] = useState([]);
  const [margin, setMargin] = useState(0);
  const [totalDebt, setTotalDebt] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [others, setOthers] = useState(0);
  const [others2, setOthers2] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [showDialog2, setShowDialog2] = useState(false);
  const [showDialog3, setShowDialog3] = useState(false);

  const [history, setHistory] = useState([]);

  useEffect(() => {
    io.emit("get-cashin");
    io.emit("get-summary");
    io.on(
      "set-summary",
      ({ cashin, cashout, totalDebt, totalRevenue, other, others2 }) => {
        setCashin(cashin);
        setCashout(cashout);
        setMargin(
          cashin.map((cash) => cash.cashin).reduce((x, y) => x + y, 0) -
            cashout.map((cash) => cash.cashout).reduce((x, y) => x + y, 0)
        );
        setTotalDebt(totalDebt);
        setTotalRevenue(totalRevenue);
        setOthers(other);
        setOthers2(
          others2
        );
      }
    );

    io.on("set-cashin", ({ data }) => {
      setHistory(data);
    });
  }, [io]);
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
        onClick={(e) => handleAddCashin(e)}
        autoFocus
        size="small"
      />
    </div>
  );
  const cardFooter = (
    <div>
      <Button
        label="Refresh"
        icon="pi pi-refresh"
        onClick={() => io.emit("get-summary")}
        className="p-button-outlined p-button-secondary"
        size="small"
      />
    </div>
  );
  const handleAddCashin = (e) => {
    e.preventDefault();
    if (amount !== "" && desc !== "" && category !== "") {
      io.emit("add-cashin", { amount, desc, category });

      setDesc("");
      setAmount("");
      setCategory("");
      setVisible(false);
    }
  };
  const dateFormat = (date) => {
    const formatDate = (rawDate) => {
      let date = new Date(rawDate);
      return [
        date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
        date.getUTCMonth() + 1 < 10
          ? `0${date.getUTCMonth() + 1}`
          : date.getUTCMonth() + 1,
        date.getUTCFullYear(),
      ].join("/");
    };
    return formatDate(date.created_at);
  };

  return (
    <div className="__cashin">
      <h4>Cash In</h4>
      <Button
        icon={visible ? "pi pi-minus" : "pi pi-plus"}
        className="p"
        onClick={() => setVisible(!visible)}
        severity="secondary"
        size="small"
        text
      />
      <div className="cashin-container">
        <Card
          title="Summary"
          style={{ marginTop: ".5rem" }}
          className="c-card"
          footer={cardFooter}
        >
          <p className="m-0 summary">
            <span>
              CASH IN:
              <span
                className="p-text-secondary p-overlay-badge"
                style={{ cursor: "pointer" }}
                onClick={() => setShowDialog(!showDialog)}
              >
                {cashin
                  .map((cash) => cash.cashin)
                  .reduce((x, y) => x + y, 0)
                  ?.toLocaleString() || 0}
                  </span>
                <Dialog
                  header="Breakdown"
                  visible={showDialog}
                  style={{ width: "50vw" }}
                  onHide={() => setShowDialog(false)}
                >
                  {cashin.map((cash) => (
                    <span
                      key={cash.cashin}
                      data-pr-tooltip="see more"
                      className="card flex"
                      style={{ flexWrap: "nowrap", gap: "0.7rem" }}
                    >
                      <span>{cash.category}</span>
                      <span>{cash.cashin.toLocaleString()}</span>
                    </span>
                  ))}
                </Dialog>
            </span>
            <span>
              CASH OUT:{" "}
              <span  style={{ cursor: "pointer" }}
                onClick={() => setShowDialog2(!showDialog2)}>
                {cashout
                  .map((cash) => cash.cashout)
                  .reduce((x, y) => x + y, 0)
                  ?.toLocaleString() || 0}
              </span>
              <Dialog
                  header="Breakdown"
                  visible={showDialog2}
                  style={{ width: "50vw" }}
                  onHide={() => setShowDialog2(false)}
                >
                  {cashout.map((cash) => (
                    <span
                      key={cash.cashout}
                      data-pr-tooltip="see more"
                      className="card flex"
                      style={{ flexWrap: "nowrap", gap: "0.7rem" }}
                    >
                      <span>{cash.category}</span>
                      <span>{cash.cashout.toLocaleString()}</span>
                    </span>
                  ))}
                </Dialog>
            </span>
            <span>
              MARGIN: <span>{margin?.toLocaleString() || 0}</span>
            </span>
            <span>
              TOTAL DEBT: <span>{totalDebt?.toLocaleString() || 0}</span>
            </span>
            <span>
              TOTAL REVENUE: <span>{totalRevenue?.toLocaleString() || 0}</span>
            </span>
            <span>
              DEBT / REVENUE: <span>{others?.toLocaleString() || 0}</span>
            </span>
            <span>
              OTHERS: <span  style={{ cursor: "pointer" }}
                onClick={() => setShowDialog3(!showDialog3)}>{others2.map((cash) => cash.amount).reduce((x, y) => x + y, 0)?.toLocaleString() || 0}</span>
              <Dialog
                  header="Breakdown"
                  visible={showDialog3}
                  style={{ width: "50vw" }}
                  onHide={() => setShowDialog3(false)}
                >
                  {others2.map((cash) => (
                    <span
                      key={cash.amount}
                      data-pr-tooltip="see more"
                      className="card flex"
                      style={{ flexWrap: "nowrap", gap: "0.7rem" }}
                    >
                      <span>{cash.category}</span>
                      <span>{cash.amount.toLocaleString()}</span>
                    </span>
                  ))}
                </Dialog>
            </span>
          </p>
        </Card>
        <div className="c-p-card">
          <DataTable value={history} sortMode="multiple" width={"100%"}>
            <Column field="description" header="Description" sortable></Column>
            <Column field="amount" header="Amount" sortable></Column>
            <Column field="category" header="Category" sortable></Column>
            <Column
              field="created_at"
              header="Date"
              sortable
              body={dateFormat}
            ></Column>
          </DataTable>
        </div>
      </div>

      <Dialog
        header="Cash In"
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
              id="categ"
              options={["Revenue", "Debt"]}
              value={category}
              onChange={(e) => setCategory(e.value)}
            />
            <label htmlFor="categ">Category</label>
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
    </div>
  );
};

export default Cashin;
