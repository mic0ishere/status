import Head from "next/head";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Status | mic0</title>
      </Head>
      <Component {...pageProps} />
      <Script src="https://kit.fontawesome.com/fbbbb0f281.js"></Script>
    </>
  );
}

export default MyApp;
