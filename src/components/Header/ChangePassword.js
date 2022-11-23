import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useSelector, useDispatch } from "react-redux";
import Button from 'react-bootstrap/Button';
import "./ChangePassword.scss";
import { postChangePassword } from "../../service/apiServices";
import { doPass } from "../../redux/action/userAction";
const ChangePassword = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowNewPassword, setIsShowNewPassword] = useState(false);
    const [password, setPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const passwordData = useSelector(state => state.pass.password);
    const dispatch = useDispatch();
    const handleChangePassword = async () => {
        if (passwordData !== password) {
            toast.error("Password in corrected");
            setPassword("");
            return;
        } else {
            let res = await postChangePassword(password, newPassword);
            if (res && res.EC === 0) {
                toast.success(res.EM);
                dispatch(doPass(newPassword));
                setPassword("");
                setNewPassword("");
            }
        }
    }
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
                    type={isShowNewPassword ? "text" : "password"}
                    className="form-control"
                    value={newPassword}
                    onChange={(event) => { setNewPassword(event.target.value) }} />
                {isShowNewPassword ?
                    <span className="icons-eye"
                        onClick={() => setIsShowNewPassword(false)}>
                        <VscEye />
                    </span>
                    :
                    <span className="icons-eye"
                        onClick={() => setIsShowNewPassword(true)}>
                        <VscEyeClosed />
                    </span>

                }
            </div>
            <div className="col-md-12 btn-password">
                <Button variant="secondary" className=" mt-3" onClick={() => { handleChangePassword() }}>
                    Change Password
                </Button>
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