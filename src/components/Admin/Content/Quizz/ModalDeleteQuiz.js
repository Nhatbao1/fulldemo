import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import { DeleteQuiz } from '../../../../service/apiServices';
const ModalDeleteQuiz = (props) => {
    const { show, setShow, dataDeleteQuiz, getAllQuiz } = props;
    useEffect(() => {
        getAllQuiz();
    }, [])
    const handleClose = () => {
        setShow(false);
    }
    const handleSubmitDeleteUser = async () => {
        let res = await DeleteQuiz(dataDeleteQuiz.id);
        if (res && res.EC === 0) {
            toast.success(res.EM)
            getAllQuiz(res.DT);
            handleClose();
        } else {
            toast.error(res.EM)
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
                    <b>ID: {dataDeleteQuiz.id}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => { handleSubmitDeleteUser() }}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalDeleteQuiz;