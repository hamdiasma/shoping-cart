import React from "react";
import data from "./data.json";
import Products from "./components/Products";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: "",
    };
  }
  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">Shopping Home</a>
        </header>
        <main>
          <div className="content">
            <div className="main-content">
              <Products products={this.state.products}/>
            </div>
            <div className="sidebar">Carts</div>
          </div>
        </main>
        <footer>&copy; Copyright All Rights Reserved</footer>
      </div>
    );
  }
}

export default App;
