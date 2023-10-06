"use client";
import React, { useState } from "react";
import { Segmented, Space, Switch, Table, Typography } from "antd";
import type { TablePaginationConfig, TableProps } from "antd";
import Title from "antd/es/skeleton/Title";
import dayjs from "dayjs";
import { FilterValue } from "antd/es/table/interface";

interface RecordType {
  day: string;
  gross: string;
  void: string;
  cancelled: string;
  net: string;
}
interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

const columns: TableProps<RecordType>["columns"] = [
  {
    title: "Day",
    dataIndex: "day",
    width: 40,
    fixed: "left",
  },
  {
    title: "Gross",
    dataIndex: "gross",
    width: 40,
    fixed: "left",
  },
  {
    title: "Void",
    dataIndex: "void",
    width: 40,
    fixed: "left",
  },
  {
    title: "Cancelled",
    dataIndex: "cancelled",
    width: 40,
    fixed: "left",
  },
  {
    title: "Net",
    dataIndex: "net",
    width: 40,
    fixed: "left",
  },
];

const getData = (count: number) => {
  const data: RecordType[] = new Array(count).fill(null).map((_, index) => ({
    day: dayjs().format("DD/MM/YYYY"),
    gross: `$${index.toString(16)}`,
    void: `$${index.toString(16)}`,
    cancelled: `$${index.toString(16)}`,
    net: `$${index.toString(16)}`,
  }));

  return data;
};

const Table1 = () => {
  const data = React.useMemo(() => getData(10000), [10000]);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  return (
    <div style={{ padding: 10 }}>
      <div style={{ width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "0px 25px" }}>
          <div style={{ fontSize: "20px", fontWeight: "700" }}>Sales Summary</div>
          <div style={{ fontSize: "15px", fontWeight: "500" }}>
            from {dayjs().format("DD/MM/YYYY")} to {dayjs().format("DD/MM/YYYY")}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
          <div style={{ fontSize: "15px", fontWeight: "500" }}>Category Totals</div>
        </div>

        <Table
          bordered={true}
          virtual
          columns={columns}
          scroll={{ x: "auto", y: 400 }}
          rowKey="gross"
          dataSource={data}
          pagination={{
            ...tableParams.pagination,
            onChange: (page, pageSize) => {
              console.log(page, pageSize);
              setTableParams({ pagination: { current: page, pageSize } });
            },
          }}
          summary={() => (
            <Table.Summary fixed>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>
                  <div style={{ fontWeight: 500 }}>Summary</div>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1}>content</Table.Summary.Cell>
                <Table.Summary.Cell index={2}>content</Table.Summary.Cell>
                <Table.Summary.Cell index={3}>content</Table.Summary.Cell>
                <Table.Summary.Cell index={4}>content</Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )}
        />
      </div>
    </div>
  );
};

export default Table1;
