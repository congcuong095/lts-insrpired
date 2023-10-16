"use client";
import React, { useEffect, useState } from "react";
import { Button, Card, DatePicker, DatePickerProps, Select, Space, Tabs } from "antd";
import CategoryAndProduct from "./CategoryAndProductGroup/CategoryAndProductGroup";
import Summary from "./Summary/Summary";
import Category from "./Category/Category";
import ProductGroup from "./ProductGroup/ProductGroup";
import { getCategory, getSummary } from "@/services/report";
import { IParamsReport, ResponeCategory, ResponeSummary } from "@/services/type";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

export interface ParamReportProps {
  params?: IParamsReport;
}

const Report: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState("summary");
  const [params, setParams] = useState<IParamsReport>({
    from_date: "01-" + dayjs().format("MM-YYYY"),
    to_date: dayjs().format("DD-MM-YYYY"),
  });
  const [formSearch, setFormSearch] = useState({
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
    setSelectedTable(formSearch?.table);
    setParams(formSearch?.date);
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

  // const onFilterCategory = (value: string) => {
  //   console.log(`selected ${value}`);
  // };

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
          width: "800px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "200px",
              overflow: "hidden",
              fontWeight: "600",
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
              { value: "summary", label: "Sales Summary" },
              { value: "category", label: "Sales By Category " },
              { value: "productGroup", label: "Sales By Product Group" },
              { value: "categoryProductGroup", label: "Sales By Category by Product Group" },
            ]}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "200px",
              overflow: "hidden",
              fontWeight: "600",
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
        {/* <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "200px",
              overflow: "hidden",
              fontWeight: "600",
            }}
          >
            Filter By Category:
          </div>
          <Select defaultValue="supermaket" style={{ width: 400 }} onChange={onFilterCategory}>
            <Select.Option value={"supermaket"}>Supermaket</Select.Option>
            <Select.Option value={"drugStore"}>Drug Store</Select.Option>
            <Select.Option value={"internet"}>Internet</Select.Option>
          </Select>
        </div> */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            // marginBottom: "20px",
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
