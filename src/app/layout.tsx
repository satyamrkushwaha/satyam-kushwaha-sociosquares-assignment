import type { Metadata } from "next";
import "./globals.css";
import "./common.css";
import ReduxProvider from "@/redux/provider";


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
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
