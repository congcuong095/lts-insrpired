import { ResponeSummary } from "@/services/type";
import { ColumnsType } from "antd/es/table";

export const columns: ColumnsType<ResponeSummary> = [
  {
    title: "Date",
    dataIndex: "processing_date",
    render: (date) => date,
  },
  {
    title: "Gross",
    dataIndex: "gross",
    render: (gross) => gross ?? "-",
  },
  {
    title: "Void",
    dataIndex: "void",
    render: (voide) => voide ?? "-",
  },
  {
    title: "Cancelled",
    dataIndex: "cancelled",
    render: (cancelled) => cancelled ?? "-",
  },
  {
    title: "Net",
    dataIndex: "net",
    render: (net) => net ?? "-",
  },
];
