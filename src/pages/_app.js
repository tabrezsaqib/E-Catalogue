import "../styles/globals.css";
import ShowProvider from "../components/context/ShowProvider";
import AuthProvider from "../components/context/AuthProvider";

export default function myApp({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}
