import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from "@tanstack/react-query";
import MaterialReactTable, {
  MRT_ShowHideColumnsButton,
} from "material-react-table";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CSVLink } from "react-csv";
import Select from "react-select";
import mockData from "../rgd-table/mock.json";
import "./style.scss";

const columns = [
  {
    header: "기준일",
    accessorKey: "salesDt",
    muiTableHeadCellProps: {
      align: "center",
    },
    muiTableBodyCellProps: {
      align: "center",
    },
    Cell: ({ cell }) => {
      const date = cell.getValue();
      return `${date.substring(0, 4)}.${date.substring(4, 6)}.${date.substring(
        6,
        8
      )}.`;
    },
  },
  {
    header: "거래처코드",
    accessorKey: "suppCd",
    muiTableHeadCellProps: {
      align: "center",
    },
    muiTableBodyCellProps: {
      align: "center",
    },
  },
  {
    header: "거래처명",
    accessorKey: "suppNm",
    muiTableHeadCellProps: {
      align: "center",
    },
    muiTableBodyCellProps: {
      align: "center",
    },
  },
  {
    header: "구매조건코드",
    accessorKey: "purchCondCd",
    muiTableHeadCellProps: {
      align: "center",
    },
    muiTableBodyCellProps: {
      align: "center",
    },
  },
  {
    header: "구매조건코드명",
    accessorKey: "purchCondNm",
    muiTableHeadCellProps: {
      align: "center",
    },
    muiTableBodyCellProps: {
      align: "center",
    },
  },
  {
    header: "대분류코드",
    accessorKey: "itemLclsCd",
    muiTableHeadCellProps: {
      align: "center",
    },
    muiTableBodyCellProps: {
      align: "center",
    },
  },
  {
    header: "대분류명",
    accessorKey: "itemLclsNm",
    muiTableHeadCellProps: {
      align: "center",
    },
    muiTableBodyCellProps: {
      align: "center",
    },
  },
  {
    header: "중분류코드",
    accessorKey: "itemMclsCd",
    muiTableHeadCellProps: {
      align: "center",
    },
    muiTableBodyCellProps: {
      align: "center",
    },
  },
  {
    header: "중분류코드명",
    accessorKey: "itemMclsNm",
    muiTableHeadCellProps: {
      align: "center",
    },
    muiTableBodyCellProps: {
      align: "center",
    },
  },
  {
    header: "소분류코드",
    accessorKey: "itemSclsCd",
    muiTableHeadCellProps: {
      align: "center",
    },
    muiTableBodyCellProps: {
      align: "center",
    },
  },
  {
    header: "소분류코드명",
    accessorKey: "itemSclsNm",
    muiTableHeadCellProps: {
      align: "center",
    },
    muiTableBodyCellProps: {
      align: "center",
    },
  },
  {
    header: "상품코드",
    accessorKey: "itemCd",
    muiTableHeadCellProps: {
      align: "center",
    },
    muiTableBodyCellProps: {
      align: "center",
    },
  },
  {
    header: "상품명",
    accessorKey: "itemNm",
    size: 300,
    muiTableHeadCellProps: {
      align: "center",
    },
    muiTableBodyCellProps: {
      align: "center",
    },
  },
  {
    header: "행사코드",
    accessorKey: "uniEvntCd",
    muiTableHeadCellProps: {
      align: "center",
    },
    muiTableBodyCellProps: {
      align: "center",
    },
  },
  {
    header: "행사구분명",
    accessorKey: "uniEvntSpNm",
    muiTableHeadCellProps: {
      align: "center",
    },
    muiTableBodyCellProps: {
      align: "center",
    },
  },
  {
    header: "행사유형명",
    accessorKey: "evntTypeNm",
    muiTableHeadCellProps: {
      align: "center",
    },
    muiTableBodyCellProps: {
      align: "center",
    },
    Cell: ({ cell }) => {
      const value = cell.getValue();
      return value ? (
        value === "2+1" ? (
          <div className="data-chip-2">{value}</div>
        ) : (
          <div className="data-chip">{value}</div>
        )
      ) : (
        "-"
      );
    },
  },
  {
    header: "행사그룹명",
    accessorKey: "evntGrpNm",
    size: 300,
    muiTableHeadCellProps: {
      align: "center",
    },
    muiTableBodyCellProps: {
      align: "center",
    },
  },
  {
    header: "행사기간",
    accessorKey: "evntDurEndDt",
    muiTableHeadCellProps: {
      align: "center",
    },
    muiTableBodyCellProps: {
      align: "center",
    },
    Cell: ({ row }) => {
      const begin = row.original?.evntDurBeginDt;
      const end = row.original?.evntDurEndDt;
      return `${begin.substring(0, 4)}.${begin.substring(
        4,
        6
      )}.${begin.substring(6, 8)}.~${begin.substring(0, 4)}.${begin.substring(
        4,
        6
      )}.${begin.substring(6, 8)}.`;
    },
  },
  {
    header: "매출금액",
    accessorKey: "salesAmt",
    muiTableHeadCellProps: {
      align: "center",
    },
    muiTableBodyCellProps: {
      align: "center",
    },
    Cell: ({ cell }) => {
      return Number(cell.getValue()).toLocaleString("ko-KR");
    },
    AggregatedCell: ({ cell }) => (
      <div>Total: {cell.getValue().toLocaleString("ko-KR")}</div>
    ),
  },
  {
    header: "매출수량",
    accessorKey: "salesQty",
    muiTableHeadCellProps: {
      align: "center",
    },
    muiTableBodyCellProps: {
      align: "center",
    },
    Cell: ({ cell }) => {
      return Number(cell.getValue()).toLocaleString("ko-KR");
    },
    AggregatedCell: ({ cell }) => (
      <div>Total: {cell.getValue().toLocaleString("ko-KR")}</div>
    ),
  },
  {
    header: "행사원가",
    accessorKey: "evntCst",
    muiTableHeadCellProps: {
      align: "center",
    },
    muiTableBodyCellProps: {
      align: "center",
    },
    Cell: ({ cell }) => {
      return Number(cell.getValue()).toLocaleString("ko-KR");
    },
    AggregatedCell: ({ cell }) => (
      <div>Total: {cell.getValue().toLocaleString("ko-KR")}</div>
    ),
  },
  {
    header: "취급점포수(개)",
    accessorKey: "evntItemHdlStrCnt",
    muiTableHeadCellProps: {
      align: "center",
    },
    muiTableBodyCellProps: {
      align: "center",
    },
    Cell: ({ cell }) => {
      return Number(cell.getValue()).toLocaleString("ko-KR");
    },
    AggregatedCell: ({ cell }) => (
      <div>Total: {cell.getValue().toLocaleString("ko-KR")}</div>
    ),
  },
  {
    header: "전체점포수(개)",
    accessorKey: "saleStrCnt",
    muiTableHeadCellProps: {
      align: "center",
    },
    muiTableBodyCellProps: {
      align: "center",
    },
    Cell: ({ cell }) => {
      return Number(cell.getValue()).toLocaleString("ko-KR");
    },
    AggregatedCell: ({ cell }) => (
      <div>Total: {cell.getValue().toLocaleString("ko-KR")}</div>
    ),
  },
  {
    header: "취급율(%)",
    accessorKey: "ratio",
    muiTableHeadCellProps: {
      align: "center",
    },
    muiTableBodyCellProps: {
      align: "center",
    },
  },
];

const options = [
  { value: 20, label: "20 Record" },
  { value: 50, label: "50 Record" },
  { value: 100, label: "100 Record" },
];

const Example = () => {
  const tableContainerRef = useRef(null); //we can get access to the underlying TableContainer element and react to its scroll events
  const rowVirtualizerInstanceRef = useRef(null); //we can get access to the underlying Virtualizer instance and call its scrollToIndex method

  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState();
  const [sorting, setSorting] = useState([]);
  const [pageSize, setPageSize] = useState(options[0]);
  const handleChangePageSize = (value) => {
    setPageSize(value);
  };

  const { data, fetchNextPage, isError, isFetching, isLoading } =
    useInfiniteQuery({
      queryKey: ["table-data", columnFilters, globalFilter, sorting],
      queryFn: async ({ pageParam = 0 }) => {
        // const url = new URL(
        //   "/api/data",
        //   process.env.NODE_ENV === "production"
        //     ? "https://www.material-react-table.com"
        //     : "https://www.material-react-table.com"
        // );
        // url.searchParams.set("start", `${pageParam * fetchSize}`);
        // url.searchParams.set("size", `${fetchSize}`);
        // url.searchParams.set("filters", JSON.stringify(columnFilters ?? []));
        // url.searchParams.set("globalFilter", globalFilter ?? "");
        // url.searchParams.set("sorting", JSON.stringify(sorting ?? []));

        // const response = await fetch(url.href);
        // const json = await response.json();
        // return json;

        return new Promise((resolve, reject) => {
          resolve({
            meta: { totalRowCount: 100 },
            data: [...mockData.data.content].slice(
              pageParam * pageSize.value,
              pageSize.value * (pageParam + 1)
            ),
          });
        });
      },
      getNextPageParam: (_lastGroup, groups) => groups.length,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    });

  const flatData = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data]
  );

  const totalDBRowCount = data?.pages?.[0]?.meta?.totalRowCount ?? 0;
  const totalFetched = flatData.length;

  //called on scroll and possibly on mount to fetch more data as the user scrolls and reaches bottom of table
  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        console.log(scrollHeight - scrollTop - clientHeight);
        if (
          scrollHeight - scrollTop - clientHeight < 10 &&
          !isFetching
          // &&  totalFetched < totalDBRowCount
        ) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetching, totalFetched, totalDBRowCount]
  );

  //scroll to top of table when sorting or filters change
  useEffect(() => {
    //scroll to the top of the table when the sorting changes
    try {
      rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
    } catch (error) {
      console.error(error);
    }
  }, [sorting, columnFilters, globalFilter]);

  //a check on mount to see if the table is already scrolled to the bottom and immediately needs to fetch more data
  useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef.current);
  }, [fetchMoreOnBottomReached]);

  const onChangeGroup = () => {
    console.log("change");
  };

  return (
    <MaterialReactTable
      enableGrouping
      columns={columns}
      data={flatData}
      enablePagination={false}
      enableRowVirtualization
      //   manualFiltering
      //   manualSorting
      muiTableContainerProps={{
        ref: tableContainerRef,
        sx: { maxHeight: "600px" },
        onScroll: (event) => fetchMoreOnBottomReached(event.target),
      }}
      renderToolbarInternalActions={({ table }) => (
        <>
          <MRT_ShowHideColumnsButton table={table} />
          <Select
            className="react-select page-size-select"
            value={pageSize}
            options={options}
            onChange={handleChangePageSize}
          />
          <div className="export-button react-btn">
            <CSVLink
              data={mockData.data.content}
              headers={columns.map((item) => {
                return { ...item, key: item.accessorKey, label: item.header };
              })}
              filename="data.csv"
              target="_blank"
            >
              <img
                alt="img"
                src="https://img.icons8.com/color/256/microsoft-excel-2019--v1.png"
              />
              <label>다운로드</label>
            </CSVLink>
          </div>
        </>
      )}
      initialState={{
        grouping: ["salesDt"],
        density: "compact",
        expanded: true,
      }}
      //   enableColumnActions={false}
      //   enableColumnDragging={false}
      enableColumnOrdering={false}
      enablePinning
      //   enableTopToolbar={false}
      // enableBottomToolbar={false}
      enableGlobalFilter={false}
      //   muiToolbarAlertBannerProps={
      //     isError
      //       ? {
      //           color: "error",
      //           children: "Error loading data",
      //         }
      //       : undefined
      //   }
      //   onColumnFiltersChange={setColumnFilters}
      //   onGlobalFilterChange={setGlobalFilter}
      onSortingChange={setSorting}
      renderBottomToolbarCustomActions={() => (
        <div>
          Fetched {totalFetched} of {totalDBRowCount} total rows.
        </div>
      )}
      state={{
        columnFilters,
        globalFilter,
        isLoading,
        showAlertBanner: isError,
        showProgressBars: isFetching,
        sorting,
      }}
      rowVirtualizerInstanceRef={rowVirtualizerInstanceRef} //get access to the virtualizer instance
      rowVirtualizerProps={{ overscan: 4 }}
    />
  );
};

const queryClient = new QueryClient();

const Table = () => (
  <QueryClientProvider client={queryClient}>
    <Example />
  </QueryClientProvider>
);

export default Table;
