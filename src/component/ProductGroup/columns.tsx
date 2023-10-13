import { ColumnsType } from "antd/es/table";
import { CSSProperties } from "react";

export interface ICatagoryProduct {
  date?: string;
  group?: IGroup[];
}

export interface IGroup {
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
    sorter: true,
  },
  {
    title: "Group",
    dataIndex: "group",

    render: (group: IGroup[]) => {
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
    dataIndex: "group",

    render: (group: IGroup[]) => {
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
    dataIndex: "group",

    render: (group: IGroup[]) => {
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
    dataIndex: "group",

    render: (group: IGroup[]) => {
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
    dataIndex: "group",

    render: (group: IGroup[]) => {
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
    dataIndex: "group",
    render: (group: IGroup[]) => {
      const dailyNet = group.reduce((totalDaily, gr) => {
        if (gr?.net) return totalDaily + Number(gr?.net ?? 0);
        return totalDaily;
      }, 0);
      return <div>{dailyNet ?? "-"}</div>;
    },
  },
];
