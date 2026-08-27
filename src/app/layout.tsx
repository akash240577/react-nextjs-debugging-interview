import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Debugging Interview Exercises",
  description: "Hands-on React + Next.js debugging exercises for interviews",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className="nav">
          <Link href="/">Interview Exercises</Link>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
