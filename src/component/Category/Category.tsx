import React, { useEffect, useState } from "react";
import qs from "qs";
import { Card, DatePicker, DatePickerProps, Select, Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { ICatagoryProduct, columns } from "./columns";
import axios from "axios";
import { fakeData } from "./data";
import { RangePickerProps } from "antd/es/date-picker";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: {
    dateFrom?: string;
    dateTo?: string;
    category?: string;
    group?: string;
  };
}

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const { RangePicker } = DatePicker;

const Category: React.FC = () => {
  const [data, setData] = useState<ICatagoryProduct[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const fetchData = () => {
    setLoading(true);
    axios(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
      .then((res) => {
        return fakeData(5);
      })
      .then((results) => {
        setData(results);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: 200,
          },
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<ICatagoryProduct> | SorterResult<ICatagoryProduct>[]
  ) => {
    console.log(pagination);
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  const onFilterDate = (
    value: DatePickerProps["value"] | RangePickerProps["value"],
    dateString: [string, string] | string
  ) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  };
  const onFilterCategory = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      <Card
        title="Filter"
        size="small"
        style={{
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "200px",
              overflow: "hidden",
              fontWeight: "600",
            }}
          >
            Date:
          </div>
          <RangePicker onChange={onFilterDate} />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "200px",
              overflow: "hidden",
              fontWeight: "600",
            }}
          >
            Category:
          </div>
          <Select
            defaultValue="supermaket"
            style={{ width: 120 }}
            onChange={onFilterCategory}
            options={[
              { value: "supermaket", label: "Supermaket" },
              { value: "drugStore", label: "Drug Store" },
              { value: "internet", label: "Internet" },
            ]}
          />
        </div>
      </Card>
      <Table
        rowKey={"date"}
        columns={columns}
        dataSource={data}
        bordered
        pagination={tableParams.pagination}
        loading={loading}
        onChange={(pagination, filters, sorter) => handleTableChange(pagination, filters, sorter)}
        summary={(data) => {
          let sumGross = 0;
          let sumVoid = 0;
          let sumCancelled = 0;
          let sumNet = 0;
          data.forEach((item) => {
            item.category?.forEach((cate) => {
              sumGross += Number(cate?.gross ?? 0);
              sumVoid += Number(cate?.void ?? 0);
              sumCancelled += Number(cate?.cancelled ?? 0);
              sumNet += Number(cate?.net ?? 0);
            });
          });
          return (
            <Table.Summary fixed>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>
                  <div style={{ fontWeight: 600 }}>Summary</div>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1}></Table.Summary.Cell>
                <Table.Summary.Cell index={2}>{sumGross ? sumGross : "-"}</Table.Summary.Cell>
                <Table.Summary.Cell index={3}>{sumVoid ? sumVoid : "-"}</Table.Summary.Cell>
                <Table.Summary.Cell index={4}>{sumCancelled ? sumCancelled : "-"}</Table.Summary.Cell>
                <Table.Summary.Cell index={5}>{sumNet ? sumNet : "-"}</Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          );
        }}
      />
    </>
  );
};

export default Category;
