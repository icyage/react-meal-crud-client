import { Actions } from '../actions';

const initialState = { meals:[] };

const mealReducer = (state = initialState, action) => {
    let index;
    let { meals } = state;
    switch (action.type) {
    case Actions.LOGOUT:
        return initialState;
    case Actions.LOAD_MEALS_SUCCESS:
        meals = action.payload.meals;
        break;
    case Actions.ADD_ONE_MEAL_SUCCESS:
        meals.push(action.payload.meal);
        if (action.payload.meal.over) {
            meals.forEach((m) => {
                if (m.date === action.payload.meal.date && m.user === action.payload.meal.user) {
                    m.over = action.payload.meal.over;
                }
            });
        }
        break;
    case Actions.UPDATE_ONE_MEAL_SUCCESS: 
        index = meals.findIndex((m) => m.id === action.payload.meal.id);
        if (index >= 0) {
            const newMeal = {
                ...meals[index],
                ...action.payload.meal
            };
            if (newMeal.user !== meals[index].user) {
                if (newMeal.over) {
                    meals.forEach((m) => {
                        if (m.date === newMeal.date && m.user === newMeal.user) {
                            m.over = newMeal.over;
                        }
                    });
                }
                if (!newMeal.oldOver) {
                    meals.forEach((m) => {
                        if (m.date === newMeal.date && m.user === newMeal.oldUser) {
                            m.over = newMeal.oldOver;
                        }
                    });
                }
            } else {
                if (newMeal.over !== meals[index].over) {
                    meals.forEach((m) => {
                        if (m.date === newMeal.date && m.user === newMeal.user) {
                            m.over = newMeal.over;
                        }
                    });
                }
            }
            meals.splice(index, 1, newMeal);
        }
        break;
    case Actions.DELETE_ONE_MEAL_SUCCESS:
        index = meals.findIndex((m) => m.id === action.payload.mealId);
        if (index >= 0) {
            if (action.payload.over !== meals[index].over) {
                meals.forEach((m) => {
                    if (m.date === meals[index].date && m.user === meals[index].user) {
                        m.over = action.payload.over;
                    }
                });
            }
            meals.splice(index, 1);
        }
        break;
    case Actions.DELETE_ALL_MEALS:
        meals = [];
        break;
    default:
        return state;
    }
    return {
        ...state,
        meals
    };
};

export default mealReducer;