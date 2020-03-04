import React from 'react';
import './ProductsCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="itemProductCardContainer">
      <h3 className="productNameProductCard">{product.name}</h3>
      <img className="productImageProductCard" src={require(`../images/beers_products/${product.image}`)} alt={product.name} />
      <p className="productDescriptionProductCard">{product.description}</p>
      <p className="productPriceProductCard">{product.price} €</p>
      <button className="aboutUsButton productCardButton">Add to cart</button>
    </div>
  )
};

export default ProductCard;
