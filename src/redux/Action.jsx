export const RequestData = "REQUEST_DATA";
export const SuccessData = "SUCCESS_DATA";
export const FailureData = "FAILURE_DATA";
export const AddToCart = "ADD_TO_CART";
export const SelectedProcuct = "SET_SELECTED_PRODUCT";
export const RemoveFromCart = "REMOVE_FROM_CART";
export const DecrementQuantity = "DECREMENT_QUANTITY";
export const IncrementQuantity = "INCREMENT_QUANTITY";

export const fetchProductsRequest = () => ({
  type: "REQUEST_DATA",
});
export const fetchProductsSuccess = (products) => ({
  type: "SUCCESS_DATA",
  payload: products,
});
export const fetchProductsError = (error) => ({
  type: "FAILURE_DATA",
  payload: error,
});
export const addToCart = (products) =>{
  return{
    type: "ADD_TO_CART",
    payload: products
  }
}
export const removeFromCart = (product) => ({
  type: RemoveFromCart,
  payload: product,
});

export const decrementQuantity = (product) => ({
  type: DecrementQuantity,
  payload: product,
});

export const incrementQuantity = (product) => ({
  type: IncrementQuantity,
  payload: product,
});
export const selectedProduct = (products) =>{
  return{
    type: "SET_SELECTED_PRODUCT",
    payload: products
  }
}
export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch(fetchProductsRequest());
    try {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      dispatch(fetchProductsSuccess(data.products));
      console.log(data);
    } catch (error) {
      dispatch(fetchProductsError(error.message));
    }
  };
};
