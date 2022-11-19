import ModalCreateUser from "./ModalCreateUser";
import ModalUpdateUser from "./ModalUpdateUser";
import "./ManageUser.scss";
import { FcPlus } from 'react-icons/fc';
import { useState, useEffect } from "react";
import { getAllUsers } from "../../../service/apiServices";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";
import { getListUsersWithPaginate } from "../../../service/apiServices";
const ManageUser = (props) => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false)
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
    const [showModalViewUer, setShowModalViewUser] = useState(false)
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)
    const [dataUpdate, setDataUpdate] = useState({})
    const [dataView, setDataView] = useState({})
    const [dataDelete, setDataDelete] = useState({})
    const [pageCount, setPageCount] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const LIMIT_USER = 4;
    // tao 1 mang [] >>> chua 2 object{}
    const [listUser, setListUser] = useState([]);
    // de lay API chen vao thi dong HTML phai duoc render truoc >>> vi vay chung ta can dung ham useEffect
    useEffect(() => {
        festListUsersWithPaginate(1);
    }, []);
    const festListUsers = async () => {
        let res = await getAllUsers();
        if (res.EC === 0) {
            setListUser(res.DT)
        }
    }
    const festListUsersWithPaginate = async (page) => {
        let res = await getListUsersWithPaginate(page, LIMIT_USER);
        if (res.EC === 0) {
            setListUser(res.DT.users)
            setPageCount(res.DT.totalPages)
            // tai vi res.DT tra ve -> 1 object -> .users de tra ve 1 user
        }
    }
    // useEffect se duoc chay sau khi ham return da duoc chay truoc
    // useEffect truyen vao 1 function ca 1 mang rong  === componentDidMount
    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true);
        setDataUpdate(user);
    }
    const handleClickBtnView = (user) => {
        setShowModalViewUser(true);
        setDataView(user);
    }
    const handleClickBtnDelete = (user) => {
        setShowModalDeleteUser(true);
        setDataDelete(user);
    }
    return (
        <div className="manage-user-container">
            <div className="title">
                Manage User
            </div>
            <div className="users-content">
                <div className="btn-add-new">
                    <button
                        className="btn btn-primary"
                        onClick={() => { setShowModalCreateUser(true) }}
                    >
                        <FcPlus />
                        Add new user
                    </button>
                </div>
                <div className="table-users-container">
                    {/* <TableUser listUser={listUser} handleClickBtnUpdate={handleClickBtnUpdate} handleClickBtnView={handleClickBtnView} handleClickBtnDelete={handleClickBtnDelete}/> */}
                    <TableUserPaginate
                        listUser={listUser}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}
                        festListUsersWithPaginate={festListUsersWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    festListUsers={festListUsers}
                    festListUsersWithPaginate={festListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                {/* goi ham festListUsers de render lai ListUsers */}
                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    festListUsers={festListUsers}
                    festListUsersWithPaginate={festListUsersWithPaginate}
                    setDataUpdate={setDataUpdate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                {/* có thể dùng cách là truyền 1 function xuống thằng con */}
                {/* co the truyen function resetUpdateData */}
                <ModalViewUser
                    show={showModalViewUer}
                    setShow={setShowModalViewUser}
                    dataView={dataView} />
                <ModalDeleteUser
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataDelete={dataDelete}
                    festListUsers={festListUsers}
                    festListUsersWithPaginate={festListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
}
export default ManageUser;