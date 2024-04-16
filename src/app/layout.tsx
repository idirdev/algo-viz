import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Algo Viz - Sorting Algorithm Visualizer",
  description: "Interactive visualization of sorting algorithms including bubble, selection, insertion, merge, and quick sort.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
