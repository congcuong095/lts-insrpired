import { ResponeSummary, SalesSummary } from "@/services/type";
import { ColumnsType } from "antd/es/table";

export const columns: ColumnsType<SalesSummary> = [
  {
    title: "Date",
    dataIndex: "processing_date",

    render: (date) => date,
  },
  {
    title: "Gross",
    dataIndex: "gross",
    render: (gross) => (gross ? gross.toLocaleString("en-US", { style: "decimal" }) : "-"),
  },
  {
    title: "Void",
    dataIndex: "void",
    render: (voide) => (voide ? voide.toLocaleString("en-US", { style: "decimal" }) : "-"),
  },
  {
    title: "Cancelled",
    dataIndex: "cancelled",
    render: (cancelled) => (cancelled ? cancelled.toLocaleString("en-US", { style: "decimal" }) : "-"),
  },
  {
    title: "Net",
    dataIndex: "net",
    render: (net) => (net ? net.toLocaleString("en-US", { style: "decimal" }) : "-"),
  },
];
