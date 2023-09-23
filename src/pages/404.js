import Header from "@/components/pageHeader/Header";
import Image from "next/image";

import Link from "next/link";

const Custom404 = () => {
  return (
    <>
      <Header logo={"/tattooSearch.svg"} theme={"white"} isPosition={false} />

      <main>
        <div className="page-wrapper">
          <section className="page_404_wrap">
            <div class="container">
              <div className="page_404_block">
                <Image
                  src="/404_img.svg"
                  alt="404"
                  width={410}
                  height={98}
                  priority
                />

                <h1 class="page_title">Ooops... Page not found</h1>
                <p>Sorry, We can’t find the page you’re looking for</p>
                <Link
                  href="/"
                  alt="back to home"
                  class="btn_secondary btn_custom_m"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Custom404;
