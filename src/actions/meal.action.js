import Actions from './action.type';
export const loadMeals = (payload) => ({
    type: Actions.LOAD_MEALS,
    payload
});

export const addOneMeal = (payload) => ({
    type: Actions.ADD_ONE_MEAL,
    payload
});

export const updateOneMeal = (payload) => ({
    type: Actions.UPDATE_ONE_MEAL,
    payload
});

export const deleteOneMeal = (payload) => ({
    type: Actions.DELETE_ONE_MEAL,
    payload
});

export const deleteAllMeals = () => ({
    type: Actions.DELETE_ALL_MEALS,
});

export const loadMealsSuccess = (payload) => ({
    type: Actions.LOAD_MEALS_SUCCESS,
    payload
});

export const addOneMealSuccess = (payload) => ({
    type: Actions.ADD_ONE_MEAL_SUCCESS,
    payload
});

export const updateOneMealSuccess = (payload) => ({
    type: Actions.UPDATE_ONE_MEAL_SUCCESS,
    payload
});

export const deleteOneMealSuccess = (payload) => ({
    type: Actions.DELETE_ONE_MEAL_SUCCESS,
    payload
});
