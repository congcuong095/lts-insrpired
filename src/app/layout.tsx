import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./page.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Demo inspired",
  description: "Demo inspired",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ background: "#ddd" }}>
        {children}
      </body>
    </html>
  );
}
