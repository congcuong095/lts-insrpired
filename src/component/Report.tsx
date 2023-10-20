"use client";
import React, { useState } from "react";
import { Button, Card, DatePicker, Select, Space, Table, Tabs, notification } from "antd";
import CategoryAndProduct from "./CategoryAndProductGroup/CategoryAndProductGroup";
import Summary from "./Summary/Summary";
import Category from "./Category/Category";
import ProductGroup from "./ProductGroup/ProductGroup";
import { IParamsReport } from "@/services/type";
import dayjs from "dayjs";
import { columns } from "./Summary/columns";
import { DownloadOutlined } from "@ant-design/icons";
import { getPdfCategory, getPdfCategoryAndProductGroup, getPdfProductGroup, getPdfSummary } from "@/services/report";
import { AxiosError } from "axios";

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
  const [selectedTable, setSelectedTable] = useState("none");
  const [params, setParams] = useState<IParamsReport>();
  const [formSearch, setFormSearch] = useState<IFormSearch>({});

  const [errorMessage, contextHolder] = notification.useNotification();

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
    } else {
      setFormSearch((pre) => {
        return {
          ...pre,
          date: undefined,
        };
      });
    }
  };

  const hanldeSearch = () => {
    setSelectedTable(formSearch?.table ?? "none");
    setParams((prev) => {
      const result = {
        ...prev,
        from_date: formSearch?.date?.from_date,
        to_date: formSearch?.date?.to_date,
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

  const handlePrint = async () => {
    try {
      if (!formSearch?.date?.from_date || !formSearch?.date?.to_date) {
        throw { message: "Wrong date format" };
      }
      let res;
      const finalParam: IParamsReport = { ...formSearch?.date, is_pdf: true };
      if (formSearch?.category_id) {
        finalParam.category_id = formSearch?.category_id;
      } else {
        delete finalParam.category_id;
      }
      if (formSearch?.product_group_id) {
        finalParam.product_group_id = formSearch?.product_group_id;
      } else {
        delete finalParam.product_group_id;
      }
      switch (formSearch?.table) {
        case "summary":
          res = await getPdfSummary(finalParam);
          break;
        case "category":
          res = await getPdfCategory(finalParam);
          break;
        case "productGroup":
          res = await getPdfProductGroup(finalParam);
          break;
        case "categoryProductGroup":
          res = await getPdfCategoryAndProductGroup(finalParam);
          break;
        default:
          return;
      }
      if (res) {
        const file = new Blob([res?.data], { type: "application/pdf" });

        let a = document.createElement("a");
        let blobURL = URL.createObjectURL(file);
        a.download = formSearch?.table + "-from-" + formSearch?.date?.from_date + "-to-" + formSearch?.date?.to_date;
        a.href = blobURL;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } catch (error) {
      const err = error as AxiosError;
      errorMessage.error({
        message: err?.message,
      });
    }
  };


  return (
    <div
      style={{
        background: "white",
        padding: "5px",
      }}
    >
      {contextHolder}
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
              Select report:
            </div>
            <Select
              value={formSearch?.table}
              style={{ width: 400 }}
              onChange={(value) => {
                setFormSearch({
                  table: value,
                  date: undefined,
                });
              }}
              allowClear={true}
              options={[
                { value: "summary", label: "Sales Summary" },
                { value: "category", label: "Sales By Category" },
                { value: "productGroup", label: "Sales By Product Group" },
                { value: "categoryProductGroup", label: "Sales By Category by Product Group" },
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
              value={[
                formSearch.date?.from_date ? dayjs(formSearch.date?.from_date, "DD-MM-YYYY") : null,
                formSearch.date?.to_date ? dayjs(formSearch.date?.to_date, "DD-MM-YYYY") : null,
              ]}
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
                      return {...prev};
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
                      return {...prev};
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
            <Button
              type="primary"
              onClick={() => hanldeSearch()}
              disabled={formSearch?.table === "" || !formSearch?.table}
            >
              Genarate
            </Button>
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={handlePrint}
              disabled={formSearch?.table === "" || !formSearch?.table}
            >
              Download PDF
            </Button>
          </Space>
        </div>
      </Card>
      <div>
        {selectedTable === "none" && (
          <Table
            rowKey={"id"}
            columns={columns}
            dataSource={[]}
            bordered
            summary={() => {
              return (
                <Table.Summary fixed>
                  <Table.Summary.Row style={{ background: "#fafafa" }}>
                    <Table.Summary.Cell index={0}>
                      <div style={{ fontWeight: 600 }}>Total</div>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={2}>{"-"}</Table.Summary.Cell>
                    <Table.Summary.Cell index={3}>{"-"}</Table.Summary.Cell>
                    <Table.Summary.Cell index={4}>{"-"}</Table.Summary.Cell>
                    <Table.Summary.Cell index={5}>{"-"}</Table.Summary.Cell>
                  </Table.Summary.Row>
                </Table.Summary>
              );
            }}
          />
        )}
        {selectedTable === "summary" && <Summary params={params} />}
        {selectedTable === "category" && <Category params={params} />}
        {selectedTable === "productGroup" && <ProductGroup params={params} />}
        {selectedTable === "categoryProductGroup" && <CategoryAndProduct params={params} />}
      </div>
    </div>
  );
};

export default Report;
