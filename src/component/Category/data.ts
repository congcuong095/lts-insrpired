import dayjs from "dayjs";

export const fakeData = (count: number) => {
  const singleData = {
    date: dayjs().format("DD/MM/YYYY"),
    category: [
      {
        name: "Supermaket",
        gross: "100",
        cancelled: "6",
        net: "94",
      },
      {
        name: "Drug Store",
        gross: "101",
        void: "12",
        cancelled: "7",
        net: "94",
      },
      {
        name: "Internet",
        gross: "11",
        void: "12",
        cancelled: "7",
        net: "100",
      },
    ],
  };
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push({ ...singleData, date: dayjs().add(i, "day").format("DD/MM/YYYY") });
  }
  return result;
};
