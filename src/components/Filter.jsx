import React, { Component } from "react";

class Filter extends Component {
  render() {
    const { count, sort, size, filterProducts, sortProducts } = this.props;
    return (
      <div className="filter">
        <div className="filter-count">{count} Products</div>
        <div className="filter-sort">
          Order by price
          <select value={sort} onChange={sortProducts}>
            <option value="">Select</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>{" "}
        </div>
        <div className="filter-size">
          filter by size{" "}
          <select value={size} onChange={filterProducts}>
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
export default Filter;
