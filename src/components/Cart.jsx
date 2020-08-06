import React, { Component } from "react";
import formatCurrency from "../util";
import shop from "../assets/shop.svg";

class Cart extends Component {
  render() {
    const { cartItems, removeCart } = this.props;
    return (
      <div>
        {cartItems.length ? (
          <div className="cart cart-header">
            You Have <b>{cartItems.length}</b> articles{" "}
          </div>
        ) : (
          <div className="cart cart-header">Cart is empty </div>
        )}
        <div className="basket">
          {cartItems.length ? (
            <ul className="cart-items">
              {cartItems.map((cart) => (
                <li className="cart-list" key={cart._id}>
                  <div>
                    <img src={cart.image} alt={cart.title} />
                  </div>
                  <div>
                    {" "}
                    {formatCurrency(cart.price)} x {cart.counter}
                  </div>
                  <div className="right">
                    <button
                      className="btn-remove"
                      onClick={() => removeCart(cart)}
                    >
                      REMOVE
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="basket-empty">
              <p>Welcome to Online Shopping</p>
              <img className="basketlogo" src={shop} alt="" />
            </div>
          )}
        </div>
        {cartItems.length ? (
          <div className="total">
            <div>
              {" "}
              Total:{" "}
              {formatCurrency(
                cartItems.reduce(
                  (tot, current) => tot + current.price * current.counter,
                  0
                )
              )}
            </div>
            <button className="button primary">CHECKED</button>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default Cart;
