import localFont from "next/font/local";
import "./globals.css";
import TranstitionProvider from "@/components/TranstitionProvider";
import VideoBackground from "@/components/VideoBackground";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = localFont({
  src: [
    {
      path: "./fonts/cyrillic-ext.woff2",
      style: "normal",
      weight: "100 900",
      unicodeRange:
        "U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F",
    },
    {
      path: "./fonts/cyrillic.woff2",
      style: "normal",
      weight: "100 900",
      unicodeRange: "U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116",
    },
    {
      path: "./fonts/greek.woff2",
      style: "normal",
      weight: "100 900",
      unicodeRange: "U+1F??",
    },
    {
      path: "./fonts/greek-ext.woff2",
      style: "normal",
      weight: "100 900",
      unicodeRange:
        "U+0370-0377, U+037A-037F, U+0384-038A, U+038C, U+038E-03A1, U+03A3-03FF",
    },
    {
      path: "./fonts/vietnamese.woff2",
      style: "normal",
      weight: "100 900",
      unicodeRange:
        "U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB",
    },
    {
      path: "./fonts/latin-ext.woff2",
      style: "normal",
      weight: "100 900",
      unicodeRange:
        "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF",
    },
    {
      path: "./fonts/latin.woff2",
      style: "normal",
      weight: "100 900",
      unicodeRange:
        "U+00??, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
    },
  ],
  display: "swap",
});

const displayFont = localFont({
  src: [
    {
      path: "./fonts/playfair-display.woff2",
      style: "normal",
      weight: "400 900",
    },
  ],
  variable: "--font-display",
  display: "swap",
});

export const metadata = {
  title: "Yoseph Ayalew — Software Engineer | Portfolio",
  description:
    "Portfolio of Yoseph Ayalew — Software Engineer specializing in Java, Vert.x, Angular, React, and PostgreSQL. Full-stack developer based in Addis Ababa, Ethiopia.",
  openGraph: {
    title: "Yoseph Ayalew — Software Engineer",
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
    title: "Yoseph Ayalew — Software Engineer",
    description:
      "Full-stack developer specializing in Java, Vert.x, Angular, React, and PostgreSQL.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${inter.className} ${displayFont.variable}`}>
        <ThemeProvider>
          <VideoBackground />
          <TranstitionProvider>{children}</TranstitionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
