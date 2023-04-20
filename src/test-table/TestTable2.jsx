import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from "@tanstack/react-query";
import MaterialReactTable, {
  MRT_ShowHideColumnsButton,
  MRT_ToggleGlobalFilterButton,
} from "material-react-table";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import mockData from "../rgd-table/mock.json";
import "./style.scss";
import { CSVLink } from "react-csv";
import Select, { components } from "react-select";

const columns = [
  {
    header: "판매 코드",
    accessorKey: "salesDt",
  },
  {
    header: "공급 코드",
    accessorKey: "suppCd",
  },
  {
    header: "공급 이름",
    accessorKey: "suppNm",
  },
  {
    header: "구매 조건 코드",
    accessorKey: "purchCondCd",
  },
  {
    header: "구매조건명",
    accessorKey: "purchCondNm",
  },
  {
    header: "아이템 코드",
    accessorKey: "itemCd",
  },
  {
    header: "상품명",
    accessorKey: "itemNm",
    size: 300,
  },
  {
    header: "유니 이벤트 코드",
    accessorKey: "uniEvntCd",
  },
  {
    header: "유니 이벤트 이름",
    accessorKey: "uniEvntSpNm",
  },
  {
    header: "이벤트 유형 이름",
    accessorKey: "evntTypeNm",
    Cell: ({ cell }) => {
      const value = cell.getValue();
      console.log(value);
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
    header: "이벤트 그룹 이름",
    accessorKey: "evntGrpNm",
    size: 300,
  },
  {
    header: "행사 시작일",
    accessorKey: "evntDurBeginDt",
  },
  {
    header: "이벤트 종료 날짜",
    accessorKey: "evntDurEndDt",
  },
  {
    header: "판매량",
    accessorKey: "salesAmt",
  },
  {
    header: "판매수량",
    accessorKey: "salesQty",
  },
  {
    header: "비율",
    accessorKey: "ratio",
  },
];

const fetchSize = 25;
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
        ref: tableContainerRef, //get access to the table container element
        sx: { maxHeight: "600px" }, //give the table a max height
        onScroll: (
          event //add an event listener to the table container element
        ) => fetchMoreOnBottomReached(event.target),
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
              <img src="https://img.icons8.com/color/256/microsoft-excel-2019--v1.png" />
              <label>다운로드</label>
            </CSVLink>
          </div>
        </>
      )}
      initialState={{ density: "compact" }}
      enableColumnActions={false}
      //   enableColumnDragging={false}
      enableColumnOrdering={false}
      //   enableTopToolbar={false}
      enableBottomToolbar={false}
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
      //   renderBottomToolbarCustomActions={() => (
      //     <Typography>
      //       Fetched {totalFetched} of {totalDBRowCount} total rows.
      //     </Typography>
      //   )}
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

const ExampleWithReactQueryProvider = () => (
  <QueryClientProvider client={queryClient}>
    <Example />
  </QueryClientProvider>
);

export default ExampleWithReactQueryProvider;
