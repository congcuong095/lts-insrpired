import React, { useEffect, useState } from "react";
import { Table, TablePaginationConfig } from "antd";
import { columns } from "./columns";
import { ResponeSummary } from "@/services/type";
import { getSummary } from "@/services/report";
import { ParamReportProps } from "../Report";

const Summary: React.FC<ParamReportProps> = ({ params }) => {
  const [data, setData] = useState<ResponeSummary[] | undefined>();
  const [loading, setLoading] = useState(false);
  const [paging, setPaging] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    pageSizeOptions: [10, 20, 50],
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    total: data?.length,
    showSizeChanger: true,
  });

  const getData = async () => {
    setLoading(true);
    try {
      const res = await getSummary(params);
      if (res?.data) {
        setData(res?.data);
      }
    } catch (error) {
      alert(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [params]);

  console.log(paging);

  return (
    <>
      <Table
        rowKey={"id"}
        columns={columns}
        dataSource={data}
        bordered
        pagination={paging}
        onChange={(pagination) => {
          setPaging({
            ...pagination,
          });
        }}
        loading={loading}
        summary={(data) => {
          let sumGross = 0;
          let sumVoid = 0;
          let sumCancelled = 0;
          let sumNet = 0;
          data.forEach((item) => {
            sumGross += Number(item?.gross ?? 0);
            sumVoid += Number(item?.void ?? 0);
            sumCancelled += Number(item?.cancelled ?? 0);
            sumNet += Number(item?.net ?? 0);
          });
          return (
            <Table.Summary fixed>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>
                  <div style={{ fontWeight: 600 }}>Total</div>
                </Table.Summary.Cell>
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

export default Summary;
