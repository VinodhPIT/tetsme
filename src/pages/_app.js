import "@/styles/globals.css";
import { useRouter } from "next/router";
import { wrapper } from "@/redux/store";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import  Context  from '@/context/Context';
import { GlobalStateProvider } from '@/context/Context';


const  App = ({ Component, pageProps }) => {
  const router = useRouter();
  const hideHeaderRoutes = ["/search"]; // Add the routes where you want to hide the header
  // Check if the current route is in the hideHeaderRoutes array
  const shouldHideHeader = hideHeaderRoutes.includes(router.pathname);

  return (
   <>
   <GlobalStateProvider>


      {!shouldHideHeader && <Header />}
     
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
      </GlobalStateProvider>
      </>
  );
}

export default wrapper.withRedux(App)