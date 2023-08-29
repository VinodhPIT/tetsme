import '@/styles/globals.css'
import { useRouter } from 'next/router'
import { store } from '@/redux/store'
import { Provider } from 'react-redux'
import Context from '@/context/Context'
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";


export default function App({ Component, pageProps }) {
  const router = useRouter();
  const hideHeaderRoutes = ['/search']; // Add the routes where you want to hide the header
  // Check if the current route is in the hideHeaderRoutes array
  const shouldHideHeader = hideHeaderRoutes.includes(router.pathname);

  return (
  <Context>
      
      {!shouldHideHeader &&  <Header/>}
    
<main>
  <Component {...pageProps}  />

</main>
  <Footer/>

  </Context>)

}
