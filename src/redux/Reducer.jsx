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
        products: [],
        error: action.payload,
      };
    case "ADD_TO_CART":
      const product = action.payload;
      const existingProduct = state.cart.findIndex(
        (item) => item.id === product.id
      );
      if (existingProduct > -1) {
        return {
          ...state,
          cart: state.cart.map((item, index) =>
            index === existingProduct
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...product, quantity: 1 }],
        };
      }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case "DECREMENT_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(item.quantity - 1, 1) } // Ensure quantity is at least 1
            : item
        ),
      };
    case "INCREMENT_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
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
