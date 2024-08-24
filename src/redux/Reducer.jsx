const initialState = {
  loading: false,
  products: [],
  cart: [],
  selectedProduct: null,
  error: "",
};

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_DATA":
      return {
        ...state,
        loading: true,
      };
    case "SUCCESS_DATA":
      return {
        ...state,
        loading: false,
        products: action.payload,
        error: "",
      };
    case "FAILURE_DATA":
      return {
        loading: false,
        products:[],
        error: action.payload,
      };
      case "ADD_TO_CART":	
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
      case "SET_SELECTED_PRODUCT":
      return {
        ...state,
        selectedProduct: action.payload,
      };
    default:
      return state;
  }
};
