import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./provider";
import { MyAppBar } from "@/myappbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PayTM Merchant App",
  description: "Merchant App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
      <body className={inter.className}>
        <MyAppBar />
        {children}
        </body>
      </Providers>
    </html>
  );
}
