import "@/styles/globals.css";
import { useRouter } from "next/router";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { GlobalStateProvider } from "@/context/Context";
import { Figtree } from 'next/font/google'

const figtree = Figtree({
  style: ['normal',],
  weight: ['400', '700','900','600'],
  subsets: ['latin'],
})

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  const hideHeaderRoutes = ["/search"]; // Add the routes where you want to hide the header
  const shouldHideHeader = hideHeaderRoutes.includes(router.pathname);



 


  return (
    <>
      <GlobalStateProvider>
        {!shouldHideHeader && <Header />}
        <main className={figtree.className}>
          <Component {...pageProps} />
        </main>
        <Footer />
      </GlobalStateProvider>
    </>
  );
};

export default App;
