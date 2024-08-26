import React, { useState, useEffect } from "react";
import "./Header.scss";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/Action";

function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cart);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  console.log(searchQuery)

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const product = products.find((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) 
      );
      setSelectedProduct(product || null);
    } else {
      setSelectedProduct(null);
    }
  }, [searchQuery, products]);
  console.log("selected==",selectedProduct);

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
        <FaSearch className="search" />
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

      {selectedProduct && (
        <div className="product-card">
          <Link to={`/product/${selectedProduct.id}`} key={selectedProduct.id}>
            <img src={selectedProduct.images[0]} alt={selectedProduct.title} className="product-image" />
            <div className="product-info">
              <p className="product-title">{selectedProduct.title}</p>
              <p className="product-price">₹{selectedProduct.price}</p>
              <p className="product-discounted-price">
                ₹{(selectedProduct.price * (1 - selectedProduct.discountPercentage / 100)).toFixed(2)}
              </p>
              <p className="product-discount">
                {Math.round(selectedProduct.discountPercentage)}% OFF
              </p>
            </div>
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
