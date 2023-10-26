"use client";
import React from "react";
import Report from "@/component/Report";
import { ConfigProvider } from "antd";

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#3aa3d9",
        borderRadius: 6,
        colorBorderSecondary: "#d9d9d9",
      },
      components: {
        Button: {
          colorPrimary: "#3aa3d9",
        },
        Table: {
          headerBg: "#3aa3d9",
          headerColor: "white",
          rowHoverBg: "#3aa3d91a",
        },
      },
    }}
  >
  <div
    style={{
      padding: "40px",
    }}
  >
    <Report />
  </div>
    </ConfigProvider>
);

export default App;
