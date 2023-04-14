import React, { useCallback, useState } from "react";
import ReactDataGrid from "@inovua/reactdatagrid-enterprise";
import SelectFilter from "@inovua/reactdatagrid-community/SelectFilter";
import "@inovua/reactdatagrid-enterprise/index.css";
import Select from "react-select";
import "./style.scss";

const gridStyle = { minHeight: 550, marginTop: 10 };

const filterValue = [
  { name: "firstName", operator: "startsWith", type: "string", value: "" },
  { name: "lastName", operator: "startsWith", type: "string", value: "" },
  { name: "pictureId", operator: "gte", type: "number", value: 0 },
  { name: "email", operator: "startsWith", type: "string", value: "" },
  { name: "address", operator: "startsWith", type: "string", value: "" },
];

const columns = [
  {
    name: "id",
    header: "Id",
    defaultVisible: false,
    type: "number",
    maxWidth: 40,
  },
  {
    name: "firstName",
    header: "First Name",
    locked: true,
    defaultVisible: true,
    textAlign: "center",
    defaultFlex: 1,
  },
  {
    name: "lastName",
    header: "Last Name",
    textAlign: "center",
    defaultFlex: 1,
  },
  {
    name: "pictureId",
    header: "PID",
    textAlign: "center",
    render: (data) => {
      return data?.value ? <div className="data-chip">{data?.value}</div> : "-";
    },
  },
  {
    name: "email",
    header: "Email",
    textAlign: "center",
    defaultFlex: 1,
  },

  {
    name: "address",
    header: "Address",
    textAlign: "center",
    width: 800,
    defaultFlex: 1,
    render: ({ data }) => {
      return data.address;
    },
    rowspan: ({ value = "False", dataSourceArray, rowIndex, column }) => {
      let rowspan = 1;
      const prevData = dataSourceArray[rowIndex - 1];
      if (prevData && prevData[column.name] === value) {
        return rowspan;
      }
      let currentRowIndex = rowIndex + 1;
      while (
        dataSourceArray[currentRowIndex] &&
        dataSourceArray[currentRowIndex][column.name] === value
      ) {
        rowspan++;
        currentRowIndex++;
        if (rowspan > 9) {
          break;
        }
      }
      return rowspan;
    },
  },
];

const options = [
  { value: 20, label: "20 Record" },
  { value: 50, label: "50 Record" },
  { value: 100, label: "100 Record" },
];

const groupColumn = {
  renderGroupValue: ({ value }) =>
    value === "true" ? "Yes" : value === "false" ? "No" : value,
};

const RGDTable = () => {
  const [selected, setSelected] = useState(options[0]);

  const handleChange = (value) => {
    setSelected(value);
  };

  const dataSource = useCallback(
    async ({ skip, sortInfo, limit = selected.value }) => {
      return fetch(
        "https://demos.reactdatagrid.io/api/v1/contacts" +
          "?skip=" +
          skip +
          "&limit=" +
          limit +
          "&sortInfo=" +
          JSON.stringify(sortInfo)
      ).then((response) => {
        const totalCount = response.headers.get("X-Total-Count");
        return response.json().then((data) => {
          return { data, count: parseInt(totalCount) };
        });
      });
    },
    [selected]
  );

  return (
    <div className="demo-react-data-grid">
      <div className="react-select-wrapper">
        <Select
          defaultValue={20}
          value={selected}
          onChange={handleChange}
          options={options}
          className="react-select"
        />
      </div>
      <ReactDataGrid
        idProperty="id"
        showZebraRows={false}
        defaultFilterValue={filterValue}
        columns={columns}
        dataSource={dataSource}
        reorderColumns={true}
        style={gridStyle}
        pagination
        livePagination
        groupColumn={groupColumn}
        defaultGroupBy={["pictureId"]}
        scrollThreshold={0.9}
        limit={selected.value}
      />
    </div>
  );
};
export default RGDTable;
