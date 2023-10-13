"use client";
import React, { useEffect, useState } from "react";
import { Card, DatePicker, DatePickerProps, Select, Tabs } from "antd";
import CategoryAndProduct from "./CategoryAndProductGroup/CategoryAndProductGroup";
import Summary from "./Summary/Summary";
import Category from "./Category/Category";
import ProductGroup from "./ProductGroup/ProductGroup";
import { getCategory, getSummary } from "@/services/report";
import { IParamsReport, ResponeCategory, ResponeSummary } from "@/services/type";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const Report: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState("summary");
  const [params, setParams] = useState<IParamsReport>({
    from_date: "01-" + dayjs().format("MM-YYYY"),
    to_date: dayjs().format("DD-MM-YYYY"),
  });
  const [data, setData] = useState<ResponeSummary[] | ResponeCategory[] | undefined>();

  const onFilterDate = (dateString: [string, string] | string) => {
    const fromDate = dateString?.[0];
    const toDate = dateString?.[1];
    if (
      dayjs(fromDate, "DD-MM-YYYY").isValid() &&
      dayjs(toDate, "DD-MM-YYYY").isValid() &&
      dayjs(fromDate, "DD-MM-YYYY").utcOffset() <= dayjs(toDate, "DD-MM-YYYY").utcOffset()
    ) {
      setParams((pre) => {
        return {
          ...pre,
          from_date: fromDate,
          to_date: toDate,
        };
      });
    }
  };

  // const onFilterCategory = (value: string) => {
  //   console.log(`selected ${value}`);
  // };

  // const onFilterProductGroup = (value: string) => {
  //   console.log(`selected ${value}`);
  // };

  const getData = async () => {
    switch (selectedTable) {
      case "summary": {
        const res = await getSummary(params);
        if (res?.data) setData(res?.data);
        break;
      }
      case "category": {
        const res = await getCategory(params);
        if (res?.data) setData(res?.data);
        break;
      }
      case "productGroup":
        break;
      case "categoryProductGroup":
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    getData();
  }, [selectedTable, params]);

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
            value={selectedTable}
            style={{ width: 400 }}
            onChange={(value) => setSelectedTable(value)}
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
            // marginBottom: "20px",
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
            value={[dayjs(params?.from_date, "DD-MM-YYYY"), dayjs(params?.to_date, "DD-MM-YYYY")]}
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
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "200px",
              overflow: "hidden",
              fontWeight: "600",
            }}
          >
            Filter By Product Group:
          </div>
          <Select defaultValue="supermaket" style={{ width: 400 }} onChange={onFilterProductGroup}>
            <Select.Option value={"supermaket"}>Supermaket</Select.Option>
            <Select.Option value={"drugStore"}>Drug Store</Select.Option>
            <Select.Option value={"internet"}>Internet</Select.Option>
          </Select>
        </div> */}
      </Card>
      <div>
        {selectedTable === "summary" && <Summary data={data as ResponeSummary[]} />}
        {selectedTable === "category" && <Category />}
        {selectedTable === "productGroup" && <ProductGroup />}
        {selectedTable === "categoryProductGroup" && <CategoryAndProduct />}
      </div>
    </div>
  );
};

export default Report;
