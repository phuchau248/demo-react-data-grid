import React, { useCallback, useState } from "react";
import ReactDataGrid from "@inovua/reactdatagrid-enterprise";
import SelectFilter from "@inovua/reactdatagrid-community/SelectFilter";
import "@inovua/reactdatagrid-enterprise/index.css";
import Select, { components } from "react-select";
import "./style.scss";
import data from "./mock.json";
import { CSVLink } from "react-csv";

const InputOption = ({
  getStyles,
  Icon,
  isDisabled,
  isFocused,
  isSelected,
  children,
  innerProps,
  ...rest
}) => {
  const [isActive, setIsActive] = useState(false);
  const onMouseDown = () => setIsActive(true);
  const onMouseUp = () => setIsActive(false);
  const onMouseLeave = () => setIsActive(false);

  // styles
  let bg = "transparent";
  if (isFocused) bg = "#eee";
  if (isActive) bg = "#B2D4FF";

  const style = {
    alignItems: "center",
    backgroundColor: bg,
    color: "inherit",
    display: "flex ",
  };

  // prop assignment
  const props = {
    ...innerProps,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    style,
  };

  return (
    <components.Option
      {...rest}
      isDisabled={isDisabled}
      isFocused={isFocused}
      isSelected={isSelected}
      getStyles={getStyles}
      innerProps={props}
    >
      <input type="checkbox" checked={isSelected} />
      {children}
    </components.Option>
  );
};
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
    header: "판매 코드",
    name: "salesDt",
    defaultVisible: true,
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
    header: "공급 코드",
    name: "suppCd",
    textAlign: "center",
    defaultVisible: false,
  },
  {
    header: "공급 이름",
    name: "suppNm",
    textAlign: "center",
    defaultVisible: true,
  },
  {
    header: "구매 조건 코드",
    name: "purchCondCd",
    textAlign: "center",
    defaultVisible: false,
  },
  {
    header: "구매조건명",
    name: "purchCondNm",
    textAlign: "center",
    defaultVisible: true,
  },
  // {
  //   header: "itemLclsCd",
  //   name: "itemLclsCd",
  //   textAlign: "center",
  //   defaultVisible: false,
  // },
  // {
  //   header: "itemLclsNm",
  //   name: "itemLclsNm",
  //   textAlign: "center",
  //   defaultVisible: false,
  // },
  // {
  //   header: "itemMclsCd",
  //   name: "itemMclsCd",
  //   textAlign: "center",
  //   defaultVisible: false,
  // },
  // {
  //   header: "itemMclsNm",
  //   name: "itemMclsNm",
  //   textAlign: "center",
  //   defaultVisible: false,
  // },
  // {
  //   header: "itemSclsCd",
  //   name: "itemSclsCd",
  //   textAlign: "center",
  //   defaultVisible: false,
  // },
  // {
  //   header: "itemSclsNm",
  //   name: "itemSclsNm",
  //   textAlign: "center",
  //   defaultVisible: false,
  // },
  {
    header: "아이템 코드",
    name: "itemCd",
    textAlign: "center",
    defaultVisible: true,
  },
  {
    header: "상품명",
    name: "itemNm",
    textAlign: "center",
    defaultVisible: true,
    minWidth: 300,
  },
  {
    header: "유니 이벤트 코드",
    name: "uniEvntCd",
    textAlign: "center",
    defaultVisible: false,
  },
  {
    header: "유니 이벤트 이름",
    name: "uniEvntSpNm",
    textAlign: "center",
    defaultVisible: true,
  },
  {
    header: "이벤트 유형 이름",
    name: "evntTypeNm",
    textAlign: "center",
    defaultVisible: true,
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
  },
  {
    header: "이벤트 그룹 이름",
    name: "evntGrpNm",
    textAlign: "center",
    defaultVisible: false,
  },
  {
    header: "행사 시작일",
    name: "evntDurBeginDt",
    textAlign: "center",
    defaultVisible: true,
  },
  {
    header: "이벤트 종료 날짜",
    name: "evntDurEndDt",
    textAlign: "center",
    defaultVisible: true,
  },
  {
    header: "판매량",
    name: "salesAmt",
    textAlign: "center",
    defaultVisible: true,
  },
  {
    header: "판매수량",
    name: "salesQty",
    textAlign: "center",
    defaultVisible: true,
  },
  // {
  //   header: "evntCst",
  //   name: "evntCst",
  //   textAlign: "center",
  //   defaultVisible: false,
  // },
  // {
  //   header: "evntSprc",
  //   name: "evntSprc",
  //   textAlign: "center",
  //   defaultVisible: false,
  // },
  // {
  //   header: "evntItemHdlStrCnt",
  //   name: "evntItemHdlStrCnt",
  //   textAlign: "center",
  //   defaultVisible: false,
  // },
  // {
  //   header: "saleStrCnt",
  //   name: "saleStrCnt",
  //   textAlign: "center",
  //   defaultVisible: false,
  // },
  {
    header: "비율",
    name: "ratio",
    textAlign: "center",
    defaultVisible: true,
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

const listColumns = columns.slice(1, columns.length).map((item, index) => {
  return {
    ...item,
    value: item.name,
    label: item.header,
    index,
    key: item.name,
  };
});

const RGDTable = () => {
  const [pageSize, setPageSize] = useState(options[0]);

  const [activeColumns, setActiveColumns] = useState(
    listColumns.filter((item) => item.defaultVisible === true)
  );

  const handleChangePageSize = (value) => {
    setPageSize(value);
  };
  const handleChangeActiveColumns = (value) => {
    setActiveColumns(value.sort((a, b) => a.index - b.index));
    console.log(value);
  };

  const dataSource = useCallback(
    async ({ skip, sortInfo, limit = pageSize.value }) => {
      console.log(skip, limit);

      return new Promise((resolve, reject) => {
        resolve({
          count: 100,
          data: [...data.data.content].slice(skip, limit + skip),
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
    [pageSize]
  );

  return (
    <div className="demo-react-data-grid">
      <div className="react-select-wrapper">
        <div className="export-button react-select">
          <CSVLink
            data={data.data.content.slice(0, pageSize.value)}
            headers={activeColumns}
            filename="data.csv"
            target="_blank"
          >
            <img src="https://img.icons8.com/color/256/microsoft-excel-2019--v1.png" />
            <label>다운로드</label>
          </CSVLink>
        </div>
        <Select
          className="react-select page-size-select"
          value={pageSize}
          options={options}
          onChange={handleChangePageSize}
        />
        <Select
          isMulti
          className="react-select active-columns-select"
          classNamePrefix="active-columns-select"
          placeholder="항목보기"
          value={activeColumns}
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          controlShouldRenderValue={false}
          options={listColumns}
          onChange={handleChangeActiveColumns}
          components={{
            Option: InputOption,
          }}
        />
      </div>
      <ReactDataGrid
        idProperty="id"
        className="data-grid-table"
        showZebraRows={false}
        // defaultFilterValue={filterValue}
        columns={activeColumns}
        dataSource={dataSource}
        reorderColumns={true}
        style={gridStyle}
        pagination
        livePagination
        scrollThreshold={0.9}
        limit={pageSize.value}
      />
    </div>
  );
};
export default RGDTable;
