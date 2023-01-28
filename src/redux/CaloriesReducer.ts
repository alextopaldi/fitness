const defaultState = {
    calories: 0,
    calorie: [],
    dish: [],
    dishes: [{
        calories: 0,
        eating: '',
        dish: ''
    }]
  }
  
  export function caloriesReducer(state = defaultState, action: { type: string; payload: any; }) {
    switch(action.type) {
      case "ADD_CALORIES":
        return {...state, calories: state.calories + action.payload}
      case "ADD_DISH":
        return {...state, calorie: [...state.calorie, action.payload]}
      case "ADD_DISHES":
        return{...state, dishes: [...state.dishes, action.payload]}
      default: 
        return state
    }
  
  }