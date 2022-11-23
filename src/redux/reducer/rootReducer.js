import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import userReducer from './userReducer';
import nameReducer from './nameReducer';
import passwordReducer from './passwordReducer';
const rootReducer = combineReducers({
    counter: counterReducer,
    user: userReducer,
    name: nameReducer,
    pass: passwordReducer,
    // user dinh nghia mot cai ten cua state cua redux
});

export default rootReducer;