const initialState = {
    data: []
}
console.log("reducer===",initialState.data)

export  function Reducer(state = initialState, action) {
  switch (action.type) {
    case "DATA":
      return action.data;
    default:
      return state;
  }
}
