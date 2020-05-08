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
import AOS from 'aos';
import 'aos/dist/aos.css';
import Api from "../services/Api";

const LandingPage = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
    getProducts();
  }, []);

  const getProducts = () => {
    Api.get('products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch(error => {
        const stockFakeProducts = require('../fakeDb/fakeDb.json');
        console.log("No database");
        setProducts(stockFakeProducts);
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
              <Link to="/about" className="aboutUsButton aboutButtonLandingPage">DISCOVER MORE</Link>
            </div>
            <div className="imageContainerAboutUs"/>
          </div>

          {/*       Beer of the month       */}

          <div className="aboutUsContentContainer">
            <h1 className="beerOfTheMonth" data-aos="fade" data-aos-delay="150">BEER OF THE MONTH</h1>
            <div className="containerAboutAroundTheBeer">
              <div className="firstColumnAbout">
                <div className="1stContainerAbout" data-aos="fade-up-right" data-aos-delay="200">
                  <h3 className="titleTextAbout leftText">
                    CREAMY BUT NOT TOO MUCH
                  </h3>
                  <p className="smallTextAbout leftText">
                    Lorem ipsum dolos sit amet, con sectur adiscing ejit. Aliter
                    nulla in mourix
                  </p>
                </div>
                <div className="2ndContainerAbout" data-aos="fade-down-right" data-aos-delay="1400">
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
                <h2 className="beerNameAbout" data-aos="fade" data-aos-delay="3000">THE WOOFLE BEER</h2>
              </div>
              <div className="secondColumnAbout" data-aos="fade-up-left" data-aos-delay="800">
                <div className="3rdContainerAbout">
                  <h3 className="titleTextAbout rightText">HAS A DEEP WARMTH</h3>
                  <p className="smallTextAbout rightText">
                    Lorem ipsum dolos sit amet, con sectur adiscing ejit. Aoijur con
                    sectur adiscing con sectur adiscing ipsum dolos sit amet
                  </p>
                </div>
                <div className="4thContainerAbout" data-aos="fade-down-left" data-aos-delay="2000">
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
            <div className="ourProductCardContainer" data-aos="fade-down">
              {products.map((product, key) => {
                if (key < 3) {
                  return <ProductCard products={products} index={key} product={product} />;
                } else return null;
              })}
            </div>
            <Link className="linkToProductsLandingPage" to="/products" data-aos="fade-up">ALL PRODUCTS</Link>
          </div>

          {/*       Stats       */}

          <div className="statsContainerLandingPage">
            <div className="statsLandingPageContentContainer">
              <div className="statsSmallContainer" data-aos="flip-right">
                <FontAwesomeIcon icon={faWineBottle} className="iconStatsLandingPage fa-4x" />
                <p className="numberStatsLandingPage">140</p>
                <hr className="separatorStatsLandingPage" />
                <p className="textStatsLandingPage">FLAVOURS</p>
              </div>
              <div className="statsSmallContainer" data-aos="flip-right">
                <FontAwesomeIcon icon={faBoxOpen} className="iconStatsLandingPage fa-4x" />
                <p className="numberStatsLandingPage">3751</p>
                <hr className="separatorStatsLandingPage" />
                <p className="textStatsLandingPage">DELIVERIES</p>
              </div>
              <div className="statsSmallContainer" data-aos="flip-right">
                <FontAwesomeIcon icon={faBirthdayCake} className="iconStatsLandingPage fa-4x" />
                <p className="numberStatsLandingPage">80</p>
                <hr className="separatorStatsLandingPage" />
                <p className="textStatsLandingPage">YEARS BREWING</p>
              </div>
              <div className="statsSmallContainer" data-aos="flip-right">
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
