"use client";
import React from "react";
import Report from "@/component/Report";
import { ConfigProvider } from "antd";

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      token: {
        // colorPrimary: '#d9d9d9',
        borderRadius: 6,
        colorBorderSecondary: "#d9d9d9",
      },
      components: {
        Button: {
          // colorPrimary: '#d9d9d9',
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
