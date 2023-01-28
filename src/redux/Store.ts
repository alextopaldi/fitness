import { combineReducers, createStore } from "redux";
import { caloriesReducer } from "./CaloriesReducer";

const rootReduser = combineReducers({
    calories : caloriesReducer
})

export const store = createStore(rootReduser)