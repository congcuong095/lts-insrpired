import { ResponeSummary } from "@/services/type";
import dayjs from "dayjs";

export const fakeData = (count: number): ResponeSummary[] => {
  const singleData = {
    processing_date: dayjs().format("DD/MM/YYYY"),
    gross: 200,
    void: 45,
    cancelled: 120,
    net: 35,
  };
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push({ ...singleData, id: i, processing_date: dayjs().add(i, "day").format("DD/MM/YYYY") });
  }
  return result;
};
