import { useState } from "react";
import "../Auth/Login.scss"
import { NavLink, useNavigate } from "react-router-dom";
import { postLogin } from "../../service/apiServices";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { doChange, doLogin } from "../../redux/action/userAction"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import Language from "../Header/Language";
const Login = (props) => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState();
    const handleGoToHomePage = () => {
        navigate('/')
    }
    const dispatch = useDispatch();
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    }
    const handleLogin = async () => {
        // validate data
        const isValidEmial = validateEmail(email);
        if (!isValidEmial) {
            toast.error(' Email not valid', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            // hoac toast.erros
            return; // -> khong chay code o duoi
        }
        if (!password) {
            toast.error('Password not required');
            return;
        }
        setIsLoading(true);
        // submit login
        let res = await postLogin(email, password)
        if (res && res.EC === 0) {
            toast.success("Login Success", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            dispatch(doLogin(res));
            dispatch(doChange(res));
            setIsLoading(false);
            navigate('/');
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            setIsLoading(false);
        }
    }
    const handleKeyOut = (event) => {
        if (event.key === "Enter") {
            handleLogin();
        }
    }
    return (
        <div className="login-container">
            <div className="header">
                <p>Don't have an account yet?</p>
                <button className="btn btn-outline-secondary" onClick={() => { navigate('/register') }}>Sign up</button>
                <Language/>
            </div>
            <div className="title col-4 mx-auto">
                NhatBaoIT
            </div>
            <div className="welcome col-4 mx-auto"> Hello, who’s this?</div>
            <div className="content-form col-4 mx-auto" >
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type={"email"}
                        className="form-control"
                        value={email}
                        onChange={(event) => { setEmail(event.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type={"password"}
                        className="form-control"
                        value={password}
                        onChange={(event) => { setPassword(event.target.value) }}
                        onKeyDown={(event) => handleKeyOut(event)}
                    />
                </div>
                <span>Forgot password?</span>
                <div className="footer">
                    <button onClick={() => { handleLogin() }} disabled={isLoading} >
                        {isLoading === true && <AiOutlineLoading3Quarters className="loader-icon" />}
                        <span>Log in to NhatBaoIT</span>
                    </button>
                </div>
                <div className="text-center" onClick={() => { handleGoToHomePage() }} >
                    Go to HomePage
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}
export default Login;
// sang index dinh nghia no 1 route o trong routes kh lq den cac route khac de tranh dung chung du lieu