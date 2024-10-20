import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
  description: "dahsboard",
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
