import { put, takeLatest, all, call } from 'redux-saga/effects';

import UserService from '../services/user.service';
import { showErrorNotification, showSuccessNotification } from '../services/utils.service';
import { Actions, loginUserSuccess, loadUsersSuccess, addOneUserSuccess, updateOneUserSuccess, deleteOneUserSuccess, loadSelfSuccess, logout } from '../actions';

function* registerUser({ payload }) {
    const result = yield call(UserService.register, payload);
    if (result.success) {
        yield put(loginUserSuccess(result));
    } else {
        yield call(showErrorNotification, result.error);
    }
}

function* loginUser({ payload }) {
    const result = yield call(UserService.login, payload);
    if (result.success) {
        yield put(loginUserSuccess(result));
    } else {
        yield call(showErrorNotification, result.error);
    }
}

function* loadSelf({ payload }) {
    const result = yield call(UserService.self, payload);
    if (result.success) {
        yield put(loadSelfSuccess(result));
    } else {
        yield call(showErrorNotification, result.error);
        yield put(logout());
    }
}

function* loadUsers({ payload }) {
    const result = yield call(UserService.readUsers, payload.token);
    if (result.success) {
        yield put(loadUsersSuccess(result));
    } else {
        yield call(showErrorNotification, result.error);
    }
}

function* addOneUser({ payload }) {
    const result = yield call(UserService.createUser, payload.token, payload.user);
    if (result.success) {
        yield put(addOneUserSuccess(result));
        yield call(showSuccessNotification, 'Successfully created a user');
    } else {
        yield call(showErrorNotification, result.error);
    }
}

function* updateOneUser({ payload }) {
    const result = yield call(UserService.updateUser, payload.token, payload.userId, payload.user);
    if (result.success) {
        yield put(updateOneUserSuccess(result));
        yield call(showSuccessNotification, 'Successfully updated user infos');
    } else {
        yield call(showErrorNotification, result.error);
    }
}

function* deleteOneUser({ payload }) {
    const result = yield call(UserService.deleteUser, payload.token, payload.userId);
    if (result.success) {
        yield put(deleteOneUserSuccess({ ...payload, ...result }));
        yield call(showSuccessNotification, 'Successfully deleted a user');
    } else {
        yield call(showErrorNotification, result.error);
    }
}

function* watch() {
    yield takeLatest(Actions.LOGIN, loginUser);
    yield takeLatest(Actions.REGISTER, registerUser);
    yield takeLatest(Actions.LOAD_SELF, loadSelf);
    yield takeLatest(Actions.LOAD_USERS, loadUsers);
    yield takeLatest(Actions.ADD_ONE_USER, addOneUser);
    yield takeLatest(Actions.UPDATE_ONE_USER, updateOneUser);
    yield takeLatest(Actions.DELETE_ONE_USER, deleteOneUser);
}

export default function* userSaga() {
    yield all([
        watch()
    ]);
}