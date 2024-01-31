import { Button } from "primereact/button";
import { useContext, useEffect, useState } from "react";
import "../cashin/cashin.css";
import { MainContext } from "../../utils/Helper";

import Summary from "../../ui/Summary";
import Datatable from "../../ui/Datatable";
import { CreateCashRegister } from "../../ui/Dialogs";
import { totalCash } from "../../utils/functions";

const Cashout = () => {
  const { io } = useContext(MainContext);
  const [visible, setVisible] = useState(false);
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [history, setHistory] = useState([]);
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

  const categoryOptions = [
    "Cost of Goods Sold (COGS)",
    "Depreciation and Amortization",
    "Salaries",
    "Litigation or Legal Settlements",
    "Restructuring Cost",
    "Income Taxes",
    "Interest Expenses",
    "Research and Development (R&D)",
    "Selling, General, and Administrative Expenses (SG&A)",
  ];
  document.title = "Cash Out";
  useEffect(() => {
    io.emit("get-cashout");
    io.emit("get-summary");
    io.on(
      "set-summary",
      ({ cashin, cashout, totalDebt, totalRevenue, other, others2 }) => {
        setCashin(cashin);
        setCashout(cashout);
        setMargin(totalCash(cashin, "cashin") - totalCash(cashout, "cashout"));
        setTotalDebt(totalDebt);
        setTotalRevenue(totalRevenue);
        setOthers(other);
        setOthers2(others2);
      }
    );
    io.on("set-cashout", ({ data }) => {
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
      />
      <Button
        label="Add"
        icon="pi pi-check-circle"
        onClick={(e) => handleAddCashout(e)}
        autoFocus
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

  const handleAddCashout = (e) => {
    e.preventDefault();
    if (amount !== "" && desc !== "" && category !== "") {
      io.emit("add-cashout", { amount, desc, category });

      setDesc("");
      setAmount("");
      setCategory("");
      setVisible(false);
      io.emit("get-summary");
    }
  };

  return (
    <div className="__cashout">
      <Button
        icon={visible ? "pi pi-minus" : "pi pi-plus"}
        className="p"
        onClick={() => setVisible(!visible)}
        severity="secondary"
        size="small"
        text
      />
      <div className="cashin-container">
        <Summary
          cardFooter={cardFooter}
          setShowDialog={setShowDialog}
          showDialog={showDialog}
          cashin={cashin}
          setShowDialog2={setShowDialog2}
          showDialog2={showDialog2}
          setShowDialog3={setShowDialog3}
          showDialog3={showDialog3}
          cashout={cashout}
          margin={margin}
          totalDebt={totalDebt}
          totalRevenue={totalRevenue}
          others={others}
          others2={others2}
        />
        <div className="c-p-card">
          <Datatable data={history} />
        </div>
      </div>

      <CreateCashRegister
        header={"Cash Out"}
        footerContent={footerContent}
        amount={amount}
        category={category}
        desc={desc}
        setAmount={setAmount}
        setCategory={setCategory}
        categoryOptions={categoryOptions}
        setDesc={setDesc}
        setVisible={setVisible}
        visible={visible}
      />
    </div>
  );
};

export default Cashout;
