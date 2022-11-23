import { USER_NAME } from '../action/userAction';
const INITIAL_STATE = {
    username: '',
};
const nameReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_NAME:
            return {
                ...state,
                username: action?.payload?.DT?.username,
            };
        default: return state;
    }
};

export default nameReducer;