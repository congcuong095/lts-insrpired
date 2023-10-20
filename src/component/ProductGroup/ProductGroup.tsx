import React, { useEffect, useState } from "react";
import { Card, Space, Statistic, Table, TablePaginationConfig, notification } from "antd";
import { columns } from "./columns";
import { ParamReportProps } from "../Report";
import { getProductGroup } from "@/services/report";
import { ResponeProductGroup } from "@/services/type";
import { AxiosError } from "axios";
import dayjs from "dayjs";

const ProductGroup: React.FC<ParamReportProps> = ({ params }) => {
  const [data, setData] = useState<ResponeProductGroup | undefined>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, contextHolder] = notification.useNotification();
  const [paging, setPaging] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    pageSizeOptions: [10, 20, 50],
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    total: data?.sales_by_productgroup?.length,
    showSizeChanger: true,
  });

  const getData = async () => {
    setLoading(true);
    try {
      if (!params?.from_date || !params?.to_date) {
        throw { message: "Wrong date format" };
      }
      const res = await getProductGroup(params);
      if (res?.data) {
        setData(res?.data);
      }
    } catch (error) {
      const err = error as AxiosError;
      errorMessage.error({
        message: err?.message,
      });
    }
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
        <div style={{ fontSize: "20px", fontWeight: 600 }}>Sales By Product Group</div>
        <Space style={{ display: "flex", fontSize: "20px" }} size={50}>
          <Statistic
            title="Total Gross"
            value={data?.total_gross ? data?.total_gross.toLocaleString("en-US", { style: "decimal" }) : "-"}
            valueStyle={{ fontSize: "16px" }}
          />
          <Statistic
            title="Total Void"
            value={data?.total_gross ? data?.total_gross.toLocaleString("en-US", { style: "decimal" }) : "-"}
            valueStyle={{ fontSize: "16px" }}
          />
          <Statistic
            title="Total Cancelled"
            value={data?.total_gross ? data?.total_gross.toLocaleString("en-US", { style: "decimal" }) : "-"}
            valueStyle={{ fontSize: "16px" }}
          />
          <Statistic
            title="Total Net"
            value={data?.total_gross ? data?.total_gross.toLocaleString("en-US", { style: "decimal" }) : "-"}
            valueStyle={{ fontSize: "16px" }}
          />
        </Space>
      </Space>
      {contextHolder}
      <Table
        rowKey={"processing_date"}
        columns={columns}
        dataSource={sortData(data?.sales_by_productgroup)}
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

export default ProductGroup;
