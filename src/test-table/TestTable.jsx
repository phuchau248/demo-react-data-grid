import React, { useState } from "react";
import ProTable from "@ant-design/pro-table";
import dataT from "../rgd-table/mock.json";
const InfiniteTable = () => {
  const [data, setData] = useState(dataT.data.content);
  const [loading, setLoading] = useState(false);

  const handleLoadMore = async () => {
    try {
      setLoading(true);
      // const response = await axios.get("https://api.example.com/data");
      const response = { data: dataT.data.content };
      console.log(response);
      setData((prevData) => [...prevData, ...response.data]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  return (
    <ProTable
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={false}
    />
  );
};

export default InfiniteTable;
