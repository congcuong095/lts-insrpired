import dayjs from "dayjs";

export const fakeData = (count: number) => {
  const singleData = {
    date: dayjs().format("DD/MM/YYYY"),
    gross: "100",
    cancelled: "6",
    net: "94",
  };
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push({ ...singleData, date: dayjs().add(i, "day").format("DD/MM/YYYY") });
  }
  return result;
};
