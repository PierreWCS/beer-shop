import React, { useEffect, useState } from "react";
import "./LandingPage.css";
import Axios from "axios";
import ProductCard from "../Products/ProductsCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBirthdayCake,
  faBoxOpen,
  faFlask,
  faWineBottle
} from '@fortawesome/free-solid-svg-icons';
import Footer from "../Footer/Footer";

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
      {products ? (
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
                risus at ante imperdiet ullamcorper fringilla eu est.
              </p>
              <button className="aboutUsButton">DISCOVER MORE</button>
            </div>
            <div className="imageContainerAboutUs" />
          </div>

          {/*         Our products      */}

          <div className="ourProductsMainContainer">
            <h1 className="titleOurProducts">Discover our beers</h1>
            <div className="ourProductCardContainer">
              {products.map((product, key) => {
                if (key < 4) {
                  return <ProductCard key={key} product={product} />;
                } else return null;
              })}
            </div>
          </div>

          {/*       Stats       */}

          <div className="statsContainerLandingPage">
            <div className="statsLandingPageContentContainer">
              <div className="statsSmallContainer">
                <FontAwesomeIcon icon={faWineBottle} className="iconStatsLandingPage fa-4x" />
                <p className="numberStatsLandingPage">140</p>
                <hr className="separatorStatsLandingPage" />
                <p className="textStatsLandingPage">FLAVOURS</p>
              </div>
              <div className="statsSmallContainer">
                <FontAwesomeIcon icon={faBoxOpen} className="iconStatsLandingPage fa-4x" />
                <p className="numberStatsLandingPage">3751</p>
                <hr className="separatorStatsLandingPage" />
                <p className="textStatsLandingPage">DELIVERIES</p>
              </div>
              <div className="statsSmallContainer">
                <FontAwesomeIcon icon={faBirthdayCake} className="iconStatsLandingPage fa-4x" />
                <p className="numberStatsLandingPage">80</p>
                <hr className="separatorStatsLandingPage" />
                <p className="textStatsLandingPage">YEARS BREWING</p>
              </div>
              <div className="statsSmallContainer">
                <FontAwesomeIcon icon={faFlask} className="iconStatsLandingPage fa-4x" />
                <p className="numberStatsLandingPage">65</p>
                <hr className="separatorStatsLandingPage" />
                <p className="textStatsLandingPage">HOURS UNTIL NEW ONE</p>
              </div>
            </div>
          </div>

        {/*         Footer          */}

        <Footer />
        </div>
      ) : (
        // Showing a loading image during the products fetch
        <img
          className="logoLoading"
          src={require("../images/logo.png")}
          alt="loading"
        />
      )}

      {/*         End of the landing page        */}
    </div>
  );
};

export default LandingPage;
