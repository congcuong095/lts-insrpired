import { ColumnsType } from "antd/es/table";
import { CSSProperties } from "react";

export interface ICatagoryProduct {
  date?: string;
  category?: ICategory[];
}

export interface ICategory {
  name?: string;
  gross?: string;
  void?: string;
  cancelled?: string;
  net?: string;
}

const styleCell: CSSProperties = {
  borderBottom: "1px solid #f0f0f0",
  transition: "background 0.2s,border-color 0.2s",
  position: "relative",
  padding: "16px",
  overflowWrap: "break-word",
};

export const columns: ColumnsType<ICatagoryProduct> = [
  {
    title: "Date",
    dataIndex: "date",
    render: (date) => date,
  },
  {
    title: "Category",
    dataIndex: "category",

    render: (category: ICategory[]) => {
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
    dataIndex: "category",

    render: (category: ICategory[]) => {
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
    dataIndex: "category",

    render: (category: ICategory[]) => {
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
    dataIndex: "category",

    render: (category: ICategory[]) => {
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
    dataIndex: "category",

    render: (category: ICategory[]) => {
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
    dataIndex: "category",
    render: (category: ICategory[]) => {
      const dailyNet = category.reduce((totalDaily, cate) => {
        if (cate?.net) return totalDaily + Number(cate?.net ?? 0);
        return totalDaily;
      }, 0);
      return <div>{dailyNet ?? "-"}</div>;
    },
  },
];
