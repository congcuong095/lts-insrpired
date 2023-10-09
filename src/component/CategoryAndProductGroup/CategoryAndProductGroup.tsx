import React, { useEffect, useState } from "react";
import qs from "qs";
import { Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { ICatagoryProduct, columns } from "./columns";
import axios from "axios";
import { fakeData } from "./data";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const CategoryAndProduct: React.FC = () => {
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

  return (
    <Table
      rowKey={'date'}
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
            cate?.group?.forEach((gr) => {
              sumGross += Number(gr?.gross ?? 0);
              sumVoid += Number(gr?.void ?? 0);
              sumCancelled += Number(gr?.cancelled ?? 0);
              sumNet += Number(gr?.net ?? 0);
            });
          });
        });
        return (
          <Table.Summary fixed>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}>
                <div style={{ fontWeight: 600 }}>Summary</div>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={1}></Table.Summary.Cell>
              <Table.Summary.Cell index={2}></Table.Summary.Cell>
              <Table.Summary.Cell index={3}>{sumGross ? sumGross : "-"}</Table.Summary.Cell>
              <Table.Summary.Cell index={4}>{sumVoid ? sumVoid : "-"}</Table.Summary.Cell>
              <Table.Summary.Cell index={5}>{sumCancelled ? sumCancelled : "-"}</Table.Summary.Cell>
              <Table.Summary.Cell index={6}>{sumNet ? sumNet : "-"}</Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        );
      }}
    />
  );
};

export default CategoryAndProduct;
