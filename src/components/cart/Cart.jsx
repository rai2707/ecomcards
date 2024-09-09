import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Cart.scss";
import EmptyCart from "../emptycart/Empty";
import { decrementQuantity, incrementQuantity, removeFromCart } from "../../redux/Action";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [showPinCodeInput, setShowPinCodeInput] = useState(false);
  const [pincode, setPincode] = useState("");
  const [deliveryAvailable, setDeliveryAvailable] = useState(null);
  const validPincodes = [497339, 560068, 470023, 201206, 490026, 110012];
  const handleRemove = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleDecrement = (item) => {
    dispatch(decrementQuantity(item));
  };

  const handleIncrement = (item) => {
    dispatch(incrementQuantity(item));
  };

  const handlePincodeSubmit = () => {
    if (validPincodes.includes(parseInt(pincode))) {
      setDeliveryAvailable(true);
    } else {
      setDeliveryAvailable(false);
    }
    setShowPinCodeInput(false);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <EmptyCart />
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-left">
        <div className="cart-address">
          <p>From Saved Addresses</p>
          {setShowPinCodeInput ? (
            <div className="pincode-input">
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter Pincode"
                className="pincode-textbox"
              />
              <button onClick={handlePincodeSubmit} className="pincode-submit">
                Submit
              </button>
            </div>
          ) : (
            <button
              className="enter-pincode"
              onClick={() => setShowPinCodeInput(true)}
            >
              Enter Delivery Pincode
            </button>
          )}

          {deliveryAvailable === true && (
            <p className="delivery-success">Delivery available for {pincode}</p>
          )}
          {deliveryAvailable === false && (
            <p className="delivery-failure">Delivery not available for {pincode}</p>
          )}
        </div>

        {cartItems.map((item, index) => (
          <div key={index} className="cart-item">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="cart-item-image"
            />
            <div className="cart-item-details">
              <h4>{item.title}</h4>
              <p>
                Size: {item.dimensions.width}, {item.dimensions.height},{" "}
                {item.dimensions.depth}
              </p>
              <p>Seller: {item.brand}</p>
              <p className="cart-item-price">
                ₹{item.price}{" "}
                <span className="cart-item-discount">
                  {item.discountPercentage}% Off
                </span>
              </p>
              <p>Delivery by Tomorrow, Free</p>
              <div className="cart-item-actions">
                <button className="cart-item-save">SAVE FOR LATER</button>
                <button className="cart-item-remove" onClick={() => handleRemove(item)}>REMOVE</button>
              </div>
            </div>
            <div className="cart-item-quantity">
              <button onClick={() => handleDecrement(item)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncrement(item)}>+</button>
            </div>
          </div>
        ))}

        <div className="cart-actions">
          <Link to={"/orderplaced"}>
            <button className="place-order">PLACE ORDER</button>
          </Link>
        </div>
      </div>

      <div className="cart-right">
        <div className="price-details">
          <h4>PRICE DETAILS</h4>
          <div className="price-breakdown">
            <p>
              Price ({cartItems.length} items)
              <span>
                ₹
                {cartItems
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </span>
            </p>
            <p>
              Discount{" "}
              <span className="discount">
                -₹
                {cartItems
                  .reduce(
                    (total, item) =>
                      total +
                      ((item.price * item.discountPercentage) / 100) * item.quantity, 0
                  )
                  .toFixed(2)}
              </span>
            </p>
            <p>
              Platform Fee <span>₹3</span>
            </p>
            <p>
              Delivery Charges <span className="free">Free</span>
            </p>
          </div>
          <div className="total-amount">
            <p>
              Total Amount{" "}
              <span>
                ₹
                {(
                  cartItems.reduce(
                    (total, item) =>
                      total +
                      item.price *
                        (1 - item.discountPercentage / 100) *
                        item.quantity,
                    0
                  ) + 3
                ).toFixed(2)}
              </span>
            </p>
          </div>
          <p className="savings">
            You will save ₹
            {cartItems
              .reduce(
                (total, item) =>
                  total +
                  ((item.price * item.discountPercentage) / 100) *
                    item.quantity,
                0
              )
              .toFixed(2)}{" "}
            on this order
          </p>
        </div>
      </div>
    </div>
  );
}
// Avoid toFixed in production
// Remove and save for later used as button
