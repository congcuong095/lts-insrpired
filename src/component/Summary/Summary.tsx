import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Space, Table, TablePaginationConfig, notification } from "antd";
import { columns } from "./columns";
import { ResponeSummary } from "@/services/type";
import { getSummary } from "@/services/report";
import { ParamReportProps } from "../Report";
import axios, { AxiosError } from "axios";
import { DownloadOutlined } from "@ant-design/icons";
import { openPrintPdf } from "@/utils/pdf";
import { useReactToPrint } from "react-to-print";

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

  const [errorMessage, contextHolder] = notification.useNotification();

  const getData = async () => {
    setLoading(true);
    try {
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
    setLoading(false);
  };

  const handlePrint = async () => {
    const res = await axios("");
    openPrintPdf(res?.data.data);
  };

  const generatePDF = useReactToPrint({
    content: () => tableRef.current,
    documentTitle: "Sales by summary",
  });

  const tableRef = useRef(null);

  useEffect(() => {
    getData();
  }, [params]);

  return (
    <Card>
      <Space style={{ marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
        <div style={{ fontSize: "20px", fontWeight: 600 }}>Sales Summary</div>
        <Button type="primary" icon={<DownloadOutlined />} onClick={generatePDF}>
          Download PDF
        </Button>
      </Space>
      {contextHolder}
      <Table
        ref={tableRef}
        rowKey={"id"}
        columns={columns}
        dataSource={data}
        bordered
        pagination={paging}
        onChange={(pagination) => {
          setPaging({
            ...pagination,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
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
              <Table.Summary.Row style={{ background: "#fafafa" }}>
                <Table.Summary.Cell index={0}>
                  <div style={{ fontWeight: 600 }}>Total</div>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2}>
                  {sumGross ? sumGross.toLocaleString("en-US", { style: "decimal" }) : "-"}
                </Table.Summary.Cell>
                <Table.Summary.Cell index={3}>
                  {sumVoid ? sumVoid.toLocaleString("en-US", { style: "decimal" }) : "-"}
                </Table.Summary.Cell>
                <Table.Summary.Cell index={4}>
                  {sumCancelled ? sumCancelled.toLocaleString("en-US", { style: "decimal" }) : "-"}
                </Table.Summary.Cell>
                <Table.Summary.Cell index={5}>
                  {sumNet ? sumNet.toLocaleString("en-US", { style: "decimal" }) : "-"}
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          );
        }}
      />
    </Card>
  );
};

export default Summary;
