import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import userReducer from './userReducer';
const rootReducer = combineReducers({
    counter: counterReducer,
    user: userReducer,
    // user dinh nghia mot cai ten cua state cua redux
});

export default rootReducer;