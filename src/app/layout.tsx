import { NextProvider, NextLayout } from "./provider";
import { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "NextMap",
  description: "Next.js 학습용 토이프로젝트",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextProvider>
          <NextLayout>{children}</NextLayout>
        </NextProvider>
      </body>
    </html>
  );
}
