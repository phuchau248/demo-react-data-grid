import { useState } from "react";
import { faker } from "@faker-js/faker";
import "react-data-grid/lib/styles.css";
import { groupBy as rowGrouper } from "lodash";

import DataGrid, { SelectColumn } from "react-data-grid";

function rowKeyGetter(row) {
  return row.id;
}

const columns = [
  SelectColumn,
  {
    key: "country",
    name: "Country",
  },
  {
    key: "year",
    name: "Year",
  },
  {
    key: "sport",
    name: "Sport",
  },
  {
    key: "athlete",
    name: "Athlete",
  },
  {
    key: "gold",
    name: "Gold",
    groupFormatter({ childRows }) {
      return <>{childRows.reduce((prev, { gold }) => prev + gold, 0)}</>;
    },
  },
  {
    key: "silver",
    name: "Silver",
    groupFormatter({ childRows }) {
      return <>{childRows.reduce((prev, { silver }) => prev + silver, 0)}</>;
    },
  },
  {
    key: "bronze",
    name: "Bronze",
    groupFormatter({ childRows }) {
      return <>{childRows.reduce((prev, { silver }) => prev + silver, 0)}</>;
    },
  },
  {
    key: "total",
    name: "Total",
    formatter({ row }) {
      return <>{row.gold + row.silver + row.bronze}</>;
    },
    groupFormatter({ childRows }) {
      return (
        <>
          {childRows.reduce(
            (prev, row) => prev + row.gold + row.silver + row.bronze,
            0
          )}
        </>
      );
    },
  },
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
    year: 2015 + faker.datatype.number(3),
    country: faker.address.country(),
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
    rows[i] = createFakeRowObjectData(i);
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
      newRows[i] = createFakeRowObjectData(i + length);
    }

    setTimeout(() => resolve(newRows), 1000);
  });
}

const options = ["country", "year", "sport", "athlete"];

export default function InfiniteScrolling({ direction }) {
  const [rows, setRows] = useState(() => createRows(50));
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([
    options[0],
    options[1],
  ]);

  const [expandedGroupIds, setExpandedGroupIds] = useState(
    () =>
      new Set(["United States of America", "United States of America__2015"])
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
