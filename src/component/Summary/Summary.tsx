import React, { useEffect, useState } from "react";
import { Card, Space, Statistic, Table, TablePaginationConfig, notification } from "antd";
import { columns } from "./columns";
import { ResponeSummary } from "@/services/type";
import { getSummary } from "@/services/report";
import { ParamReportProps } from "../Report";
import { AxiosError } from "axios";
import dayjs from "dayjs";

const Summary: React.FC<ParamReportProps> = ({ params }) => {
  const [data, setData] = useState<ResponeSummary | undefined>();
  const [loading, setLoading] = useState(false);
  const [paging, setPaging] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    pageSizeOptions: [10, 20, 50],
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    total: data?.sales_summary?.length,
    showSizeChanger: true,
  });

  const [errorMessage, contextHolder] = notification.useNotification();

  const getData = async () => {
    setLoading(true);
    try {
      if (!params?.from_date || !params?.to_date) {
        throw { message: "Wrong date format" };
      }
      const res = await getSummary(params);
      if (res?.data) {
        setData(res?.data);
      }
    } catch (error) {
      const err = error as AxiosError;
      errorMessage.error({
        message: err?.message,
      });
    }
    setPaging({
      current: 1,
      pageSize: 10,
      pageSizeOptions: [10, 20, 50],
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
      total: data?.sales_summary?.length,
      showSizeChanger: true,
    });
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [params]);

  const sortData = (array: any) => {
    if (array) {
      return array.sort((objA: any, objB: any) => {
        return dayjs(objB.processing_date, "DD-MM-YYYY").unix() - dayjs(objA.processing_date, "DD-MM-YYYY").unix();
      });
    }
  };

  return (
    <Card>
      <Space style={{ marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
        <div style={{ fontSize: "20px", fontWeight: 600 }}>Sales Summary</div>
        <Space style={{ display: "flex", fontSize: "20px" }} size={50}>
          <Statistic
            title={<div style={{ color: "black", fontSize: "16px", fontWeight: "600" }}>Total Gross</div>}
            value={data?.total_gross ? data?.total_gross.toLocaleString("en-US", { style: "decimal" }) : "-"}
            valueStyle={{ fontSize: "16px" }}
          />
          <Statistic
            title={<div style={{ color: "black", fontSize: "16px", fontWeight: "600" }}>Total Void</div>}
            value={data?.total_void ? data?.total_void.toLocaleString("en-US", { style: "decimal" }) : "-"}
            valueStyle={{ fontSize: "16px" }}
          />
          <Statistic
            title={<div style={{ color: "black", fontSize: "16px", fontWeight: "600" }}>Total Cancelled</div>}
            value={data?.total_cancelled ? data?.total_cancelled.toLocaleString("en-US", { style: "decimal" }) : "-"}
            valueStyle={{ fontSize: "16px" }}
          />
          <Statistic
            title={<div style={{ color: "black", fontSize: "16px", fontWeight: "600" }}>Total Net</div>}
            value={data?.total_net ? data?.total_net.toLocaleString("en-US", { style: "decimal" }) : "-"}
            valueStyle={{ fontSize: "16px" }}
          />
        </Space>
      </Space>
      {contextHolder}
      <Table
        rowKey={"id"}
        columns={columns}
        dataSource={sortData(data?.sales_summary)}
        bordered
        pagination={paging}
        onChange={(pagination) => {
          setPaging({
            ...pagination,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          });
        }}
        loading={loading}
      />
    </Card>
  );
};

export default Summary;
