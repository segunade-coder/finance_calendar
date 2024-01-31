/* eslint-disable react/prop-types */
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
const Datatable = ({ data }) => {
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
    <DataTable value={data} sortMode="multiple" width={"100%"}>
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
  );
};

export default Datatable;
