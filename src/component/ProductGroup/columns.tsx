import { SalesByProductGroup, SalesByProductGroupItem } from "@/services/type";
import { ColumnsType } from "antd/es/table";
import { CSSProperties } from "react";

const styleCell: CSSProperties = {
  borderBottom: "1px solid #f0f0f0",
  transition: "background 0.2s,border-color 0.2s",
  position: "relative",
  padding: "16px",
  overflowWrap: "break-word",
};

export const columns: ColumnsType<SalesByProductGroup> = [
  {
    title: "Date",
    dataIndex: "processing_date",
    render: (date) => date,
  },
  {
    title: "Group",
    dataIndex: "product_groups",
    render: (group: SalesByProductGroupItem[]) => {
      return (
        <div
          style={{
            margin: "-16px",
          }}
        >
          {group.map((gr, index: number) => {
            return (
              <div
                key={index}
                style={{ ...styleCell, borderBottom: index === group.length - 1 ? "" : styleCell.borderBottom }}
              >
                {gr?.name ?? "-"}
              </div>
            );
          })}
        </div>
      );
    },
  },
  {
    title: "Gross",
    dataIndex: "product_groups",

    render: (group: SalesByProductGroupItem[]) => {
      return (
        <div
          style={{
            margin: "-16px",
          }}
        >
          {group.map((gr, index: number) => {
            return (
              <div
                key={index}
                style={{ ...styleCell, borderBottom: index === group.length - 1 ? "" : styleCell.borderBottom }}
              >
                {gr?.gross ?? "-"}
              </div>
            );
          })}
        </div>
      );
    },
  },
  {
    title: "Void",
    dataIndex: "product_groups",

    render: (group: SalesByProductGroupItem[]) => {
      return (
        <div
          style={{
            margin: "-16px",
          }}
        >
          {group.map((gr, index: number) => {
            return (
              <div
                key={index}
                style={{ ...styleCell, borderBottom: index === group.length - 1 ? "" : styleCell.borderBottom }}
              >
                {gr?.void ?? "-"}
              </div>
            );
          })}
        </div>
      );
    },
  },
  {
    title: "Cancelled",
    dataIndex: "product_groups",

    render: (group: SalesByProductGroupItem[]) => {
      return (
        <div
          style={{
            margin: "-16px",
          }}
        >
          {group.map((gr, index: number) => {
            return (
              <div
                key={index}
                style={{ ...styleCell, borderBottom: index === group.length - 1 ? "" : styleCell.borderBottom }}
              >
                {gr?.cancelled ?? "-"}
              </div>
            );
          })}
        </div>
      );
    },
  },
  {
    title: "Net",
    dataIndex: "product_groups",

    render: (group: SalesByProductGroupItem[]) => {
      return (
        <div
          style={{
            margin: "-16px",
          }}
        >
          {group.map((gr, index: number) => {
            return (
              <div
                key={index}
                style={{ ...styleCell, borderBottom: index === group.length - 1 ? "" : styleCell.borderBottom }}
              >
                {gr?.net ?? "-"}
              </div>
            );
          })}
        </div>
      );
    },
  },
  {
    title: "Daily Net",
    dataIndex: "daily_net",
    render: (net) => net,
  },
];
