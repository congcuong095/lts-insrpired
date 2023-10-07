import Table, { ColumnsType } from "antd/es/table";
import { relative } from "path";
import { CSSProperties } from "react";

export interface DataType {
  date?: string;
  category?: categoryType;
}

interface categoryType {
  name?: string;
  group?: groupType[];
}

export interface groupType {
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

export const columns: ColumnsType<DataType> = [
  {
    title: "Date",
    dataIndex: "date",
    render: (date) => date,
  },
  {
    title: "Category",
    dataIndex: "category",

    render: (category) => {
      return (
        <div
          style={{
            margin: "-16px",
          }}
        >
          {category.map((cate: any, index: number) => {
            return (
              <div style={{ ...styleCell, borderBottom: index === category.length - 1 ? "" : styleCell.borderBottom }}>
                {cate?.name ?? "-"}
              </div>
            );
          })}
        </div>
      );
    },
  },

  {
    title: "Category",
    dataIndex: "category",
    render: (category) => {
      return (
        <div
          style={{
            margin: "-16px",
          }}
        >
          {category.map((cate: any, indexCate: number) => {
            return (
              <div>
                {cate?.group.map((group: { name: any }, index: number) => {
                  return (
                    <div
                      style={{
                        ...styleCell,
                        borderBottom:
                          index === cate.group.length - 1 && indexCate === category.length - 1
                            ? ""
                            : styleCell.borderBottom,
                      }}
                    >
                      {group?.name ?? "-"}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      );
    },
  },
];
