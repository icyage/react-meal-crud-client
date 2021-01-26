import Actions from './action.type';

export const loadUsers = (payload) => ({
    type: Actions.LOAD_USERS,
    payload
});

export const addOneUser = (payload) => ({
    type: Actions.ADD_ONE_USER,
    payload
});

export const updateOneUser = (payload) => ({
    type: Actions.UPDATE_ONE_USER,
    payload
});

export const deleteOneUser = (payload) => ({
    type: Actions.DELETE_ONE_USER,
    payload
});

export const deleteAllUsers = () => ({
    type: Actions.DELETE_ALL_USERS,
});

export const loadUsersSuccess = (payload) => ({
    type: Actions.LOAD_USERS_SUCCESS,
    payload
});

export const addOneUserSuccess = (payload) => ({
    type: Actions.ADD_ONE_USER_SUCCESS,
    payload
});

export const updateOneUserSuccess = (payload) => ({
    type: Actions.UPDATE_ONE_USER_SUCCESS,
    payload
});

export const deleteOneUserSuccess = (payload) => ({
    type: Actions.DELETE_ONE_USER_SUCCESS,
    payload
});
