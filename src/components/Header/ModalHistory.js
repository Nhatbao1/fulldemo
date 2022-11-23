import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const ModalHistory = (props) => {
    const { show, setShow, dataHistory } = props;
    const handleClose = () => {
        setShow(false);
    }
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                backdrop="static"
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Result</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="table table-hover table-bordered ">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Quiz Name</th>
                                <th scope="col">Total Question</th>
                                <th scope="col">Total Correct</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {
                                listHisroty && listHisroty.length > 0 &&
                                listHisroty.map((value, index) => {
                                    return (
                                       <tr key={`table-quiz-${index + 1}`}>
                                <td>{value.id}</td>
                                <td>{value.quizHistory.name}</td>
                                <td>{value.quizHistory.description}</td>
                                <td style={{ display: "flex", gap: "15px" }}>
                                    <button
                                        className="btn btn-warning" onClick={() => handleClickViewHistory(value)}>View
                                    </button>
                                </td>
                            </tr>
                                    );
                                })
                            } */}
                            <tr>
                                <td>{dataHistory.id}</td>
                                <td>{dataHistory.quizHistory.name}</td>
                                <td>{dataHistory.total_questions}</td>
                                <td>{dataHistory.total_correct}</td>
                            </tr>
                        </tbody>
                    </table>
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
export default ModalHistory;