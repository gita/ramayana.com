import "./globals.css";
import Link from "next/link";
export const metadata = { title: "Page not found · Ramayana.com" };
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-dvh items-center justify-center px-6 text-center">
        <div>
          <h1 className="t-title">This page is not here</h1>
          <p className="mt-3 text-muted">The whole Ramayana is a tap away.</p>
          <Link href="/" className="press mt-6 inline-flex h-12 items-center rounded-full bg-accent px-6 font-medium text-white">Go home</Link>
        </div>
      </body>
    </html>
  );
}
