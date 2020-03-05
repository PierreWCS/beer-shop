import React from 'react';
import './ProductsCard.css';

const ProductCard = ({ product }) => {

  const addProductToCart = () => {
    let stockCart = JSON.parse(localStorage.getItem('clientCart'));
    if (stockCart && stockCart.length > 0) {
      stockCart.push(product);
      localStorage.setItem('clientCart' ,JSON.stringify(stockCart));
    } else {
      let cartInit = [];
      cartInit.push(product);
      localStorage.setItem('clientCart',JSON.stringify(cartInit));
    }
  };

  return (
    <div className="itemProductCardContainer">
      <h3 className="productNameProductCard">{product.name}</h3>
      <img className="productImageProductCard" src={require(`../images/beers_products/${product.image}`)} alt={product.name} />
      <p className="productDescriptionProductCard">{product.description}</p>
      <p className="productPriceProductCard">{product.price} €</p>
      <button onClick={addProductToCart} className="aboutUsButton productCardButton">Add to cart</button>
    </div>
  )
};

export default ProductCard;
