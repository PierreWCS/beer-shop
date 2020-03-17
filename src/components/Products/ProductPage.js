import React from 'react';
import './ProductPage.css';

const ProductPage = ( props ) => {
  const product = props.location.state;
  return (
    <div className="productPageMainContainer">
      <div>
        <div>
          <img className="imageProductPage" src={require(`../images/beers_products/${product.image}`)} alt="product"/>
        </div>
        <div>
          <h1>{product.name}</h1>
          <p>-</p>
          <p>Total</p>
          <p>+</p>
          <div>
            <button>ADD TO CART</button>
            <h2>{product.price}€</h2>
          </div>
        </div>
      </div>
    </div>
  )
};

export default ProductPage;
