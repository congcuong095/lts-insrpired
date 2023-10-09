"use client";
import React from "react";
import { Tabs } from "antd";
import CategoryAndProduct from "./CategoryAndProductGroup/CategoryAndProductGroup";
import Summary from "./Summary/Summary";

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
          label: `Sales By Category by Product Group`,
          key: "4",
          children: <CategoryAndProduct />,
        },
        {
          label: `Sales Summary`,
          key: "3",
          children: <Summary />,
        },
      ]}
    />
  </div>
);

export default Tab;
