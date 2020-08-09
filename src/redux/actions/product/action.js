import {
  FETCH_PRODUCTS,
  FILTER_PRODUCTS_BY_SIZE,
  FILTER_PRODUCTS_BYP_RICE,
} from "./types";

export const fetchProducts = () => async (dispatch) => {
  const res = await fetch("/api/products");
  const data = await res.json();
  dispatch({
    type: FETCH_PRODUCTS,
    payload: data,
  });
};

export const filterProducts = (products, size) => (dispatch) => {
  dispatch({
    type: FILTER_PRODUCTS_BY_SIZE,
    payload: {
      size,
      items:
        size === ""
          ? products
          : products.filter(
              (a) => a.availableSizes.indexOf(size.toUpperCase()) >= 0
            ),
    },
  });
};

export const sortProducts = (filteredProducts, sort) => (dispatch) => {
  const sortedProductes = filteredProducts.slice();
  if (sort === "") {
    sortedProductes.sort((a, b) => (a._id > b._id ? 1 : -1));
  } else {
    sortedProductes.sort((a, b) =>
      sort === "lowest"
        ? a.price > b.price
          ? 1
          : -1
        : a.price < b.price
        ? 1
        : -1
    );
  }

  dispatch({
    type: FILTER_PRODUCTS_BYP_RICE,
    payload: {
      sort,
      items: sortedProductes,
    },
  });
};
