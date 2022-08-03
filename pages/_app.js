import "../styles/globals.css";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { Auth0Provider } from "@auth0/auth0-react";
import { useEffect } from "react";

const domain = "virtual-gallery.eu.auth0.com";
const client_id = "SbBRzdJJgaeRCoBFrXJXeqT0x4GAmONG";
var browserWindow = "";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    browserWindow = window.location.origin;
  }, []);

  return (
    <>
      <Auth0Provider
        domain={domain}
        clientId={client_id}
        redirectUri={browserWindow}
      >
        <Navbar />
        <Component {...pageProps} />
      </Auth0Provider>
    </>
  );
}

export default MyApp;
