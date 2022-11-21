import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from "react-toastify";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
const ChangePassword = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [password, setPassword] = useState()
    return (
        <>
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
                <label>New Password(*)</label>
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
        </>
    );
}
export default ChangePassword;