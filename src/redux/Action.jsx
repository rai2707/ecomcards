export const datafetch = "DATA"
export function setData(data, dispatch){
    dispatch({type:"DATA", payload: data})
}