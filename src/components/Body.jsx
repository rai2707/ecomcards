import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchProducts, selectedProduct } from "../redux/Action";
import "./Body.scss";
import { AiOutlineHeart } from "react-icons/ai";
import Loader from "./LoaderComponent";
import { Link } from "react-router-dom";

export default function Body() {
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector((state) => state);
  console.log(products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  console.log(products);
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const handleCardClick = (product) => {
    dispatch(selectedProduct(product));
  };

  return (
    <div className="product-list">
      {loading && (
        <div className="loader-container">
          <Loader />
        </div>
      )}
      {error && <p>{error}</p>}
      {products.map((ele) => (
        <div className="product-card" key={ele.id}>
          <Link className="link" to={"/singleproduct"}>
            <div
              className="product-card-content"
              onClick={() => handleCardClick(ele)}
            >
              <div className="wishlist-icon">
                <AiOutlineHeart />
              </div>
              <img
                className="product-image"
                src={ele.images[0]}
                alt={ele.title}
              />
              <p className="product-title">{ele.title}</p>
              <p className="product-price">₹{ele.price}</p>
              <p className="product-discounted-price">
                ₹{(ele.price * (1 - ele.discountPercentage / 100)).toFixed(2)}
              </p>
              <p className="product-discount">
                {Math.round(ele.discountPercentage)}% OFF
              </p>
            </div>
          </Link>
          <div className="add-to-cart-container">
            <button
              className="add-to-cart-btn"
              onClick={() => handleAddToCart(ele)}
            >
              Add
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
