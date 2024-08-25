import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./SingleProduct.scss";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { addToCart } from "../../redux/Action";

export default function SingleProduct() {
  const selectedProduct = useSelector((state) => state.selectedProduct);
  const dispatch = useDispatch();
  if (!selectedProduct) return <p>No product selected.</p>;
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = Math.round(rating); 
    const emptyStars = totalStars - filledStars;

    return (
      <>
        {[...Array(filledStars)].map((_, index) => (
          <FaStar key={`filled-${index}`} className="star filled" />
        ))}
        {[...Array(emptyStars)].map((_, index) => (
          <FaRegStar key={`empty-${index}`} className="star empty" />
        ))}
      </>
    );
  };

  return (
    <div className="product-container">
      <div className="product-image">
        <img src={selectedProduct.images[0]} alt={selectedProduct.title} />

        {/* Buttons moved below the image */}
        <div className="buttons">
          <button className="buy-now">Buy Now</button>
          <button className="add-to-cart" onClick={() => handleAddToCart(selectedProduct)}>Add to Cart</button>
        </div>
      </div>

      <div className="product-details">
        <h2 className="product-title">{selectedProduct.title}</h2>
        <p className="product-brand">Brand: {selectedProduct.brand}</p>
        <p className="product-price">
          ₹{selectedProduct.price}
          <span className="discount-percentage">
            {selectedProduct.discountPercentage}% OFF
          </span>
        </p>
        <p className="product-description">{selectedProduct.description}</p>
        <p className="product-rating">
          Rating: {selectedProduct.rating} <FaStar />
        </p>
        <p className="product-reviews">Reviews:</p>
        <ul className="reviews-list">
          {selectedProduct.reviews.map((review, index) => (
            <li key={index}>
              <strong>{review.reviewerName}</strong>: {review.comment}
              <div className="review-stars">{renderStars(review.rating)}</div>
            </li>
          ))}
        </ul>

        <p className="product-stock">
          Availability: {selectedProduct.availabilityStatus}
        </p>

        {/* Offers Section */}
        <div className="offers">
          <h4>Available Offers</h4>
          <ul>
            <li>Get 10% off on first purchase</li>
            <li>5% Cashback on ABC Credit Card</li>
          </ul>
        </div>

        <Link className="back-link" to="/">
          Back To Home
        </Link>
      </div>
    </div>
  );
}
