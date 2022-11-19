import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from "react-toastify";
import { putUpdateUser } from '../../../service/apiServices';
import _ from 'lodash';
// export cai gi import cai do
const ModalViewUser = (props) => {
    const { show, setShow, dataView } = props;
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
    const [role, setRole] = useState("");
    const [image, setImage] = useState("");
    const [preview, setPreview] = useState("");
    useEffect(() => {
        //  >>> neu truyen mot mang rong thi useEffect se chay ngay sau khi render
        // >>> useEffect se chay lai khi dataUpdate bi thay doi
       if(!_.isEmpty(dataView)){
            // Neu kh rong upDate data
            setEmail(dataView.email);
            setImage("");
            setRole(dataView.role);
            setUsername(dataView.username);
            if(dataView.image){
                setPreview(`data:image/jpeg;base64,${dataView.image}`);
                // anh da duoc ma hoa duoi dang base 64
            }
       }
    }, [dataView]);
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
                    <Modal.Title>Update a user</Modal.Title>
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
                                disabled
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
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalViewUser;