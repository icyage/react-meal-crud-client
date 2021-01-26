import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './auth.reducer';
import mealReducer from './meal.reducer';
import usersReducer from './users.reducer';

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    auth: persistReducer(persistConfig, authReducer),
    meals: mealReducer,
    users: usersReducer
});

export default rootReducer;
