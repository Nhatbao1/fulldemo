import { useState } from "react";
import "../Auth/Register.scss"
import { NavLink, useNavigate } from "react-router-dom";
import { postRegister } from "../../service/apiServices";
import { ToastContainer, toast } from "react-toastify";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import Language from "../Header/Language";
const Register = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    }
    const handelRegister = async () => {
        const isValidEmial = validateEmail(email)
        if (!isValidEmial) {
            toast.error(toast.EM, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        if (!password) {
            toast.error('Password not required');
            return;
        }
        let res = await postRegister(email, password, username)
        if (res && res.EC === 0) {
            toast.success(res.EM)
            navigate('/users')
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM)
        }
    }
    return (
        <div className="login-container">
            <div className="header">
                <p>Don't have an account yet? <button className="btn btn-outline-secondary" onClick={() => { navigate('/login') }}>Log in</button></p>
                <Language />
            </div>
            <div className="title col-4 mx-auto">
                NhatBaoIT
            </div>
            <div className="welcome col-4 mx-auto"> Hello, who’s this?</div>
            <div className="content-form col-4 mx-auto" >
                <div className="form-group">
                    <label>Email(*)</label>
                    <input
                        type={"email"}
                        className="form-control"
                        value={email}
                        onChange={(event) => { setEmail(event.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Password(*)</label>
                    <input
                        type={isShowPassword ? "text" : "password"}
                        className="form-control"
                        value={password}
                        onChange={(event) => { setPassword(event.target.value) }} />
                    {isShowPassword ?
                        <span className="icons-eye"
                            onClick={() => setIsShowPassword(false)}>
                            <VscEye />
                        </span>
                        :
                        <span className="icons-eye"
                            onClick={() => setIsShowPassword(true)}>
                            <VscEyeClosed />
                        </span>

                    }
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type={"email"}
                        className="form-control"
                        value={username}
                        onChange={(event) => { setUsername(event.target.value) }}
                    />
                </div>
                <span>Forgot password?</span>
                <div>
                    <button onClick={() => { handelRegister() }}>Register to NhatBaoIT</button>
                </div>
                <div className="text-center" onClick={() => { navigate("/") }}>
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
export default Register;