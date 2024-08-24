import { createStore,applyMiddleware } from "redux"
import { Reducer } from "./Reducer"
import {thunk} from "redux-thunk"
export let store= createStore(Reducer,applyMiddleware(thunk))