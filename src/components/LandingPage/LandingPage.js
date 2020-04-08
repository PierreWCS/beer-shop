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
import {Link} from "react-router-dom";

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
        setProducts(stockProducts);
      })
      .catch(function (error) {
      // handle error
      console.log(error);
      const stockProducts = require('../fakeDb/fakeDb.json');
      console.log(stockProducts);
      setProducts(stockProducts);
      // setProducts(fakeDb[0]);
    })
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
              <Link to="/about" className="aboutUsButton aboutButtonLandingPage">DISCOVER MORE</Link>
            </div>
            <div className="imageContainerAboutUs" />
          </div>

          {/*       Beer of the month       */}

          <div className="aboutUsContentContainer">
            <h1 className="beerOfTheMonth">BEER OF THE MONTH</h1>
            <div className="containerAboutAroundTheBeer">
              <div className="firstColumnAbout">
                <div className="1stContainerAbout">
                  <h3 className="titleTextAbout leftText">
                    CREAMY BUT NOT TOO MUCH
                  </h3>
                  <p className="smallTextAbout leftText">
                    Lorem ipsum dolos sit amet, con sectur adiscing ejit. Aliter
                    nulla in mourix
                  </p>
                </div>
                <div className="2ndContainerAbout">
                  <h3 className="titleTextAbout leftText">MELLOW ON THE BOOZE</h3>
                  <p className="smallTextAbout leftText">
                    Lorem ipsum dolos sit amet, con sectur adiscing ejit. Aliter
                    moulki send our kiwli
                  </p>
                </div>
              </div>
              <div>
                <img
                  className="brownBeerAbout"
                  src={require("../images/StoutBeer.png")}
                  alt="beer"
                />
                <h2 className="beerNameAbout">THE WOOFLE BEER</h2>
              </div>
              <div className="secondColumnAbout">
                <div className="3rdContainerAbout">
                  <h3 className="titleTextAbout rightText">HAS A DEEP WARMTH</h3>
                  <p className="smallTextAbout rightText">
                    Lorem ipsum dolos sit amet, con sectur adiscing ejit. Aoijur con
                    sectur adiscing con sectur adiscing ipsum dolos sit amet
                  </p>
                </div>
                <div className="4thContainerAbout">
                  <h3 className="titleTextAbout rightText">A CHOCOLATE SMOOTH</h3>
                  <p className="smallTextAbout rightText">
                    Lorem ipsum dolos sit amet, con sectur adiscing ejit. Aliter
                    nulla in mourix ipsum dolos sit amet lorem ipsum quid de not
                    attemps ipsum dolos sit amet
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/*         Our products      */}

          <div className="ourProductsMainContainer">
            <h1 className="titleOurProducts">DISCOVER OUR BEST BEERS</h1>
            <div className="ourProductCardContainer">
              {products.map((product, key) => {
                if (key < 3) {
                  return <ProductCard products={products} index={key} product={product} />;
                } else return null;
              })}
            </div>
            <Link className="linkToProductsLandingPage" to="/products">ALL PRODUCTS</Link>
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
            src={require("../images/logoBeer.png")}
            alt="loading"
          />
      )}

      {/*         End of the landing page        */}
    </div>
  );
};

export default LandingPage;
