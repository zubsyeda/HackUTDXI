import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./sections/nav/page";
import KommunicateChat from "./components/KommunicateChat";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Banking App | Goldman Sachs",
  description: "Secure banking application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav />
        {children}
        <KommunicateChat />
      </body>
    </html>
  );
}
