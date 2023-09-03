import "@/styles/globals.css";
import { useRouter } from "next/router";
import { wrapper } from "@/redux/store";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

const  App = ({ Component, pageProps }) => {
  const router = useRouter();
  const hideHeaderRoutes = ["/search"]; // Add the routes where you want to hide the header
  // Check if the current route is in the hideHeaderRoutes array
  const shouldHideHeader = hideHeaderRoutes.includes(router.pathname);

  return (
   <>
      {!shouldHideHeader && <Header />}
     
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
      </>
  );
}

export default wrapper.withRedux(App)