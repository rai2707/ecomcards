import React from "react";
import "./OrderPlaced.scss";
import { Link } from "react-router-dom";
import { FaCircleCheck } from "react-icons/fa6";

export default function OrderPlaced() {
  return (
    <div className="order-placed">
      <div className="checkmark-icon">
      <FaCircleCheck />
      </div>
      <h2>Order Placed!</h2>
      <Link to={'/'}><button>Okay</button></Link>
    </div>
  );
}
