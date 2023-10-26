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
                {cate?.gross
                  ? cate?.gross.toLocaleString("en-US", {
                      style: "decimal",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : "-"}
              </div>
            );
          })}
        </div>
      );
    },
    align: "right",
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
                {cate?.void
                  ? cate?.void.toLocaleString("en-US", {
                      style: "decimal",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : "-"}
              </div>
            );
          })}
        </div>
      );
    },
    align: "right",
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
                {cate?.cancelled
                  ? cate?.cancelled.toLocaleString("en-US", {
                      style: "decimal",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : "-"}
              </div>
            );
          })}
        </div>
      );
    },
    align: "right",
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
                {cate?.net
                  ? cate?.net.toLocaleString("en-US", {
                      style: "decimal",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : "-"}
              </div>
            );
          })}
        </div>
      );
    },
    align: "right",
  },
  {
    title: "Daily Net",
    dataIndex: "daily_net",
    render: (net) =>
      net ? net.toLocaleString("en-US", { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "-",
    align: "right",
  },
];
