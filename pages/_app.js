import Head from "next/head";

import { AppProvider } from "../contexts/AppContext";

import "../styles/tailwind.css";
import "../styles/globals.css";
import "../styles/app.css";

const App = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Would You Rather</title>

      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />
    </Head>

    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  </>
);

export default App;
