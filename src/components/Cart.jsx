import React, { Component } from "react";
import formatCurrency from "../util";
import shop from "../assets/shop.svg";
import Fade from "react-reveal/Fade";
import { removeCart } from "../redux/actions/cart/action";
import { createOrder, clearOrder } from "../redux/actions/order/action";
import Modal from "react-modal";
import { connect } from "react-redux";
import Zoom from "react-reveal/Zoom";

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
      total: this.props.cartItems.reduce(
        (tot, current) => tot + current.price * current.counter,
        0
      ),
    };
    this.props.createOrder(order);
  };

  closeModal = () => {
    this.props.clearOrder();
  };

  render() {
    const { cartItems, removeCart, order } = this.props;
    console.log(cartItems)
    console.log(order)

    return (
      <div>
        {cartItems.length ? (
          <div className="cart cart-header">
            You Have <b>{cartItems.length}</b> articles{" "}
          </div>
        ) : (
          <div className="cart cart-header">Cart is empty </div>
        )}
        {order && (
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button className="close-btn" onClick={this.closeModal}>
                Close
              </button>
              <div className="order-details">
                <h3 className="success-message">Your Order has been placed </h3>
                <h4> Order : {order._id}</h4>
                <ul>
                  <li>
                    <div>
                      <div>
                        <strong>Name:</strong>
                      </div>
                      <div>{order.name}</div>
                    </div>
                    <div>
                      <div>
                        <strong>Email: </strong>
                      </div>
                      <div> {order.email}</div>
                    </div>
                    <div>
                      <div>
                        <strong>Date:</strong>
                      </div>
                      <div> {order.createdAt}</div>
                    </div>
                    <div>
                      <div>
                        <strong>Adress:</strong>
                      </div>
                      <div> {order.adress}</div>
                    </div>
                    <div>
                      <div>
                        {" "}
                        <strong>Total:</strong>
                      </div>
                      <div> {formatCurrency(order.total)}</div>
                    </div>
                    <div>
                      <div>
                        <strong> Products:</strong>
                      </div>

                      <div>
                        {order.cartItems.map((item) => (
                          <div>
                            {item.counter} X {item.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </Zoom>
          </Modal>
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
export default connect(
  (state) => ({
    cartItems: state.cart.cartItems,
    order: state.order.order,
  }),
  { removeCart, createOrder, clearOrder }
)(Cart);
