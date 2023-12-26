import Head from "next/head";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Status</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
