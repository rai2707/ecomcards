import React from 'react';
import './EmptyCart.scss'; // Import the SASS file

const EmptyCart = () => {
  return (
    <div className="empty-cart">
      <img 
        src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" 
        alt="Empty Cart" 
        className="empty-cart__image" 
      />
      <h2 className="empty-cart__title">Your cart is empty!</h2>
      <p className="empty-cart__subtitle">
        Explore our wide selection and find something you like
      </p>
    </div>
  );
}

export default EmptyCart;
