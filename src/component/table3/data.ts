import dayjs from "dayjs";

export const fakeData = (count: number) => {
  const singleData = {
    date: dayjs().format("DD/MM/YYYY"),
    category: [
      {
        name: "Supermaket",
        group: [
          {
            name: "drawGame",
            gross: "100",
            void: undefined,
            cancelled: "6",
            net: "94",
          },
          {
            name: "Fixed Odd",
            gross: "100",
            void: undefined,
            cancelled: "6",
            net: "94",
          },
        ],
      },
      {
        name: "Drug Store",
        group: [
          {
            name: "drawGame",
            gross: "100",
            void: undefined,
            cancelled: "6",
            net: "94",
          },
          {
            name: "Fixed Odd",
            gross: "100",
            void: undefined,
            cancelled: "6",
            net: "94",
          },
        ],
      },
    ],
  };
  const result = [];
  for (let i = 0; i < 10; i++) {
    result.push({ ...singleData, date: dayjs().add(i, "day").format("DD/MM/YYYY") });
  }
  return result;
};
