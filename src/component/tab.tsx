"use client";
import React from "react";
import { Tabs } from "antd";
import Table1 from "../component/table1";
import Table2 from "../component/table2";
import Table3 from "./table3/table3";

const onChange = (key: string) => {
  console.log(key);
};

const Tab: React.FC = () => (
  <div
    style={{
      background: "white",
    }}
  >
    <Tabs
      onChange={onChange}
      animated={true}
      tabBarGutter={3}
      type="card"
      items={[
        {
          label: `Sales Summary`,
          key: "1",
          children: <Table1 />,
        },
        {
          label: `Sales By Category `,
          key: "2",
          children: <Table2 />,
        },
        {
          label: `Sales By Product Group`,
          key: "3",
          children: <Table2 />,
        },
        {
          label: `Sales By Product`,
          key: "4",
          children: <Table2 />,
        },
        {
          label: `Sales By Category by Product Group`,
          key: "5",
          children: <Table3 />,
        },
      ]}
    />
  </div>
);

export default Tab;
