export const FETCH_USER_LOGIN_SUCCESS = "FETCH_USER_LOGIN_SUCCESS";
export const USER_LOGOUT_SUCCESS = "FETCH_USER_LOGOUT_SUCCESS";
export const USER_NAME = "USER_NAME";
export const PASSWORD = "PASSWORD";
export const doLogin = (res) => {
    return {
        type: FETCH_USER_LOGIN_SUCCESS,
        payload: res
        // dang chuyen 1 action co ten la FETCH_USER_LOGIN_SUCCESS
        // luu pay load bang res => muon co data -> res.DT
    }
}
export const doLogout = () => {
    return {
        type: USER_LOGOUT_SUCCESS,
        // payload: res
        // dang chuyen 1 action co ten la FETCH_USER_LOGIN_SUCCESS
        // luu pay load bang res => muon co data -> res.DT
    }
}
export const doChange = (res) => {
    return {
        type: USER_NAME,
        payload: res,
    }
}
export const doPass = (password) => {
    return {
        type: PASSWORD,
        payload: password,
    }
}
