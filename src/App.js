import React from "react";
import Body from "./components/Body";
import Header from "./components/header/Header";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SingleProduct from "./components/singleProduct/SingleProduct";
import Cart from "./components/cart/Cart";
import OrderPlaced from "./components/orderPlaced/OrderPlace";

const App = () => {
  return (
    <div>
      <Router>
      <Header />
        <Routes>
          {/* <Route path="/header" element={<Header />} exact="true"></Route> */}
          <Route path="/" element={<Body />}></Route>
          <Route path="/singleproduct" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orderplaced" element={<OrderPlaced />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
