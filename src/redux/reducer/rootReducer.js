import { combineReducers } from 'redux';
import userReducer from './userReducer';
import nameReducer from './nameReducer';
import passwordReducer from './passwordReducer';
const rootReducer = combineReducers({
    user: userReducer,
    name: nameReducer,
    pass: passwordReducer,
});

export default rootReducer;