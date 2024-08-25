import React, { useState, useEffect } from "react";
import "./Header.scss";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, selectedProduct } from "../../redux/Action";

function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    const product = products.find((product) =>
      product.title.toLowerCase() !== searchQuery.toLowerCase()
    );
    if (product) {
      dispatch(selectedProduct(product));
    }
  };

  return (
    <header className="header">
      <Link to={'/'}>
        <div className="logo">
          <img
            src="https://www.jiomart.com/assets/ds2web/images/Jiomart-logo-ds2.0.svg?v=24"
            alt="JioMart"
          />
        </div>
      </Link>
      <div className="location">
        <i className="fas fa-map-marker-alt"></i>
        <span>Deliver to Mumbai 400020</span>
      </div>
      <div className="search-bar">
        <FaSearch className="search" onClick={handleSearch} />
        <input
          type="text"
          placeholder="Search JioMart"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="nav-icons">
        <Link to={"/cart"}>
          <FaCartShopping className="cart" />
          {cartItems?.length > 0 && (
            <span className="cart-count">{cartItems?.length}</span>
          )}
        </Link>
        <div className="sign-in">
          <FaUser className="user" />
          Sign In
        </div>
      </div>
    </header>
  );
}

export default Header;
