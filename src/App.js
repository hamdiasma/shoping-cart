import React from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      cartItems: localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")):[],
      size: "",
      sort: "",
    };
  }

  createOrder=(order)=>{
    alert("need to save order for " + order)
  }

  removeCart = (cart) => {
    const cartItems = this.state.cartItems.filter(
      (item) => item._id !== cart._id
    )
 

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

  sortProducts = (e) => {
    const sort = e.target.value;
    console.log(e.target.value);
    this.setState({
      sort: sort,
      products: this.state.products.sort((a, b) =>
        sort === "lowest"
          ? a.price > b.price
            ? 1
            : -1
          : sort === "highest"
          ? a.price < b.price
            ? 1
            : -1
          : a._id > b._id
          ? 1
          : -1
      ),
    });
   
  };
  filterProducts = (e) => {
    console.log(e.target.value);
    if (e.target.value === "") {
      this.setState({
        products: data.products,
        size: e.target.value,
      });
    } else {
      this.setState({
        size: e.target.value,
        products: data.products.filter(
          (product) =>
            product.availableSizes.indexOf(e.target.value.toUpperCase()) >= 0
        ),
      });
    }
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
              <Filter
                sort={sort}
                size={size}
                count={this.state.products.length}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              />
              <Products
                products={this.state.products}
                addToCart={this.addToCart}
              />
            </div>
            <div className="sidebar">
              <Cart cartItems={cartItems} removeCart={this.removeCart} createOrder={this.createOrder}/>
            </div>
          </div>
        </main>
        <footer>&copy; Copyright All Rights Reserved</footer>
      </div>
    );
  }
}

export default App;
