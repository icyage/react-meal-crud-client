import { all } from 'redux-saga/effects';

import userSaga from './user.saga';
import mealSaga from './meal.saga';

export default function* rootSaga() {
    yield all([
        userSaga(),
        mealSaga()
    ]);
}