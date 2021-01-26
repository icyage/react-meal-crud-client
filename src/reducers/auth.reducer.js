import { Actions } from '../actions';

const initialState = { token: null, user: null };

const userReducer = (state = initialState, action) => {
    switch (action.type) {
    case Actions.LOGIN_SUCCESS:
        return {
            ...state,
            token: action.payload.token,
            user: action.payload.user,
        };
    case Actions.LOGOUT:
        return initialState;
    case Actions.LOAD_SELF_SUCCESS:
        return {
            ...state,
            user: action.payload.user,
        };
    case Actions.UPDATE_ONE_USER_SUCCESS:
        if(state.user.id === action.payload.user.id) {
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload.user,
                }
            };
        }
        break;
    case Actions.UPDATE_CALORIES:
        return {
            ...state,
            user: {
                ...state.user,
                calories: action.payload.calories
            }
        };
    default:
        return state;
    }
    return state;
};

export default userReducer;