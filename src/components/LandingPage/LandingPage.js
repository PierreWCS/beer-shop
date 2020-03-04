import React, { useEffect, useState } from "react";
import "./LandingPage.css";
import Axios from "axios";
import ProductCard from "../Products/ProductsCard";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBirthdayCake,
  faBoxOpen,
  faFlask,
  faWineBottle
} from '@fortawesome/free-solid-svg-icons'

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
                risus at ante imperdiet ullamcorper fringilla eu est. Morbi id
                nibh ex. Integer vel eros gravida, euismod purus in, faucibus
                sapien
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
                <p className="numberStatsLandingPage">140</p>
                <hr className="separatorStatsLandingPage" />
                <p className="textStatsLandingPage">FLAVOURS</p>
              </div>
            </div>
          </div>

          {/*       Footer      */}

          <div className="footerMainContainer">
            <div className="footerSmallContainer">
              <h1 className="footerBigTitle">Wild Beers</h1>
              <h4 className="footerBigTitleSubtitle">Since 2019</h4>
              <img
                className="logoNavBar"
                src={require("../images/logo.png")}
                alt="logo"
              />
            </div>
            <div className="footerSmallContainer">
              <h2 className="footerSubtitle">Site navigation</h2>
              <Link to="/" className="linkFooter" >Home</Link>
              <Link to="/" className="linkFooter" >About</Link>
              <Link to="/" className="linkFooter" >Beers</Link>
            </div>
            <div className="footerSmallContainer">
              <h2 className="footerSubtitle">Find us</h2>
              <p className="footerInformation">At our store:</p>
              <p className="footerInformation">1214 Alcohol ST</p>
              <p className="footerInformation">Chicago</p>
              <p className="footerInformation">From 9:00 to 20:00</p>
            </div>
          </div>
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
