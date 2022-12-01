import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const ModalResult = (props) => {
    const { show, setShow, totalQ, correctQ, isSubmitQuiz } = props;
    const handleClose = () => {
        setShow(false);
    }
    const [showResult, setShowResult] = useState(false);
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Result Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Total questions: <b>{totalQ}</b></div>
                    <div>Total Correct answes: <b>{correctQ}</b></div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        handleClose();
                        props.handleShowAnswer();
                    }}>
                        Show Result
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalResult;