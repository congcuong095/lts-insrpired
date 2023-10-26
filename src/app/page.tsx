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
        <Button size="large">Login as Owner</Button>
      </Link>
      <Link href={"/partner"}>
        <Button size="large">Login as Partner</Button>
      </Link>
    </Space>
  </Card>
);

export default App;
