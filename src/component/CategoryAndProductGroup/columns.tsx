import { CategoryAndProductGroupItemCategory, SalesByCategoryAndProductGroup } from "@/services/type";
import { ColumnsType } from "antd/es/table";
import { CSSProperties } from "react";

const styleCell: CSSProperties = {
  borderBottom: "1px solid #f0f0f0",
  transition: "background 0.2s,border-color 0.2s",
  position: "relative",
  padding: "16px",
  overflowWrap: "break-word",
  height: "100%",
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
};

export const columns: ColumnsType<SalesByCategoryAndProductGroup> = [
  {
    title: "Date",
    dataIndex: "processing_date",
    render: (date) => date,
  },
  {
    title: "Category",
    dataIndex: "categories",

    render: (category: CategoryAndProductGroupItemCategory[]) => {
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
                style={{
                  ...styleCell,
                  borderBottom: index === category.length - 1 ? "" : styleCell.borderBottom,
                  height: `${cate?.product_groups?.length ? `${cate?.product_groups?.length * 55}px` : "100%"}`,
                }}
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
    dataIndex: "categories",
    render: (category: CategoryAndProductGroupItemCategory[]) => {
      return (
        <div
          style={{
            margin: "-16px",
          }}
        >
          {category.map((cate, indexCate: number) => {
            return (
              <div
                key={indexCate}
                style={{
                  minWidth: "200px",
                }}
              >
                {cate?.product_groups &&
                  cate?.product_groups.map((group, index: number) => {
                    return (
                      <>
                        <div
                          key={index}
                          style={{
                            ...styleCell,
                            borderBottom:
                              cate?.product_groups &&
                              index === cate?.product_groups?.length - 1 &&
                              indexCate === category.length - 1
                                ? ""
                                : styleCell.borderBottom,
                          }}
                        >
                          {group?.name ?? "-"}
                        </div>
                      </>
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
    dataIndex: "categories",
    render: (category: CategoryAndProductGroupItemCategory[]) => {
      return (
        <div
          style={{
            margin: "-16px",
          }}
        >
          {category.map((cate, indexCate: number) => {
            return (
              <div key={indexCate}>
                {cate?.product_groups &&
                  cate?.product_groups.map((product_groups, index: number) => {
                    return (
                      <div
                        key={index}
                        style={{
                          ...styleCell,
                          borderBottom:
                            cate?.product_groups &&
                            index === cate?.product_groups?.length - 1 &&
                            indexCate === category.length - 1
                              ? ""
                              : styleCell.borderBottom,
                        }}
                      >
                        {product_groups?.gross
                          ? product_groups?.gross.toLocaleString("en-US", { style: "decimal" })
                          : "-"}
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
    dataIndex: "categories",
    render: (category: CategoryAndProductGroupItemCategory[]) => {
      return (
        <div
          style={{
            margin: "-16px",
          }}
        >
          {category.map((cate, indexCate: number) => {
            return (
              <div key={indexCate}>
                {cate?.product_groups &&
                  cate?.product_groups.map((product_groups, index: number) => {
                    return (
                      <div
                        key={index}
                        style={{
                          ...styleCell,
                          borderBottom:
                            cate?.product_groups &&
                            index === cate?.product_groups?.length - 1 &&
                            indexCate === category.length - 1
                              ? ""
                              : styleCell.borderBottom,
                        }}
                      >
                        {product_groups?.void
                          ? product_groups?.void.toLocaleString("en-US", { style: "decimal" })
                          : "-"}
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
    dataIndex: "categories",
    render: (category: CategoryAndProductGroupItemCategory[]) => {
      return (
        <div
          style={{
            margin: "-16px",
          }}
        >
          {category.map((cate, indexCate: number) => {
            return (
              <div key={indexCate}>
                {cate?.product_groups &&
                  cate?.product_groups.map((product_groups, index: number) => {
                    return (
                      <div
                        key={index}
                        style={{
                          ...styleCell,
                          borderBottom:
                            cate?.product_groups &&
                            index === cate?.product_groups?.length - 1 &&
                            indexCate === category.length - 1
                              ? ""
                              : styleCell.borderBottom,
                        }}
                      >
                        {product_groups?.cancelled
                          ? product_groups?.cancelled.toLocaleString("en-US", { style: "decimal" })
                          : "-"}
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
    dataIndex: "categories",
    render: (category: CategoryAndProductGroupItemCategory[]) => {
      return (
        <div
          style={{
            margin: "-16px",
          }}
        >
          {category.map((cate, indexCate: number) => {
            return (
              <div key={indexCate}>
                {cate?.product_groups &&
                  cate?.product_groups.map((product_groups, index: number) => {
                    return (
                      <div
                        key={index}
                        style={{
                          ...styleCell,
                          borderBottom:
                            cate?.product_groups &&
                            index === cate?.product_groups?.length - 1 &&
                            indexCate === category.length - 1
                              ? ""
                              : styleCell.borderBottom,
                        }}
                      >
                        {product_groups?.net ? product_groups?.net.toLocaleString("en-US", { style: "decimal" }) : "-"}
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
    dataIndex: "categories",
    render: (category: CategoryAndProductGroupItemCategory[]) => {
      return (
        <div
          style={{
            margin: "-16px",
          }}
        >
          {category.map((cate, indexCate: number) => {
            return (
              <div
                key={indexCate}
                style={{
                  ...styleCell,
                  borderBottom: indexCate === category.length - 1 ? "" : styleCell.borderBottom,
                  height: `${cate?.product_groups?.length ? `${cate?.product_groups?.length * 55}px` : "100%"}`,
                }}
              >
                {cate?.category_net ? cate?.category_net.toLocaleString("en-US", { style: "decimal" }) : "-"}
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
    render: (daily_net) => (daily_net ? daily_net.toLocaleString("en-US", { style: "decimal" }) : "-"),
  },
];
