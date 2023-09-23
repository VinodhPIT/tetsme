
import Header from "@/components/pageHeader/Header";

const Custom404 = () => {
  return (
    <>
     
      <Header logo={"/tattooSearch.svg"} theme={"white"} isPosition={true} />
      <main>
        <div className="page-wrapper">
          <section className="page_404_wrap">
            <div class="container">
              <div className="page_404_block">
                <img src="./404_img.svg" alt="My SVG Image" className="img_404"/>
                <h1 class="page_title">Ooops... Page not found</h1>
                <p>Sorry, We can’t find the page you’re looking for</p>
                <a href="/" alt="back to home" class="btn_secondary btn_custom_m">Back to Home</a>
              </div>        
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Custom404;