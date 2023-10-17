"use client";
import React, { useState } from "react";
import { Button, Card, DatePicker, Select, Space, Tabs } from "antd";
import CategoryAndProduct from "./CategoryAndProductGroup/CategoryAndProductGroup";
import Summary from "./Summary/Summary";
import Category from "./Category/Category";
import ProductGroup from "./ProductGroup/ProductGroup";
import { IParamsReport } from "@/services/type";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

export interface ParamReportProps {
  params?: IParamsReport;
}
interface IFormSearch {
  table?: string;
  date?: {
    from_date?: string;
    to_date?: string;
  };
  category_id?: number;
  product_group_id?: number;
}

const Report: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState("summary");
  const [params, setParams] = useState<IParamsReport>({
    from_date: "01-" + dayjs().format("MM-YYYY"),
    to_date: dayjs().format("DD-MM-YYYY"),
  });
  const [formSearch, setFormSearch] = useState<IFormSearch>({
    table: "summary",
    date: {
      from_date: "01-" + dayjs().format("MM-YYYY"),
      to_date: dayjs().format("DD-MM-YYYY"),
    },
  });

  const onFilterDate = (dateString: [string, string] | string) => {
    const fromDate = dateString?.[0];
    const toDate = dateString?.[1];
    if (
      dayjs(fromDate, "DD-MM-YYYY").isValid() &&
      dayjs(toDate, "DD-MM-YYYY").isValid() &&
      dayjs(fromDate, "DD-MM-YYYY").utcOffset() <= dayjs(toDate, "DD-MM-YYYY").utcOffset()
    ) {
      setFormSearch((pre) => {
        return {
          ...pre,
          date: {
            from_date: fromDate,
            to_date: toDate,
          },
        };
      });
    }
  };

  const hanldeSearch = () => {
    setSelectedTable(formSearch?.table ?? "");
    setParams((prev) => {
      const result = {
        ...prev,
        ...formSearch?.date,
      };
      if (formSearch?.category_id) {
        result.category_id = formSearch?.category_id;
      } else {
        delete result.category_id;
      }
      if (formSearch?.product_group_id) {
        result.product_group_id = formSearch?.product_group_id;
      } else {
        delete result.product_group_id;
      }
      return result;
    });
  };

  const handleCancel = () => {
    setFormSearch({
      table: "summary",
      date: {
        from_date: "01-" + dayjs().format("MM-YYYY"),
        to_date: dayjs().format("DD-MM-YYYY"),
      },
    });
    setSelectedTable("summary");
    setParams({
      from_date: "01-" + dayjs().format("MM-YYYY"),
      to_date: dayjs().format("DD-MM-YYYY"),
    });
  };

  return (
    <div
      style={{
        background: "white",
        padding: "5px",
      }}
    >
      <Card
        style={{
          marginBottom: "20px",
        }}
      >
        <Space size={32} wrap align={"center"} style={{ marginBottom: "20px" }}>
          <div>
            <div
              style={{
                width: "100px",
                overflow: "hidden",
                fontWeight: "600",
                marginBottom: "4px",
              }}
            >
              Select table:
            </div>
            <Select
              value={formSearch?.table}
              style={{ width: 400 }}
              onChange={(value) => {
                setFormSearch({
                  table: value,
                  date: {
                    from_date: "01-" + dayjs().format("MM-YYYY"),
                    to_date: dayjs().format("DD-MM-YYYY"),
                  },
                });
              }}
              options={[
                { value: "summary", label: "None" },
                { value: "category", label: "Category " },
                { value: "productGroup", label: "Product Group" },
                { value: "categoryProductGroup", label: "Category And Product Group" },
              ]}
            />
          </div>
          <div>
            <div
              style={{
                width: "100px",
                overflow: "hidden",
                fontWeight: "600",
                marginBottom: "4px",
              }}
            >
              Date:
            </div>
            <RangePicker
              style={{ width: 400 }}
              format={"DD-MM-YYYY"}
              value={[dayjs(formSearch.date?.from_date, "DD-MM-YYYY"), dayjs(formSearch.date?.to_date, "DD-MM-YYYY")]}
              onChange={(_, dateString) => onFilterDate(dateString)}
            />
          </div>

          {(formSearch?.table === "category" || formSearch?.table === "categoryProductGroup") && (
            <div>
              <div
                style={{
                  width: "200px",
                  overflow: "hidden",
                  fontWeight: "600",
                  marginBottom: "4px",
                }}
              >
                Filter By Category:
              </div>
              <Select
                style={{ width: 400 }}
                onChange={(value) => {
                  if (value === 0) {
                    setFormSearch((prev) => {
                      delete prev.category_id;
                      return prev;
                    });
                  } else {
                    setFormSearch({
                      ...formSearch,
                      category_id: value,
                    });
                  }
                }}
                value={formSearch?.category_id ?? 0}
              >
                <Select.Option value={0}>All</Select.Option>
                <Select.Option value={1}>Pharmacy</Select.Option>
                <Select.Option value={2}>Minimarkets</Select.Option>
                <Select.Option value={3}>Supermarkets</Select.Option>
                <Select.Option value={4}>Shopping mall</Select.Option>
                <Select.Option value={5}>Retailer Category 1</Select.Option>
                <Select.Option value={6}>Retailer Category 2</Select.Option>
                <Select.Option value={7}>Retailer Category 3</Select.Option>
                <Select.Option value={8}>Retailer Category 4</Select.Option>
                <Select.Option value={9}>Retailer Category 5</Select.Option>
                <Select.Option value={10}>Retailer Category 6</Select.Option>
              </Select>
            </div>
          )}

          {(formSearch?.table === "productGroup" || formSearch?.table === "categoryProductGroup") && (
            <div>
              <div
                style={{
                  width: "200px",
                  overflow: "hidden",
                  fontWeight: "600",
                  marginBottom: "4px",
                }}
              >
                Filter By Product Group:
              </div>
              <Select
                style={{ width: 400 }}
                onChange={(value) => {
                  if (value === 0) {
                    setFormSearch((prev) => {
                      delete prev.product_group_id;
                      return prev;
                    });
                  } else {
                    setFormSearch({
                      ...formSearch,
                      product_group_id: value,
                    });
                  }
                }}
                value={formSearch?.product_group_id ?? 0}
              >
                <Select.Option value={0}>All</Select.Option>
                <Select.Option value={1}>Draw Games</Select.Option>
                <Select.Option value={2}>Kino Games</Select.Option>
                <Select.Option value={3}>Number Match</Select.Option>
                <Select.Option value={4}>Bonus Ball, Odd / Even</Select.Option>
                <Select.Option value={5}>Last Ball Drawn</Select.Option>
                <Select.Option value={6}>Sum</Select.Option>
                <Select.Option value={7}>First Ball Drawn</Select.Option>
                <Select.Option value={8}>Bonus Ball, Colour</Select.Option>
                <Select.Option value={9}>Game Outcome</Select.Option>
                <Select.Option value={10}>Group Outcome</Select.Option>
              </Select>
            </div>
          )}
        </Space>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Space wrap>
            <Button type="primary" onClick={() => hanldeSearch()}>
              Search
            </Button>
            <Button onClick={() => handleCancel()}>Cancel</Button>
          </Space>
        </div>
      </Card>
      <div>
        {selectedTable === "summary" && <Summary params={params} />}
        {selectedTable === "category" && <Category params={params} />}
        {selectedTable === "productGroup" && <ProductGroup params={params} />}
        {selectedTable === "categoryProductGroup" && <CategoryAndProduct params={params} />}
      </div>
    </div>
  );
};

export default Report;
