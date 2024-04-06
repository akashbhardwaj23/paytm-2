import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./provider";
import MyAppBar from "../components/myappbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "User-App",
  description: "PayTM User App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <Providers>
      <body className={inter.className}>
        <MyAppBar />
        {children}</body>
      </Providers>
    </html>
  );
}
