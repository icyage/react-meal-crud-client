import { put, takeLatest, all, call } from 'redux-saga/effects';

import MealService from '../services/meal.service';
import { showErrorNotification, showSuccessNotification } from '../services/utils.service';
import { Actions, loadMealsSuccess, addOneMealSuccess, updateOneMealSuccess, deleteOneMealSuccess } from '../actions';

function* loadMeals({ payload }) {
    const result = yield call(MealService.readMeals, payload.token, payload.filter);
    if (result.success) {
        yield put(loadMealsSuccess(result));
    } else {
        yield call(showErrorNotification, result.error);
    }
}

function* addOneMeal({ payload }) {
    const result = yield call(MealService.createMeal, payload.token, payload.meal);
    if (result.success) {
        yield put(addOneMealSuccess(result));
        yield call(showSuccessNotification, 'Successfully created a meal');
    } else {
        yield call(showErrorNotification, result.error);
    }
}

function* updateOneMeal({ payload }) {
    const result = yield call(MealService.updateMeal, payload.token, payload.mealId, payload.meal);
    if (result.success) {
        yield put(updateOneMealSuccess(result));
        yield call(showSuccessNotification, 'Successfully updated a meal');
    } else {
        yield call(showErrorNotification, result.error);
    }
}

function* deleteOneMeal({ payload }) {
    const result = yield call(MealService.deleteMeal, payload.token, payload.mealId);
    if (result.success) {
        yield put(deleteOneMealSuccess({ ...payload, ...result }));
        yield call(showSuccessNotification, 'Successfully deleted a meal');
    } else {
        yield call(showErrorNotification, result.error);
    }
}

function* watch() {
    yield takeLatest(Actions.LOAD_MEALS, loadMeals);
    yield takeLatest(Actions.ADD_ONE_MEAL, addOneMeal);
    yield takeLatest(Actions.UPDATE_ONE_MEAL, updateOneMeal);
    yield takeLatest(Actions.DELETE_ONE_MEAL, deleteOneMeal);
}

export default function* userSaga() {
    yield all([
        watch()
    ]);
}