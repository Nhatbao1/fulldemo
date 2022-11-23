import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from "react-toastify";
import { postCreateNewUsers } from '../../../service/apiServices';
// export cai gi import cai do
const ModalCreateUser = (props) => {
    const { show, setShow, festListUsersWithPaginate, setCurrentPage } = props;
    // Modal se tu dong chen xuong duoi cung cua body kh chen vao div root --> de vay thi nen 1 class boc cho modal
    const handleClose = () => {
        setShow(false);
        setEmail("");
        setImage("");
        setRole("USER");
        setUsername("");
        setPreview("");
        setPassword("");
    };
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImage] = useState("");
    const [preview, setPreview] = useState("");
    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreview(URL.createObjectURL(event.target.files[0]))
            // URL convert anh duoi dang blob luu tai local
            setImage(event.target.files[0])
        }
    }
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    }
    const handleSubmitCreateUser = async () => {
        //validate phia giao dien
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

        let data = await postCreateNewUsers(email, password, username, role, image);
        // await -> dung de cho axios goi API goi thanh cong se goi lai res
        // dung moi data vi da customize api tra ve 1 cuc data
        if (data && data.EC === 0) {
            // res.data.EC tra ve 0 la tao moi thanh cong 
            toast.success(data.EM, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            handleClose();
            await festListUsersWithPaginate(1);
            setCurrentPage(1);

        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
            // tra ve cau thong bao cua backend
        }

    }
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size="xl"
                backdrop="static"
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email"
                                className="form-control"
                                value={email}
                                onChange={(event) => { setEmail(event.target.value) }}
                            />
                            {/* de React kiem soat cho cai input mot value */}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input type="password"
                                className="form-control"
                                value={password}
                                onChange={(event) => { setPassword(event.target.value) }}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input type="text"
                                className="form-control"
                                value={username}
                                onChange={(event) => { setUsername(event.target.value) }}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select className="form-select" onChange={(event) => { setRole(event.target.value) }}>
                                <option value="USER">User</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </div>
                        <div className='col-md-12'>
                            <label className='form-label label-upload' htmlFor='labelUpload'>
                                <FcPlus />
                                Upload File Image
                            </label>
                            <input
                                type="file"
                                hidden
                                id='labelUpload'
                                // ban chat nhan vao Upload FIle Image la dang thao tac voi input
                                onChange={(event) => { handleUploadImage(event) }}
                            />
                        </div>
                        <div className='col-md-12 img-preview'>
                            {preview ?
                                <img src={preview} value />
                                :
                                <span>Preview Image</span>
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => { handleSubmitCreateUser() }}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalCreateUser;