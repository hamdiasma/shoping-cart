import React, { Component } from "react";
import formatCurrency from "../util";
import shop from "../assets/shop.svg";
import Fade from "react-reveal/Fade";
import {removeCart} from "../redux/actions/cart/action"
import { connect } from "react-redux";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      name: "",
      adress: "",
      email: "",
    };
  }

  handelChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handelSubmit = (e) => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      adress: this.state.adress,
      cartItems: this.props.cartItems,
    };
    this.props.createOrder(order);
  };

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
          <Fade left cascade>
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
          </Fade>
        </div>
        <div>
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
              <button
                className="button primary"
                onClick={() =>
                  this.setState({ showForm: !this.state.showForm })
                }
              >
                Proceed
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        <div>
          <Fade right cascade when={this.state.showForm}>
            {this.state.showForm && cartItems.length ? (
              <div className="cart-checkout">
                <form onSubmit={this.handelSubmit}>
                  <label htmlFor="name">Name : </label>
                  <input
                    name="name"
                    type="text"
                    required
                    onChange={this.handelChange}
                  />
                  <label htmlFor="name">Email : </label>
                  <input
                    name="email"
                    type="email"
                    required
                    onChange={this.handelChange}
                  />
                  <label htmlFor="name">Adress : </label>
                  <input
                    name="adress"
                    type="text"
                    required
                    onChange={this.handelChange}
                  />
                  <button type="submit" className="button primary">
                    Checkout
                  </button>
                </form>
              </div>
            ) : (
              ""
            )}
          </Fade>
        </div>
      </div>
    );
  }
}
export default connect((state) => ({
  cartItems: state.cart.cartItems,
}),{removeCart})(Cart);
