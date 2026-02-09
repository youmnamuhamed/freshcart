"use client";
import { ReactNode } from "react";
import "../Styles/globals.css";
import Navbar from "@/Components/Shared/Navbar";
import Footer from "@/Components/Shared/Footer";
import "@fortawesome/fontawesome-svg-core/styles";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { Exo } from "next/font/google";
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

export const exo = Exo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-exo",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${exo.className} font-medium`}>
        <Navbar />
        {children}
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </body>
    </html>
  );
}
