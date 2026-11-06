import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Supa Maket",
  description: "Discover shops, stays and car hire in one place."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
