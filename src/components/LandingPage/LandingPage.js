import React, { useEffect, useState } from "react";
import "./LandingPage.css";
import Axios from "axios";
import ProductCard from "../Products/ProductsCard";

const LandingPage = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    Axios.get("http://localhost:8000/api/products")
      .then(result => result.data)
      .then(data => {
        let stockProducts = data;
        console.log(stockProducts);
        setProducts(stockProducts);
      });
  };

  return (
    <div className="landingPageMainContainer">
      {
        products ?
          (
            <div>
              {/*       Slider        */}
              <div className="sliderLandingPage" />

              {/*       About us        */}

              <div className="aboutUsMainContainer">
                <div className="aboutUsTextContainer">
                  <h3 className="smallSubtitleAbout">How we create our</h3>
                  <h1 className="aboutUsTitle">MASTER BREW</h1>
                  <p className="textAboutUs">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a
                    risus at ante imperdiet ullamcorper fringilla eu est. Morbi id nibh
                    ex. Integer vel eros gravida, euismod purus in, faucibus sapien
                  </p>
                  <button className="aboutUsButton">DISCOVER MORE</button>
                </div>
                <div className="imageContainerAboutUs" />
              </div>

              {/*         Our products      */}

              <div className="ourProductsMainContainer">
                <h1 className="titleOurProducts">Discover our beers</h1>
                <div className="ourProductCardContainer">
                  {
                    products.map((product) => {
                      return (
                        <ProductCard product={product} />
                      )
                    })
                  }
                </div>
              </div>

            {/*       Footer      */}

            <div className="footerMainContainer">

            </div>

            </div>
        )
          // Showing a loading image during the products fetch
          :
          <img src={require('../images/logo.png')} alt="loading"/>
      }

      {/*         End of the landing page        */}
    </div>
  );
};

export default LandingPage;
