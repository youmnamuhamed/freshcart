
import { ReactNode } from "react";
import "../Styles/globals.css";
import Navbar from "@/Components/Shared/Navbar";
import Footer from "@/Components/Shared/Footer";
import "@fortawesome/fontawesome-svg-core/styles";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { Exo } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import Providers from "@/Components/Providers/Providers";
import { verifyToke } from "@/features/Authentication/server/auth.action";


export const exo = Exo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-exo",
});

export default async function RootLayout({ children }: { children: ReactNode }) {
  const response = await verifyToke()
  return (
    <html lang="en">
      <body className={`${exo.className} font-medium`}>
        <Providers preloadedState={{auth:response}}>
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
        </Providers>
      </body>
    </html>
  );
}
