import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Register",
  description: "Register from here",
};

export default function RootLayout({
  children,
}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
