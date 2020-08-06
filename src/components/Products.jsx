import React, { Component } from "react";
import formatCurrency from "../util";

class Products extends Component {
  render() {
    const { products ,addToCart} = this.props;
    return (
      <div>
        <ul className="products">
          {products.map((product) => (
            <li key={product._id}>
              <div className="product">
                <a href={`#${product._id}`}>
                  <img src={product.image} alt={product.title} />
                  <p>{product.title}</p>
                </a>
                <div className="product-footer">
                  <div className="price"> {formatCurrency(product.price)}</div>
                  <button className="button primary" onClick={()=>addToCart(product)}>ADD TO CART</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Products;
