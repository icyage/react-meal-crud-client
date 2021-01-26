import Actions from './action.type';
export const loginUser = (payload) => ({
    type: Actions.LOGIN,
    payload,
});

export const logout = () => ({
    type: Actions.LOGOUT,
});

export const registerUser = (payload) => ({
    type: Actions.REGISTER,
    payload
});

export const loadSelf = (payload) => ({
    type: Actions.LOAD_SELF,
    payload
});

export const loginUserSuccess = (payload) => ({
    type: Actions.LOGIN_SUCCESS,
    payload,
});

export const registerUserSuccess = (payload) => ({
    type: Actions.LOGIN,
    payload
});

export const loadSelfSuccess = (payload) => ({
    type: Actions.LOAD_SELF_SUCCESS,
    payload
});
