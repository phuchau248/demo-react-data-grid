import { useState } from "react";
import { faker } from "@faker-js/faker";
import "react-data-grid/lib/styles.css";
import { groupBy as rowGrouper } from "lodash";
import mockData from "../rgd-table/mock.json";
import DataGrid, { SelectColumn } from "react-data-grid";
import "./style.scss";

function rowKeyGetter(row) {
  return row.id;
}

const columns = [
  {
    name: "판매 코드",
    key: "salesDt",
    defaultVisible: true,
    textAlign: "center",
  },
  {
    name: "공급 코드",
    key: "suppCd",
    textAlign: "center",
    defaultVisible: false,
  },
  {
    name: "공급 이름",
    key: "suppNm",
    textAlign: "center",
    defaultVisible: true,
  },
  {
    name: "구매 조건 코드",
    key: "purchCondCd",
    textAlign: "center",
    defaultVisible: false,
  },
  {
    name: "구매조건명",
    key: "purchCondNm",
    textAlign: "center",
    defaultVisible: true,
  },
  {
    name: "아이템 코드",
    key: "itemCd",
    textAlign: "center",
    defaultVisible: true,
  },
  {
    name: "상품명",
    key: "itemNm",
    textAlign: "center",
    defaultVisible: true,
    minWidth: 300,
  },
  {
    name: "유니 이벤트 코드",
    key: "uniEvntCd",
    textAlign: "center",
    defaultVisible: false,
  },
  {
    name: "유니 이벤트 이름",
    key: "uniEvntSpNm",
    textAlign: "center",
    defaultVisible: true,
  },
  {
    name: "이벤트 유형 이름",
    key: "evntTypeNm",
    textAlign: "center",
    defaultVisible: true,
    formatter(data) {
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
  },

  // {
  //   key: "bronze",
  //   name: "Bronze",
  //   groupFormatter({ childRows }) {
  //     return <>{childRows.reduce((prev, { silver }) => prev + silver, 0)}</>;
  //   },
  // },
  // {
  //   key: "total",
  //   name: "Total",
  //   formatter({ row }) {
  //     return <>{row.gold + row.silver + row.bronze}</>;
  //   },
  //   groupFormatter({ childRows }) {
  //     return (
  //       <>
  //         {childRows.reduce(
  //           (prev, row) => prev + row.gold + row.silver + row.bronze,
  //           0
  //         )}
  //       </>
  //     );
  //   },
  // },
];

const sports = [
  "Swimming",
  "Gymnastics",
  "Speed Skating",
  "Cross Country Skiing",
  "Short-Track Speed Skating",
  "Diving",
  "Cycling",
  "Biathlon",
  "Alpine Skiing",
  "Ski Jumping",
  "Nordic Combined",
  "Athletics",
  "Table Tennis",
  "Tennis",
  "Synchronized Swimming",
  "Shooting",
  "Rowing",
  "Fencing",
  "Equestrian",
  "Canoeing",
  "Bobsleigh",
  "Badminton",
  "Archery",
  "Wrestling",
  "Weightlifting",
  "Waterpolo",
  "Wrestling",
  "Weightlifting",
];

function createFakeRowObjectData(index) {
  return {
    id: index,
    country: index % 2 ? "Vietnam" : "Japan",
    sport: sports[faker.datatype.number(sports.length - 1)],
    athlete: faker.name.fullName(),
    gold: faker.datatype.number(5),
    silver: faker.datatype.number(5),
    bronze: faker.datatype.number(5),
  };
}

function createRows(numberOfRows) {
  const rows = [];

  for (let i = 0; i < numberOfRows; i++) {
    rows[i] = mockData.data.content[i];
  }

  return rows;
}

function isAtBottom({ currentTarget }) {
  return (
    currentTarget.scrollTop + 10 >=
    currentTarget.scrollHeight - currentTarget.clientHeight
  );
}

function loadMoreRows(newRowsCount, length) {
  return new Promise((resolve) => {
    const newRows = [];

    for (let i = 0; i < newRowsCount; i++) {
      newRows[i] = mockData.data.content[i + length];
    }

    setTimeout(() => resolve(newRows), 1000);
  });
}

const options = ["country", "sport", "athlete"];

export default function TestTable({ direction }) {
  const [rows, setRows] = useState(() => createRows(10));
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([options[0]]);

  const [expandedGroupIds, setExpandedGroupIds] = useState(
    () => new Set(["Iraq", "Iraq_2018"])
  );

  async function handleScroll(event) {
    if (isLoading || !isAtBottom(event)) return;
    setIsLoading(true);
    const newRows = await loadMoreRows(50, rows.length);
    setRows([...rows, ...newRows]);
    setIsLoading(false);
  }

  return (
    <>
      <DataGrid
        className="data-grid"
        columns={columns}
        rows={rows}
        rowKeyGetter={rowKeyGetter}
        onRowsChange={setRows}
        rowHeight={30}
        onScroll={handleScroll}
        direction={direction}
        groupBy={selectedOptions}
        rowGrouper={rowGrouper}
        expandedGroupIds={expandedGroupIds}
        onExpandedGroupIdsChange={setExpandedGroupIds}
        defaultColumnOptions={{ resizable: true }}
      />
    </>
  );
}
