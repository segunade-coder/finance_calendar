/* eslint-disable react/prop-types */
import { Card } from "primereact/card";
import { SummaryBreakdown } from "./Dialogs";
import { totalCash } from "../utils/functions";

const Summary = ({
  cardFooter,
  setShowDialog,
  showDialog,
  cashin,
  setShowDialog2,
  showDialog2,
  setShowDialog3,
  showDialog3,
  cashout,
  margin,
  totalDebt,
  totalRevenue,
  others,
  others2,
}) => {
  return (
    <>
      <Card
        title="Summary Review"
        style={{ marginTop: ".5rem" }}
        className="c-card"
        footer={cardFooter}
      >
        <p className="m-0 summary">
          <span
            className="p-text-secondary p-overlay-badge"
            style={{ cursor: "pointer" }}
            onClick={() => setShowDialog(!showDialog)}
          >
            CASH IN:
            <span>{totalCash(cashin, "cashin")?.toLocaleString()}</span>
          </span>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => setShowDialog2(!showDialog2)}
          >
            CASH OUT:
            <span>{totalCash(cashout, "cashout")?.toLocaleString()}</span>
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
          <span
            style={{ cursor: "pointer" }}
            onClick={() => setShowDialog3(!showDialog3)}
          >
            OTHERS:
            <span>{totalCash(others2, "amount")?.toLocaleString()}</span>
          </span>
        </p>
      </Card>
      <SummaryBreakdown
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        summary={cashin}
        props="cashin"
      />
      <SummaryBreakdown
        showDialog={showDialog2}
        setShowDialog={setShowDialog2}
        summary={cashout}
        props="cashout"
      />
      <SummaryBreakdown
        showDialog={showDialog3}
        setShowDialog={setShowDialog3}
        summary={others2}
        props="amount"
      />
    </>
  );
};

export default Summary;
