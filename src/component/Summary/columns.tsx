import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

export interface ISummary {
  date?: string;
  gross?: string;
  void?: string;
  cancelled?: string;
  net?: string;
}

export const columns: ColumnsType<ISummary> = [
  {
    title: "Date",
    dataIndex: "date",
    sorter: (a, b) => new Date(dayjs(a?.date, 'DD/MM/YYYY').format('YYYY/MM/DD') ?? '').getTime() - new Date(dayjs(b?.date, 'DD/MM/YYYY').format('YYYY/MM/DD') ?? '').getTime(),
    render: (date) => date,
  },
  {
    title: "Gross",
    dataIndex: "gross",
    render: (gross ) => gross ?? '-'
  },
  {
    title: "Void",
    dataIndex: "void",
    render: (voide) => voide ?? '-'
  },
  {
    title: "Cancelled",
    dataIndex: "cancelled",
    render: (cancelled) => cancelled ?? '-'
  },
  {
    title: "Net",
    dataIndex: "net",
    render: (net) => net ?? '-'
  }
];
