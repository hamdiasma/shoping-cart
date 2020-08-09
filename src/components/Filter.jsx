import React, { Component } from "react";
import { filterProducts, sortProducts } from "../redux/actions/product/action";
import { connect } from "react-redux";

class Filter extends Component {
  render() {
    const {
      products,
      sort,
      size,
      filtredProducts,
      filterProducts,
      sortProducts,
    } = this.props;
    return !filtredProducts ? (
      <div>Loading...</div>
    ) : (
      <div className="filter">
        <div className="filter-count">{filtredProducts.length} Products</div>
        <div className="filter-sort">
          Order by price{" "}
          <select
            value={sort}
            onChange={(e) => sortProducts(filtredProducts, e.target.value)}
          >
            <option value="">Latest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>{" "}
        </div>
        <div className="filter-size">
          filter by size{" "}
          <select
            value={size}
            onChange={(e) =>
              filterProducts(products, e.target.value)
            }
          >
            <option value="">ALL</option>
            <option value="x">XS</option>
            <option value="s">S</option>
            <option value="m">M</option>
            <option value="x">L</option>
            <option value="xl">XL</option>
            <option value="xxl">XXL</option>
          </select>{" "}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    size: state.products.size,
    sort: state.products.sort,
    products: state.products.items,
    filtredProducts: state.products.filtredItems,
  };
};

export default connect(mapStateToProps, {
  filterProducts,
  sortProducts,
})(Filter);
