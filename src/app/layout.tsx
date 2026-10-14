import type { Metadata } from "next";
import "./global.scss";
export const metadata: Metadata = {
  title: "Anna Borsh",
  description: "Anna Borsh",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
