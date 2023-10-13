import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { columns } from "./columns";
import axios from "axios";
import { fakeData } from "./data";
import dayjs from "dayjs";
import { ResponeSummary } from "@/services/type";

interface SummaryProps {
  data?: ResponeSummary[];
}

const Summary: React.FC<SummaryProps> = ({ data }) => {
  return (
    <>
      <Table
        rowKey={"id"}
        columns={columns}
        dataSource={fakeData(10)}
        bordered
        pagination={false}
        loading={!data ? true : false}
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
                  <div style={{ fontWeight: 600 }}>Summary</div>
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
