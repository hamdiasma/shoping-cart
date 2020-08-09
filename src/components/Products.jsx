import React, { Component } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import { fetchProducts } from "../redux/actions/product/action";
import Modal from "react-modal";
import { connect } from "react-redux";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
    };
  }
  componentDidMount() {
    this.props.fetchProducts();
  }
  openModal = (product) => {
    this.setState({ product });
  };

  closeModal = () => {
    this.setState({
      product: null,
    });
  };

  render() {
    const { products, addToCart } = this.props;

    return (
      <div>
        <Fade bottom cascade>
          <ul className="products">
            {products ? (
              products.map((product) => (
                <li key={product._id}>
                  <div className="product">
                    <a href={`#${product._id}`}>
                      <img
                        src={product.image}
                        alt={product.title}
                        onClick={() => this.openModal(product)}
                      />
                      <p>{product.title}</p>
                    </a>
                    <div className="product-footer">
                      <div className="price">
                        {" "}
                        {formatCurrency(product.price)}
                      </div>
                      <button
                        className="button primary"
                        onClick={() => addToCart(product)}
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <div>Loading..</div>
            )}
          </ul>
        </Fade>
        {this.state.product && (
          <Modal isOpen={true} key={this.state.product._id}>
            <Zoom cascade>
              <button className="close-btn" onClick={() => this.closeModal()}>
                close
              </button>{" "}
              <div className="product-details">
                <div className="image-modal">
                  <img
                    src={this.state.product.image}
                    alt={this.state.product.title}
                  />
                </div>

                <div className="product-description">
                  <p className="title">
                    <strong>{this.state.product.title}</strong>
                  </p>
                  <p>
                    <strong> description : </strong>
                    <br />
                    {this.state.product.description}
                  </p>
                  <p>
                    <strong>Available Sizes</strong> <br />
                    {this.state.product.availableSizes.map((x, i) => (
                      <span key={i}>
                        {" "}
                        <button className="button">{x}</button>
                      </span>
                    ))}
                  </p>

                  <div className="modal-footer">
                    <div className="prod-price">
                      <strong>Price: </strong>
                      {formatCurrency(this.state.product.price)}
                    </div>

                    <button
                      className="button primary"
                      onClick={() => {
                        addToCart(this.state.product);
                        this.closeModal();
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    products: state.products.filtredItems,
  }),
  { fetchProducts }
)(Products);
