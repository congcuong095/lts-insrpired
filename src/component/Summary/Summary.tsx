import React, { useEffect, useState } from "react";
import { Button, Card, Space, Table, TablePaginationConfig, notification } from "antd";
import { columns } from "./columns";
import { ResponeSummary } from "@/services/type";
import { getPdfSummary, getSummary } from "@/services/report";
import { ParamReportProps } from "../Report";
import { AxiosError } from "axios";
import { DownloadOutlined } from "@ant-design/icons";

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
    const res = await getPdfSummary({ ...params, is_pdf: true });
    const file = new Blob([res?.data], { type: "application/pdf" });
    window.open(URL.createObjectURL(file), "_blank");
  };

  useEffect(() => {
    getData();
  }, [params]);

  return (
    <Card>
      <Space style={{ marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
        <div style={{ fontSize: "20px", fontWeight: 600 }}>Sales Summary</div>
        <Button type="primary" icon={<DownloadOutlined />} onClick={handlePrint}>
          Download PDF
        </Button>
      </Space>
      {contextHolder}
      <Table
        rowKey={"id"}
        columns={columns}
        dataSource={data?.sales_summary}
        bordered
        pagination={paging}
        onChange={(pagination) => {
          setPaging({
            ...pagination,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          });
        }}
        loading={loading}
        summary={() => {
          return (
            <Table.Summary fixed>
              <Table.Summary.Row style={{ background: "#fafafa" }}>
                <Table.Summary.Cell index={0}>
                  <div style={{ fontWeight: 600 }}>Total</div>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2}>
                  {data?.total_gross ? data?.total_gross.toLocaleString("en-US", { style: "decimal" }) : "-"}
                </Table.Summary.Cell>
                <Table.Summary.Cell index={3}>
                  {data?.total_void ? data?.total_void.toLocaleString("en-US", { style: "decimal" }) : "-"}
                </Table.Summary.Cell>
                <Table.Summary.Cell index={4}>
                  {data?.total_cancelled ? data?.total_cancelled.toLocaleString("en-US", { style: "decimal" }) : "-"}
                </Table.Summary.Cell>
                <Table.Summary.Cell index={5}>
                  {data?.total_net ? data?.total_net.toLocaleString("en-US", { style: "decimal" }) : "-"}
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
