import dayjs from "dayjs";

export const fakeData = (count: number) => {
  const singleData = {
    date: dayjs().format("DD/MM/YYYY"),
    group: [
      {
        name: "Draw Game",
        gross: "100",
        cancelled: "6",
        net: "94",
      },
      {
        name: "Fixed Odd",
        gross: "101",
        void: "12",
        cancelled: "7",
        net: "94",
      },
    ],
  };
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push({ ...singleData, date: dayjs().add(i, "day").format("DD/MM/YYYY") });
  }
  return result;
};
