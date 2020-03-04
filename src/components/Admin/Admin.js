import React, { useEffect, useState } from "react";
import "./Admin.css";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBirthdayCake,
  faCross,
  faWindowClose
} from "@fortawesome/free-solid-svg-icons";

const Admin = () => {
  const [products, setProducts] = useState(null);
  const [messages, setMessages] = useState(null);
  const [displayChoice, setDisplayChoice] = useState("products");

  useEffect(() => {
    getProducts();
    getMessages();
  }, []);

  const getProducts = () => {
    Axios.get("http://localhost:8000/api/products")
      .then(result => result.data)
      .then(data => {
        let stockProducts = data;
        setProducts(stockProducts);
      });
  };

  const deleteProduct = (productId) => {
    if (window.confirm('Do you really wanna delete this product ?')) {
      Axios.delete(`http://localhost:8000/api/products/:${productId}`)
        .then(res => {
          if (res.status === 200) {
            alert("Product has been deleted")
          } else {
            alert("Error")
          }
          console.log(res);
        })
        .then(response => {
          console.log(response)
        });
    }
  };

  const getMessages = () => {
    Axios.get("http://localhost:8000/api/messages")
      .then(result => result.data)
      .then(data => {
        let stockMessages = data;
        setMessages(stockMessages);
      });
  };

  return (
    <div className="adminMainContainer">
      <h1 className="titleAdminPage">Admin panel</h1>

      <div className="adminNavBar">
        <h2 onClick={() => setDisplayChoice('products')} className={`itemNavBarAdmin ${displayChoice === 'products' ? 'activeItemAdmin' : null}`}>Products</h2>
        <h2 onClick={() => setDisplayChoice('messages')} className={`itemNavBarAdmin ${displayChoice === 'messages' ? 'activeItemAdmin' : null}`}>Messages</h2>
      </div>

      <div className="productsAdmin">
        {/*     I am displaying products by default and on click on messages i'm changing the content     */}
        {products && messages
          ?
          displayChoice === 'products' ?
            (
              products.map(product => {
                return (
                  <div className="productCardAdmin">
                    <div onClick={() => deleteProduct(product.id)} className="deleteProductAdmin">
                      <FontAwesomeIcon
                        icon={faWindowClose}
                        className="closeIconAdmin fa-2x"
                      />
                      <p>Delete this product</p>
                    </div>
                    <h3>Name: {product.name}</h3>
                    <p>Price: {product.price} €</p>
                    <p>Description:</p>
                    <p>{product.description}</p>
                    <img
                      className="imageProductAdmin"
                      src={require(`../images/beers_products/${product.image}`)}
                      alt="product"
                    />
                  </div>
                );
              })
            )
            :
            (
              messages.map((message) => {
                return (
                  <div className="messageCardAdmin">
                    <h2>{message.title}</h2>
                    <p>{message.mail}</p>
                    <p>{message.name}</p>
                    <p>{message.firstname}</p>
                    <p>{message.body}</p>
                  </div>
                )
              })
            )
          : null}
      </div>
    </div>
  );
};

export default Admin;
