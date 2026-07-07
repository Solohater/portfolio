import { Inter } from "next/font/google";
import "./globals.css";
import TranstitionProvider from "@/components/TranstitionProvider";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Yoseph Ayalew — Junior Software Engineer | Portfolio",
  description:
    "Portfolio of Yoseph Ayalew — Junior Software Engineer specializing in Java, Vert.x, Angular, React, and PostgreSQL. Full-stack developer based in Addis Ababa, Ethiopia.",
  openGraph: {
    title: "Yoseph Ayalew — Junior Software Engineer",
    description:
      "Full-stack developer specializing in Java, Vert.x, Angular, React, and PostgreSQL. Based in Addis Ababa, Ethiopia.",
    url: "https://portfolio-7ypn.onrender.com",
    siteName: "Yoseph Ayalew Portfolio",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yoseph Ayalew — Junior Software Engineer",
    description:
      "Full-stack developer specializing in Java, Vert.x, Angular, React, and PostgreSQL.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <TranstitionProvider>{children}</TranstitionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
