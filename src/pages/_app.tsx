import Navbar from "@/components/NavBar";
import { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
