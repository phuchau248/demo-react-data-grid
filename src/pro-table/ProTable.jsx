import Table from "@ant-design/pro-table";
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
      // rowspan: ({ value, dataSourceArray, rowIndex, column }) => {
      //   let rowspan = 1;
      //   const prevData = dataSourceArray[rowIndex - 1];
      //   if (
      //     prevData &&
      //     !!prevData[column.name] &&
      //     !!value &&
      //     prevData[column.name] === value
      //   ) {
      //     return rowspan;
      //   }
      //   let currentRowIndex = rowIndex + 1;
      //   while (
      //     !!dataSourceArray[currentRowIndex] &&
      //     !!value &&
      //     dataSourceArray[currentRowIndex][column.name] === value
      //   ) {
      //     rowspan++;
      //     currentRowIndex++;
      //   }
  
      //   return rowspan;
      // },
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
const ProTable = () => {
  return (
    <>
      <Table columns={columns} dataSource={dataSource} />
    </>
  );
};
export default ProTable;
