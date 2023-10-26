"use client";
import React from "react";
import { Button, Card, Space } from "antd";
import Link from "next/link";

const App: React.FC = () => (
  <Card
    style={{
      padding: "40px",
      display: "flex",
      justifyContent: "center",
    }}
  >
    <Space size={"large"}>
      <Link href={"/owner"}>
        <Button size="large">Go to Owner</Button>
      </Link>
      <Link href={"/partner"}>
        <Button size="large">Go to Parter</Button>
      </Link>
    </Space>
  </Card>
);

export default App;
