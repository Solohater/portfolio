import { Inter } from "next/font/google";
import "./globals.css";
import TranstitionProvider from "@/components/TranstitionProvider";
import { ThemeProvider } from "@/context/ThemeContext";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Yoseph Ayalew — Junior Software Engineer",
  description: "Portfolio of Yoseph Ayalew — Junior Software Engineer specializing in Java, Vert.x, Angular, React, and PostgreSQL.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     
      <body className={inter.className}>
       <ThemeProvider>
       <TranstitionProvider>{children}</TranstitionProvider>
       <Footer />
       </ThemeProvider>
       </body>
    </html>
  );
}
