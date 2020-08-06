import React from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: "",
    };
  }

  sortProducts = (e) => {
    const sort = e.target.value;
    console.log(e.target.value);
    this.setState({
      sort: sort,
      products: this.state.products
        .slice()
        .sort((a, b) =>
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
    const { size, sort } = this.state;
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
              <Products products={this.state.products} />
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
