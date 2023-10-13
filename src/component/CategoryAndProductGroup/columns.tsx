import { ColumnsType } from "antd/es/table";
import { CSSProperties } from "react";

export interface ICatagoryProduct {
  date?: string;
  category?: ICategory[];
}

export interface ICategory {
  name?: string;
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
  height: "100%",
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
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            height: "inherit",
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
    title: "Group",
    dataIndex: "category",
    render: (category: ICategory[]) => {
      return (
        <div
          style={{
            margin: "-16px",
          }}
        >
          {category.map((cate, indexCate: number) => {
            return (
              <div key={indexCate}>
                {cate?.group &&
                  cate?.group.map((group, index: number) => {
                    return (
                      <div
                        key={index}
                        style={{
                          ...styleCell,
                          borderBottom:
                            cate?.group && index === cate?.group?.length - 1 && indexCate === category.length - 1
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
          {category.map((cate, indexCate: number) => {
            return (
              <div key={indexCate}>
                {cate?.group &&
                  cate?.group.map((group, index: number) => {
                    return (
                      <div
                        key={index}
                        style={{
                          ...styleCell,
                          borderBottom:
                            cate?.group && index === cate?.group?.length - 1 && indexCate === category.length - 1
                              ? ""
                              : styleCell.borderBottom,
                        }}
                      >
                        {group?.gross ?? "-"}
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
          {category.map((cate, indexCate: number) => {
            return (
              <div key={indexCate}>
                {cate?.group &&
                  cate?.group.map((group, index: number) => {
                    return (
                      <div
                        key={index}
                        style={{
                          ...styleCell,
                          borderBottom:
                            cate?.group && index === cate?.group?.length - 1 && indexCate === category.length - 1
                              ? ""
                              : styleCell.borderBottom,
                        }}
                      >
                        {group?.void ?? "-"}
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
          {category.map((cate, indexCate: number) => {
            return (
              <div key={indexCate}>
                {cate?.group &&
                  cate?.group.map((group, index: number) => {
                    return (
                      <div
                        key={index}
                        style={{
                          ...styleCell,
                          borderBottom:
                            cate?.group && index === cate?.group?.length - 1 && indexCate === category.length - 1
                              ? ""
                              : styleCell.borderBottom,
                        }}
                      >
                        {group?.cancelled ?? "-"}
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
          {category.map((cate, indexCate: number) => {
            return (
              <div key={indexCate}>
                {cate?.group &&
                  cate?.group.map((group, index: number) => {
                    return (
                      <div
                        key={index}
                        style={{
                          ...styleCell,
                          borderBottom:
                            cate?.group && index === cate?.group?.length - 1 && indexCate === category.length - 1
                              ? ""
                              : styleCell.borderBottom,
                        }}
                      >
                        {group?.net ?? "-"}
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
  {
    title: "Category Net",
    dataIndex: "category",
    render: (category: ICategory[]) => {
      return (
        <div
          style={{
            margin: "-16px",
          }}
        >
          {category.map((cate, indexCate: number) => {
            const categoryNet = cate?.group?.reduce((total, group) => {
              return total + Number(group?.net);
            }, 0);
            return (
              <div
                key={indexCate}
                style={{ ...styleCell, borderBottom: indexCate === category.length - 1 ? "" : styleCell.borderBottom }}
              >
                {categoryNet ?? "-"}
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
        if (cate?.group) {
          return (
            totalDaily +
            cate?.group?.reduce((totalGroup, group) => {
              return totalGroup + Number(group?.net);
            }, 0)
          );
        } else {
          return totalDaily;
        }
      }, 0);
      return <div>{dailyNet ?? "-"}</div>;
    },
  },
];
