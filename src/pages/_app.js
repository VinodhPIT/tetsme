import { useRouter } from "next/router";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { GlobalStateProvider } from "@/context/Context";
import { Figtree } from "next/font/google";

import "bootstrap/dist/css/bootstrap.min.css";

import "@/styles/globals.css";

import Layout from "@/utils/Layout";

 

const figtree = Figtree({

  style: ["normal"],

  weight: ["400", "700", "900", "600"],

  subsets: ["latin"],

});

 

function MyApp({ Component, pageProps }) {

  const router = useRouter();

 

  const shouldHideHeader = () => {

    // Specify the routes where you want to hide the header

    const hideHeaderRoutes = [

      "/search",

      "/",

      "/tattoo/[detail]",

      "/flash/[detail]",

      "/artist/[detail]",

      "/contactus",

      "/joinartist",

      "/all/[detail]",
      "/404"

    ];

 

    return hideHeaderRoutes.includes(router.pathname);

  };

 

  return (

    <GlobalStateProvider>

      <div className={figtree.className}>

        {!shouldHideHeader() && <Header />}

        <main>

          <Layout pathname={router.pathname}>

            <Component {...pageProps} />

          </Layout>

        </main>

        <Footer />

      </div>

    </GlobalStateProvider>

  );

}

 

export default MyApp;