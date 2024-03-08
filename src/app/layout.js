import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Muso Muse",
  description: "An album review app",

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <header><p className="header-title">MUS0 MUSE</p>
      <nav className="nav-link">
          <Link href="/" className="nav-link">SAVED ALBUMS</Link> | <Link href="/searchalbums" className="nav-link">SEARCH ALBUMS</Link>
        </nav>
      </header>
        {children}
        <footer>Property of Myles &copy;</footer>
        </body>
    </html>
  );
}
