"use client";
import React, { useState } from "react";
import { Button, Card, DatePicker, Select, Space, Table, notification } from "antd";
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
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import { usePathname } from "next/navigation";

dayjs.extend(quarterOfYear);

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
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [errorMessage, contextHolder] = notification.useNotification();
  const [selectDateFormat, setSelectDateFormat] = useState();
  const pathname = usePathname();

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

  const handleSelectSpecialDay = (value: string | undefined) => {
    switch (value) {
      case "yesterday":
        {
          const startTime = dayjs().subtract(1, "day").format("DD-MM-YYYY");
          const endTime = dayjs().subtract(1, "day").format("DD-MM-YYYY");
          setFormSearch((prev) => {
            return { ...prev, date: { from_date: startTime, to_date: endTime } };
          });
        }
        break;
      case "lastWeek":
        {
          const startTime = dayjs().subtract(1, "week").startOf("week").format("DD-MM-YYYY");
          const endTime = dayjs().subtract(1, "week").endOf("week").format("DD-MM-YYYY");
          setFormSearch((prev) => {
            return { ...prev, date: { from_date: startTime, to_date: endTime } };
          });
        }
        break;
      case "lastMonth":
        {
          const startTime = dayjs().subtract(1, "month").startOf("month").format("DD-MM-YYYY");
          const endTime = dayjs().subtract(1, "month").endOf("week").format("DD-MM-YYYY");
          setFormSearch((prev) => {
            return { ...prev, date: { from_date: startTime, to_date: endTime } };
          });
        }
        break;
      case "lastQuarter":
        {
          const startTime = dayjs().subtract(1, "quarter").startOf("quarter").format("DD-MM-YYYY");
          const endTime = dayjs().subtract(1, "quarter").endOf("quarter").format("DD-MM-YYYY");
          setFormSearch((prev) => {
            return { ...prev, date: { from_date: startTime, to_date: endTime } };
          });
        }
        break;
      case "lastYear":
        {
          const startTime = dayjs().subtract(1, "year").startOf("year").format("DD-MM-YYYY");
          const endTime = dayjs().subtract(1, "year").endOf("year").format("DD-MM-YYYY");
          setFormSearch((prev) => {
            return { ...prev, date: { from_date: startTime, to_date: endTime } };
          });
        }
        break;
      default:
        return;
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
    setLoadingPdf(true);
    try {
      if (!formSearch?.date?.from_date || !formSearch?.date?.to_date) {
        throw { message: "Wrong date format" };
      }
      let res;
      const finalParam: IParamsReport = { ...formSearch?.date, is_pdf: true, utype: pathname === "/partner" ? 2 : 1 };
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
        switch (formSearch?.table) {
          case "summary":
            a.download = "sale_summary" + "_from_" + formSearch?.date?.from_date + "_to_" + formSearch?.date?.to_date;
            break;
          case "category":
            a.download =
              "sale_by_category" + "_from_" + formSearch?.date?.from_date + "_to_" + formSearch?.date?.to_date;
            break;
          case "productGroup":
            a.download =
              "sale_by_product_group" + "_from_" + formSearch?.date?.from_date + "_to_" + formSearch?.date?.to_date;
            break;
          case "categoryProductGroup":
            a.download =
              "sale_by_category_by_product_group" +
              "_from_" +
              formSearch?.date?.from_date +
              "_to_" +
              formSearch?.date?.to_date;
            break;
        }
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
    setLoadingPdf(false);
  };

  return (
    <div
      style={{
        padding: "5px",
      }}
    >
      {contextHolder}
      <Card
        style={{
          marginBottom: "20px",
        }}
      >
        <Space size={32} wrap align={"start"} style={{ marginBottom: "20px" }}>
          <div>
            <div
              style={{
                width: "100px",
                overflow: "hidden",
                fontWeight: "600",
                marginBottom: "4px",
              }}
            >
              <span style={{ color: "red" }}>* </span>Select report:
            </div>
            <Select
              value={formSearch?.table}
              style={{ width: 400 }}
              onChange={(value) => {
                setFormSearch({
                  table: value,
                  date: undefined,
                });
                setSelectDateFormat(undefined);
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
          <Space size={16} direction="vertical">
            <div>
              <div
                style={{
                  width: "100px",
                  overflow: "hidden",
                  fontWeight: "600",
                  marginBottom: "4px",
                }}
              >
                <span style={{ color: "red" }}>* </span>Select Date:
              </div>
              <Select
                value={selectDateFormat}
                style={{ width: 400 }}
                onChange={(value) => {
                  setSelectDateFormat(value);
                  if (!value) {
                    setFormSearch((prev) => {
                      return { ...prev, date: undefined };
                    });
                  } else if (value === "range") {
                    setFormSearch((prev) => {
                      return { ...prev, date: undefined };
                    });
                  } else {
                    handleSelectSpecialDay(value);
                  }
                }}
                allowClear={true}
                options={[
                  { value: "yesterday", label: "Yesterday" },
                  { value: "lastWeek", label: "Last Week" },
                  { value: "lastMonth", label: "Last Month" },
                  { value: "lastQuarter", label: "Last Quarter" },
                  { value: "lastYear", label: "Last Year" },
                  { value: "range", label: "Custom Range" },
                ]}
              />
            </div>
            {selectDateFormat === "range" && (
              <RangePicker
                style={{ width: 400 }}
                format={"DD-MM-YYYY"}
                value={[
                  formSearch.date?.from_date ? dayjs(formSearch.date?.from_date, "DD-MM-YYYY") : null,
                  formSearch.date?.to_date ? dayjs(formSearch.date?.to_date, "DD-MM-YYYY") : null,
                ]}
                onChange={(_, dateString) => onFilterDate(dateString)}
              />
            )}
          </Space>

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
                      return { ...prev };
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
                <Select.Option value={1}>Lotto Agency</Select.Option>
                <Select.Option value={2}>Supermarkets</Select.Option>
                <Select.Option value={3}>Guest House</Select.Option>
                <Select.Option value={4}>Coffee Shop</Select.Option>
                <Select.Option value={5}>Mini Market</Select.Option>
                <Select.Option value={6}>Gas Station</Select.Option>
                <Select.Option value={7}>Drug Store</Select.Option>
                <Select.Option value={8}>Liquor Store</Select.Option>
                <Select.Option value={9}>Service Office</Select.Option>
                <Select.Option value={10}>Leidsa Office</Select.Option>
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
                      return { ...prev };
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
                <Select.Option value={3}>Fixed Odds</Select.Option>
                <Select.Option value={4}>Product Group 1</Select.Option>
                <Select.Option value={5}>Product Group 2</Select.Option>
                <Select.Option value={6}>Product Group 3</Select.Option>
                <Select.Option value={7}>Product Group 4</Select.Option>
                <Select.Option value={8}>Product Group 5</Select.Option>
                <Select.Option value={9}>Product Group 6</Select.Option>
                <Select.Option value={10}>Product Group 7</Select.Option>
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
              loading={loadingPdf}
            >
              Download PDF
            </Button>
          </Space>
        </div>
      </Card>
      <div>
        {selectedTable === "none" && (
          <Card>
            <Table
              rowKey={"id"}
              columns={columns}
              dataSource={[]}
              bordered
              summary={() => {
                return (
                  <Table.Summary fixed>
                    <Table.Summary.Row style={{ color: "white", background: "#3aa3d9", textAlign: "right" }}>
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
          </Card>
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
