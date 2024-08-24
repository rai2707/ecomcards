export const RequestData = "REQUEST_DATA";
export const SuccessData = "SUCCESS_DATA";
export const FailureData = "FAILURE_DATA";
export const AddToCart = "ADD_TO_CART";
export const SetSelectedProcuct = "SET_SELECTED_PRODUCT";

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
export const addToCart = (product) =>{
  return{
    type: "ADD_TO_CART",
    payload: product
  }
}
export const selectedProduct = (product) =>{
  return{
    type: "SET_SELECTED_PRODUCT",
    payload: product
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
