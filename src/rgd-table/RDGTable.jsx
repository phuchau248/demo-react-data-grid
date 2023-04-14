import React, { useCallback, useState } from "react";
import ReactDataGrid from "@inovua/reactdatagrid-enterprise";
import SelectFilter from "@inovua/reactdatagrid-community/SelectFilter";
import "@inovua/reactdatagrid-enterprise/index.css";
import Select from "react-select";
import "./style.scss";
import data from "./mock.json";

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
    name: "salesDt",
    header: "salesDt",
    locked: true,
    defaultVisible: true,
    textAlign: "center",
  },
  {
    name: "suppCd",
    header: "suppCd",
    textAlign: "center",
  },
  {
    name: "suppNm",
    header: "suppNm",
    textAlign: "center",
  },
  {
    name: "purchCondCd",
    header: "purchCondCd",
    textAlign: "center",
  },
  {
    name: "purchCondNm",
    header: "purchCondNm",
    textAlign: "center",
  },
  {
    name: "itemLclsCd",
    header: "itemLclsCd",
    textAlign: "center",
  },
  {
    name: "itemLclsNm",
    header: "itemLclsNm",
    textAlign: "center",
  },
  {
    name: "itemMclsCd",
    header: "itemMclsCd",
    textAlign: "center",
  },
  {
    name: "itemMclsNm",
    header: "itemMclsNm",
    textAlign: "center",
  },
  {
    name: "itemSclsCd",
    header: "itemSclsCd",
    textAlign: "center",
  },
  {
    name: "itemSclsNm",
    header: "itemSclsNm",
    textAlign: "center",
  },
  {
    name: "itemCd",
    header: "itemCd",
    textAlign: "center",
    rowspan: ({ value, dataSourceArray, rowIndex, column }) => {
      let rowspan = 1;
      const prevData = dataSourceArray[rowIndex - 1];
      if (
        prevData &&
        !!prevData[column.name] &&
        !!value &&
        prevData[column.name] === value
      ) {
        return rowspan;
      }
      let currentRowIndex = rowIndex + 1;
      while (
        !!dataSourceArray[currentRowIndex] &&
        !!value &&
        dataSourceArray[currentRowIndex][column.name] === value
      ) {
        rowspan++;
        currentRowIndex++;
      }
      return rowspan;
    },
  },
  {
    name: "itemNm",
    header: "itemNm",
    textAlign: "center",
  },
  {
    name: "uniEvntCd",
    header: "uniEvntCd",
    textAlign: "center",
  },
  {
    name: "uniEvntSpNm",
    header: "uniEvntSpNm",
    textAlign: "center",
  },
  {
    name: "evntTypeNm",
    header: "evntTypeNm",
    textAlign: "center",
    render: (data) => {
      return data?.value ? (
        data?.value === "2+1" ? (
          <div className="data-chip-2">{data?.value}</div>
        ) : (
          <div className="data-chip">{data?.value}</div>
        )
      ) : (
        "-"
      );
    },
    // rowspan: ({ value, dataSourceArray, rowIndex, column }) => {
    //   let rowspan = 1;
    //   const prevData = dataSourceArray[rowIndex - 1];
    //   if (prevData && prevData[column.name] === value) {
    //     return rowspan;
    //   }
    //   let currentRowIndex = rowIndex + 1;
    //   while (
    //     dataSourceArray[currentRowIndex] &&
    //     dataSourceArray[currentRowIndex][column.name] === value
    //   ) {
    //     rowspan++;
    //     currentRowIndex++;
    //   }
    //   return rowspan;
    // },
  },
  {
    name: "evntGrpNm",
    header: "evntGrpNm",
    textAlign: "center",
  },
  {
    name: "evntDurBeginDt",
    header: "evntDurBeginDt",
    textAlign: "center",
  },
  {
    name: "evntDurEndDt",
    header: "evntDurEndDt",
    textAlign: "center",
  },
  {
    name: "salesAmt",
    header: "salesAmt",
    textAlign: "center",
  },
  {
    name: "salesQty",
    header: "salesQty",
    textAlign: "center",
  },
  {
    name: "evntCst",
    header: "evntCst",
    textAlign: "center",
  },
  {
    name: "evntSprc",
    header: "evntSprc",
    textAlign: "center",
  },
  {
    name: "evntItemHdlStrCnt",
    header: "evntItemHdlStrCnt",
    textAlign: "center",
  },
  {
    name: "saleStrCnt",
    header: "saleStrCnt",
    textAlign: "center",
  },
  {
    name: "ratio",
    header: "ratio",
    textAlign: "center",
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
      console.log(skip, limit);

      return new Promise((resolve, reject) => {
        resolve({
          count: 100,
          data: data.data.content.slice(skip, limit + skip),
        });
      });

      // const a = fetch(
      //   "https://demos.reactdatagrid.io/api/v1/contacts" +
      //     "?skip=" +
      //     skip +
      //     "&limit=" +
      //     limit +
      //     "&sortInfo=" +
      //     JSON.stringify(sortInfo)
      // ).then((response) => {
      //   const totalCount = response.headers.get("X-Total-Count");
      //   return response.json().then((data) => {
      //     return { data, count: parseInt(totalCount) };
      //   });
      // });
    },
    [selected]
  );

  return (
    <div className="demo-react-data-grid">
      <div className="react-select-wrapper">
        <Select
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
        groupColumn={null}
        defaultGroupBy={["salesDt"]}
        scrollThreshold={0.9}
        limit={selected.value}
      />
    </div>
  );
};
export default RGDTable;
