
import { act } from '@testing-library/react';
import { INCREMENT, DECREMENT } from '../action/counterAction';
import { FETCH_USER_LOGIN_SUCCESS } from '../action/userAction'
import { USER_LOGOUT_SUCCESS } from '../action/userAction';
const INITIAL_STATE = {
    account: {
        access_token: '',
        refresh_token: '',
        username: '',
        image: '',
        role: '',
        email: '',
    },
    isAuthenticated: false
    // isAuthenticated de kiem tra nguoi dung co dang nhap chua
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCESS:
            return {
                ...state,
                account: {
                    access_token: action?.payload?.DT?.access_token,
                    // ?. de neu DT bi undefind de tranh fgay ra bug
                    refresh_token: action?.payload?.DT?.refresh_token,
                    username: action?.payload?.DT?.username,
                    image: action?.payload?.DT?.iamge,
                    role: action?.payload?.DT?.role,
                    email: action?.payload?.DT?.email,
                },
                isAuthenticated: true
                // coppy lai state dam bao state truoc do da co roi ->tiep tuc ghi de len
                // copy lai state ghi de len bien account da khai bao tren INITIAL_STATE
            };
        case USER_LOGOUT_SUCCESS:
            return {
                ...state,
                account: {
                    access_token: '',
                    refresh_token: '',
                    username: '',
                    image: '',
                    role: '',
                    email: '',
                },
                isAuthenticated: false
            };
        default: return state;
    }
};

export default userReducer;