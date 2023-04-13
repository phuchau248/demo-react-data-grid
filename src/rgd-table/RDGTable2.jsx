import React from "react";
import ReactDataGrid from "@inovua/reactdatagrid-enterprise";
import "@inovua/reactdatagrid-enterprise/index.css";

import { people } from "./data";

const gridStyle = { minHeight: 550 };

const columns = [
  {
    name: "id",
    defaultWidth: 60,
    header: "Id",
    type: "number",
    // colspan: ({ data, column, columns }) => {
    //   // make every other row cell expand for 2 columns if the next column is the age column
    //   if (
    //     data.id % 2 &&
    //     columns[column.computedVisibleIndex] &&
    //     columns[column.computedVisibleIndex + 1].name === "age"
    //   ) {
    //     return 2;
    //   }

    //   return 1;
    // },
  },
  { name: "age", header: "Age", defaultFlex: 1, type: "number" },
  { name: "name", defaultFlex: 1 },
  {
    name: "country",
    header: "Country",
    defaultFlex: 1,
    rowspan: ({ value, dataSourceArray, rowIndex, column }) => {
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

const RDGTable2 = () => {
  return (
    <div style={{ marginTop: 50 }}>
      <ReactDataGrid
        showZebraRows={false}
        style={gridStyle}
        columns={columns}
        dataSource={people}
      />
    </div>
  );
};

export default RDGTable2;
