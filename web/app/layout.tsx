"use client";

import "./globals.css";
import { Roboto } from "next/font/google";
import { Provider } from 'react-redux'
import store from '../lib/store'

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"]
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
          <html lang="en">
            <body className={roboto.className}>
              <Provider store={store}>
                  {children}
              </Provider>
            </body>
          </html>
  );
}
