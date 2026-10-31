import { Inter, Arimo, Roboto } from "next/font/google";
import type { Metadata } from "next";
import "./global.scss";

export const metadata: Metadata = {
  title: "Anna Borsh",
  description: "Anna Borsh",
};

export const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const arimo = Arimo({
  subsets: ["cyrillic", "latin"],
  variable: "--arimo",
  weight: ["400", "500", "600", "700"],
});
export const roboto = Roboto({
  subsets: ["cyrillic", "latin"],
  variable: "--roboto",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="uk"
      className={`${inter.variable} ${arimo.variable} ${roboto.variable}`}
    >
      <body className={inter.className}>{children}</body>
    </html>
  );
}
