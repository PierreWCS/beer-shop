import React, {useEffect, useState} from "react";
import "./LandingPage.css";

const LandingPage = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {

  }, []);

  const getProducts = () => {

  };

  return (
    <div className="landingPageMainContainer">
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
      </div>

      {/*         Our products      */}

      <div className="ourProductsMainContainer">
        <h1>Discover our beers</h1>
      </div>

      {/*         End of the landing page        */}
    </div>
  );
};

export default LandingPage;
