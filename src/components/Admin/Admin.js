import SideBar from "./SideBar";
import "./Admin.scss";
import { FaBars } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PerfectScrollbar from "react-perfect-scrollbar";
import Language from "../Header/Language";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { doLogout } from '../../redux/action/userAction';
import { postLogOut } from '../../service/apiServices';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from "react-router-dom";
const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const refresh_token = useSelector(state => state.user.account.refresh_token)
    const email = useSelector(state => state.user.account.email)
    const dispatch = useDispatch();
    const handleClickLogOut = async () => {
        let res = await postLogOut(email, refresh_token);
        if (res && res.EC === 0) {
            navigate('/login');
            dispatch(doLogout(res));
        }
    }
    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed} />
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <span onClick={() => { setCollapsed(!collapsed) }} >
                        <FaBars />
                    </span>
                    <div className="setting">
                        <NavDropdown title="Setting" id="basic-nav-dropdown" className="language">
                            <NavDropdown.Item>Profile</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => handleClickLogOut()}>Log out</NavDropdown.Item>
                        </NavDropdown>
                        <Language />
                    </div>
                </div>

                <div className="admin-main">
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
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
export default Admin;