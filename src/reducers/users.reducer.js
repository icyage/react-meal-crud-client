import { Actions } from '../actions';

const initialState = { users: [] };

const usersReducer = (state = initialState, action) => {
    let index;
    let { users } = state;
    switch (action.type) {
    case Actions.LOGOUT:
        return initialState;
    case Actions.LOAD_USERS_SUCCESS:
        users = action.payload.users;
        break;
    case Actions.ADD_ONE_USER_SUCCESS:
        users.push(action.payload.user);
        break;
    case Actions.UPDATE_ONE_USER_SUCCESS:
        index = users.findIndex((m) => m.id === action.payload.user.id);
        if (index >= 0) {
            const newUser = {
                ...users[index],
                ...action.payload.user
            };
            users.splice(index, 1, newUser);
        }
        break;
    case Actions.DELETE_ONE_USER_SUCCESS:
        index = users.findIndex((m) => m.id === action.payload.userId);
        if (index >= 0) {
            users.splice(index, 1);
        }
        break;
    case Actions.DELETE_ALL_USERS:
        users = [];
        break;
    default:
        return state;
    }
    return {
        ...state,
        users
    };
};

export default usersReducer;