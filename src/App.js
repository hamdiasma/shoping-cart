import React from "react";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
     
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    
    };
  }

  createOrder = (order) => {
    alert("need to save order for " + order);
  };

  removeCart = (cart) => {
    const cartItems = this.state.cartItems.filter(
      (item) => item._id !== cart._id
    );

    this.setState({ cartItems });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  addToCart = (product) => {
    const cartItems = this.state.cartItems;
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.counter++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...product, counter: 1 });
    }
    this.setState({ cartItems });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  render() {
    const { size, sort, cartItems } = this.state;
    return (
      <div className="grid-container">
        <header>
          <a href="/">Shopping Home</a>
        </header>
        <main>
          <div className="content">
            <div className="main-content">
              <Filter />
              <Products addToCart={this.addToCart} />
            </div>
            <div className="sidebar">
              <Cart
                cartItems={cartItems}
                removeCart={this.removeCart}
                createOrder={this.createOrder}
              />
            </div>
          </div>
        </main>
        <footer>&copy; Copyright All Rights Reserved</footer>
      </div>
    );
  }
}

export default App;
