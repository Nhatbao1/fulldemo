import { PASSWORD } from '../action/userAction';
const INITIAL_STATE = {
    password: '',
};
const passwordReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PASSWORD:
            return {
                ...state,
                password: action?.payload
            };
        default: return state;
    }
};

export default passwordReducer;