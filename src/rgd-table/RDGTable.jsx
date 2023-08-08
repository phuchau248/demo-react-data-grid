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

  let bg = "transparent";
  if (isFocused) bg = "#eee";
  if (isActive) bg = "#B2D4FF";

  const style = {
    alignItems: "center",
    backgroundColor: bg,
    color: "inherit",
    display: "flex ",
  };

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
    visible: false,
    type: "number",
    maxWidth: 40,
  },
  {
    header: "기준일",
    name: "salesDt",
    textAlign: "center",
    visible: true,
    locked: false,
    render: (data) => {
      const date = data.value;
      return `${date.substring(0, 4)}.${date.substring(4, 6)}.${date.substring(
        6,
        8
      )}.`;
    },
  },
  {
    header: "거래처코드",
    name: "suppCd",
    textAlign: "center",
    visible: true,
    locked: false,
  },
  {
    header: "거래처명",
    name: "suppNm",
    textAlign: "center",
    visible: true,
    locked: false,
    minWidth: 200,
  },
  {
    header: "구매조건코드",
    name: "purchCondCd",
    textAlign: "center",
    visible: true,
    locked: false,
  },
  {
    header: "구매조건코드명",
    name: "purchCondNm",
    textAlign: "center",
    visible: true,
    locked: false,
    minWidth: 200,
  },
  {
    header: "대분류코드",
    name: "itemLclsCd",
    textAlign: "center",
    visible: true,
    locked: false,
  },
  {
    header: "대분류명",
    name: "itemLclsNm",
    textAlign: "center",
    visible: true,
    locked: false,
  },
  {
    header: "중분류코드",
    name: "itemMclsCd",
    textAlign: "center",
    visible: true,
    locked: false,
  },
  {
    header: "중분류코드명",
    name: "itemMclsNm",
    textAlign: "center",
    visible: true,
    locked: false,
  },
  {
    header: "소분류코드",
    name: "itemSclsCd",
    textAlign: "center",
    visible: true,
    locked: false,
  },
  {
    header: "소분류코드명",
    name: "itemSclsNm",
    textAlign: "center",
    visible: true,
    locked: false,
  },
  {
    header: "상품코드",
    name: "itemCd",
    textAlign: "center",
    visible: true,
    locked: false,
  },
  {
    header: "상품명",
    name: "itemNm",
    minWidth: 300,
    textAlign: "center",
    visible: true,
    locked: false,
  },
  {
    header: "행사코드",
    name: "uniEvntCd",
    textAlign: "center",
    visible: true,
    locked: false,
  },
  {
    header: "행사구분명",
    name: "uniEvntSpNm",
    textAlign: "center",
    visible: true,
    locked: false,
  },
  {
    header: "행사유형명",
    name: "evntTypeNm",
    textAlign: "center",
    visible: true,
    locked: false,
    render: (data) => {
      return data?.value ? (
        data?.value === "2+1" ? (
          <div className="data-chip-2">{data?.value}</div>
        ) : (
          <div className="data-chip">{data?.value}</div>
        )
      ) : (
        ""
      );
    },
  },
  {
    header: "행사그룹명",
    name: "evntGrpNm",
    minWidth: 300,
    textAlign: "center",
    visible: true,
    locked: false,
  },
  {
    header: "행사기간",
    name: "evntDurEndDt",
    textAlign: "center",
    visible: true,
    locked: false,
    minWidth: 300,
    render: ({ data }) => {
      console.log(data);
      const begin = data?.evntDurBeginDt;
      const end = data?.evntDurEndDt;
      return (
        begin &&
        end &&
        `${begin.substring(0, 4)}.${begin.substring(4, 6)}.${begin.substring(
          6,
          8
        )}.~${end.substring(0, 4)}.${end.substring(4, 6)}.${end.substring(
          6,
          8
        )}.`
      );
    },
  },
  {
    header: "매출금액",
    name: "salesAmt",
    textAlign: "center",
    visible: true,
    locked: false,
    groupSummaryReducer: {
      initialValue: 0,
      reducer: (a, b) => a + b,
    },
    render: ({ value, data }) => {
      return data.__group ? (
        <React.Fragment>
          <b>Total: </b>
          {Number(value).toLocaleString("ko-KR")}{" "}
        </React.Fragment>
      ) : (
        Number(value).toLocaleString("ko-KR")
      );
    },
  },

  {
    header: "매출수량",
    name: "salesQty",
    textAlign: "center",
    visible: true,
    locked: false,
    groupSummaryReducer: {
      initialValue: 0,
      reducer: (a, b) => a + b,
    },
    render: ({ value, data }) => {
      return data.__group ? (
        <React.Fragment>
          <b>Total: </b>
          {Number(value).toLocaleString("ko-KR")}{" "}
        </React.Fragment>
      ) : (
        Number(value).toLocaleString("ko-KR")
      );
    },
  },
  {
    header: "행사원가",
    name: "evntCst",
    textAlign: "center",
    visible: true,
    locked: false,
    groupSummaryReducer: {
      initialValue: 0,
      reducer: (a, b) => a + b,
    },
    render: ({ value, data }) => {
      return data.__group ? (
        <React.Fragment>
          <b>Total: </b>
          {Number(value).toLocaleString("ko-KR")}{" "}
        </React.Fragment>
      ) : (
        Number(value).toLocaleString("ko-KR")
      );
    },
  },
  {
    header: "취급점포수(개)",
    name: "evntItemHdlStrCnt",
    textAlign: "center",
    visible: true,
    locked: false,
    groupSummaryReducer: {
      initialValue: 0,
      reducer: (a, b) => a + b,
    },
    render: ({ value, data }) => {
      return data.__group ? (
        <React.Fragment>
          <b>Total: </b>
          {Number(value).toLocaleString("ko-KR")}{" "}
        </React.Fragment>
      ) : (
        Number(value).toLocaleString("ko-KR")
      );
    },
  },
  {
    header: "전체점포수(개)",
    name: "saleStrCnt",
    textAlign: "center",
    visible: true,
    locked: false,
    groupSummaryReducer: {
      initialValue: 0,
      reducer: (a, b) => a + b,
    },
    render: ({ value, data }) => {
      return data.__group ? (
        <React.Fragment>
          <b>Total: </b>
          {Number(value).toLocaleString("ko-KR")}{" "}
        </React.Fragment>
      ) : (
        Number(value).toLocaleString("ko-KR")
      );
    },
  },
  {
    header: "취급율(%)",
    name: "ratio",
    textAlign: "center",
    visible: true,
    locked: false,
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

const listColumns = columns.slice(1, columns.length).map((items, index) => {
  return {
    ...items,
    value: items.name,
    label: items.header,
    index,
    key: items.name,
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
    const newColumns = listColumns.map((item) => {
      const check = value.find((obj) => obj.key === item.key);
      return {
        ...item,
        visible: check ? true : false,
      };
    });
    setActiveColumns(newColumns.sort((a, b) => a.index - b.index));
  };

  const handleChangeLockedColumns = (value) => {
    const newColumns = listColumns.map((item) => {
      const check = value.find((obj) => obj.key === item.key);
      return {
        ...item,
        locked: check ? true : false,
      };
    });
    setActiveColumns(newColumns.sort((a, b) => a.index - b.index));
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
          value={activeColumns.filter((item) => item.visible === true)}
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          controlShouldRenderValue={false}
          options={listColumns}
          onChange={handleChangeActiveColumns}
          components={{
            Option: InputOption,
          }}
        />
        <Select
          isMulti
          className="react-select active-columns-select"
          classNamePrefix="active-columns-select"
          placeholder="항목보기"
          value={activeColumns.filter((item) => item.locked === true)}
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          controlShouldRenderValue={false}
          options={listColumns.filter((item) => item.visible === true)}
          onChange={handleChangeLockedColumns}
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
