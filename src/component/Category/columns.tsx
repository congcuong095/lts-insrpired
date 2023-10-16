import { SalesByCategory, SalesByCategoryItem } from "@/services/type";
import { ColumnsType } from "antd/es/table";
import { CSSProperties } from "react";

const styleCell: CSSProperties = {
  borderBottom: "1px solid #f0f0f0",
  transition: "background 0.2s,border-color 0.2s",
  position: "relative",
  padding: "16px",
  overflowWrap: "break-word",
};

export const columns: ColumnsType<SalesByCategory> = [
  {
    title: "Date",
    dataIndex: "processing_date",
    render: (date) => date,
  },
  {
    title: "Category",
    dataIndex: "categories",

    render: (category: SalesByCategoryItem[]) => {
      return (
        <div
          style={{
            margin: "-16px",
          }}
        >
          {category.map((cate, index: number) => {
            return (
              <div
                key={index}
                style={{ ...styleCell, borderBottom: index === category.length - 1 ? "" : styleCell.borderBottom }}
              >
                {cate?.name ?? "-"}
              </div>
            );
          })}
        </div>
      );
    },
  },
  {
    title: "Gross",
    dataIndex: "categories",

    render: (category: SalesByCategoryItem[]) => {
      return (
        <div
          style={{
            margin: "-16px",
          }}
        >
          {category.map((cate, index: number) => {
            return (
              <div
                key={index}
                style={{ ...styleCell, borderBottom: index === category.length - 1 ? "" : styleCell.borderBottom }}
              >
                {cate?.gross ?? "-"}
              </div>
            );
          })}
        </div>
      );
    },
  },
  {
    title: "Void",
    dataIndex: "categories",

    render: (category: SalesByCategoryItem[]) => {
      return (
        <div
          style={{
            margin: "-16px",
          }}
        >
          {category.map((cate, index: number) => {
            return (
              <div
                key={index}
                style={{ ...styleCell, borderBottom: index === category.length - 1 ? "" : styleCell.borderBottom }}
              >
                {cate?.void ?? "-"}
              </div>
            );
          })}
        </div>
      );
    },
  },
  {
    title: "Cancelled",
    dataIndex: "categories",

    render: (category: SalesByCategoryItem[]) => {
      return (
        <div
          style={{
            margin: "-16px",
          }}
        >
          {category.map((cate, index: number) => {
            return (
              <div
                key={index}
                style={{ ...styleCell, borderBottom: index === category.length - 1 ? "" : styleCell.borderBottom }}
              >
                {cate?.cancelled ?? "-"}
              </div>
            );
          })}
        </div>
      );
    },
  },
  {
    title: "Net",
    dataIndex: "categories",

    render: (category: SalesByCategoryItem[]) => {
      return (
        <div
          style={{
            margin: "-16px",
          }}
        >
          {category.map((cate, index: number) => {
            return (
              <div
                key={index}
                style={{ ...styleCell, borderBottom: index === category.length - 1 ? "" : styleCell.borderBottom }}
              >
                {cate?.net ?? "-"}
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
