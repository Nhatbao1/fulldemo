import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import { deleteUser } from '../../../service/apiServices';
const ModalDeleteUser = (props) => {
    const { show, setShow, dataDelete,festListUsersWithPaginate,setCurrentPage} = props
    const handleClose = () => {
        setShow(false);
    }
    const handleSubmitDeleteUser = async () =>{
        let data = await deleteUser(dataDelete.id);
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
            // set tai trang 1 de tablePaginate bi re-render tai trang 1
        }
        if(data && data.EC !== 0){
            toast.error(data.EM);
            // tra ve cau thong bao cua backend
        }
    }
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete the User</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete this user?
                    <b>email: {dataDelete.email}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => {handleSubmitDeleteUser()}}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;