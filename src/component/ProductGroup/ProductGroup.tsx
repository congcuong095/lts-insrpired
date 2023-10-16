import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { columns } from "./columns";
import { ParamReportProps } from "../Report";
import { getProductGroup } from "@/services/report";
import { ResponeProductGroup } from "@/services/type";

const ProductGroup: React.FC<ParamReportProps> = ({ params }) => {
  const [data, setData] = useState<ResponeProductGroup | undefined>();
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await getProductGroup(params);
      if (res?.data) {
        setData(res?.data);
      }
    } catch (error) {
      alert(error);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [params]);

  return (
    <Table
      rowKey={"processing_date"}
      columns={columns}
      dataSource={data?.sales_by_productgroup}
      bordered
      pagination={false}
      loading={loading}
      summary={() => {
        return (
          <Table.Summary fixed>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}>
                <div style={{ fontWeight: 600 }}>Total</div>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={1}></Table.Summary.Cell>
              <Table.Summary.Cell index={2}>{data?.total_gross ? data?.total_gross : "-"}</Table.Summary.Cell>
              <Table.Summary.Cell index={3}>{data?.total_void ? data?.total_void : "-"}</Table.Summary.Cell>
              <Table.Summary.Cell index={4}>{data?.total_cancelled ? data?.total_cancelled : "-"}</Table.Summary.Cell>
              <Table.Summary.Cell index={5}>{data?.total_net ? data?.total_net : "-"}</Table.Summary.Cell>
              <Table.Summary.Cell index={6}></Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        );
      }}
    />
  );
};

export default ProductGroup;
