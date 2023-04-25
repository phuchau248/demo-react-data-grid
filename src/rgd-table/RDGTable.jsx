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
    header: "기준일",
    name: "salesDt",
    textAlign: "center",
    defaultVisible: true,
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
    defaultVisible: true,
  },
  {
    header: "거래처명",
    name: "suppNm",
    textAlign: "center",
    defaultVisible: true,
    minWidth: 200,
  },
  {
    header: "구매조건코드",
    name: "purchCondCd",
    textAlign: "center",
    defaultVisible: true,
  },
  {
    header: "구매조건코드명",
    name: "purchCondNm",
    textAlign: "center",
    defaultVisible: true,
    minWidth: 200,
  },
  {
    header: "대분류코드",
    name: "itemLclsCd",
    textAlign: "center",
    defaultVisible: true,
  },
  {
    header: "대분류명",
    name: "itemLclsNm",
    textAlign: "center",
    defaultVisible: true,
  },
  {
    header: "중분류코드",
    name: "itemMclsCd",
    textAlign: "center",
    defaultVisible: true,
  },
  {
    header: "중분류코드명",
    name: "itemMclsNm",
    textAlign: "center",
    defaultVisible: true,
  },
  {
    header: "소분류코드",
    name: "itemSclsCd",
    textAlign: "center",
    defaultVisible: true,
  },
  {
    header: "소분류코드명",
    name: "itemSclsNm",
    textAlign: "center",
    defaultVisible: true,
  },
  {
    header: "상품코드",
    name: "itemCd",
    textAlign: "center",
    defaultVisible: true,
  },
  {
    header: "상품명",
    name: "itemNm",
    minWidth: 300,
    textAlign: "center",
    defaultVisible: true,
  },
  {
    header: "행사코드",
    name: "uniEvntCd",
    textAlign: "center",
    defaultVisible: true,
  },
  {
    header: "행사구분명",
    name: "uniEvntSpNm",
    textAlign: "center",
    defaultVisible: true,
  },
  {
    header: "행사유형명",
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
        ""
      );
    },
  },
  {
    header: "행사그룹명",
    name: "evntGrpNm",
    minWidth: 300,
    textAlign: "center",
    defaultVisible: true,
  },
  {
    header: "행사기간",
    name: "evntDurEndDt",
    textAlign: "center",
    defaultVisible: true,
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
    defaultVisible: true,
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
    defaultVisible: true,
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
    defaultVisible: true,
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
    defaultVisible: true,
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
    defaultVisible: true,
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
    defaultVisible: true,
  },
];

const options = [
  { value: 20, label: "20 Record" },
  { value: 50, label: "50 Record" },
  { value: 100, label: "100 Record" },
];

const groupColumn = {
  renderGroupValue: ({ value, data }) => {
    if (data?.fieldPath[data?.fieldPath.length - 1] === "salesDt") {
      return `${value.substring(0, 4)}.${value.substring(
        4,
        6
      )}.${value.substring(6, 8)}.`;
    } else {
      return value;
    }
  },
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
  const [activeColumns, setActiveColumns] = useState(
    listColumns.filter((item) => item.defaultVisible === true)
  );

  const handleChangeActiveColumns = (value) => {
    setActiveColumns(value.sort((a, b) => a.index - b.index));
    console.log(value);
  };

  const dataSource = useCallback(async ({ skip, sortInfo, limit }) => {
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
  }, []);

  return (
    <div className="demo-react-data-grid">
      <div className="react-select-wrapper">
        <div className="export-button react-select">
          <CSVLink
            data={data.data.content}
            headers={activeColumns}
            filename="data.csv"
            target="_blank"
          >
            <img src="https://img.icons8.com/color/256/microsoft-excel-2019--v1.png" />
            <label>다운로드</label>
          </CSVLink>
        </div>

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
        defaultGroupBy={["salesDt"]}
        groupColumn={groupColumn}
        columns={activeColumns}
        dataSource={dataSource}
        reorderColumns={true}
        style={gridStyle}
        pagination
      />
    </div>
  );
};
export default RGDTable;
