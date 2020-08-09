import React from "react";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";

const App = () => {
  return (
    <div className="grid-container">
      <header>
        <a href="/">Shopping Home</a>
      </header>
      <main>
        <div className="content">
          <div className="main-content">
            <Filter />
            <Products />
          </div>
          <div className="sidebar">
            <Cart />
          </div>
        </div>
      </main>
      <footer>&copy; Copyright All Rights Reserved</footer>
    </div>
  );
};

export default App;
