import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from "react-toastify";
import { UpdateQuiz } from '../../../../service/apiServices';
import _ from 'lodash';
import { set } from 'nprogress';
const ModalUpdateQuiz = (props) => {
    const { show, setShow, dataUpdateQuiz, setDataUpdateQuiz } = props;
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [image, setImage] = useState("");
    const [preview, setPreview] = useState("")
    const handleClose = () => {
        setShow(false);
        setId("");
        setImage("");
        setDifficulty("EASY");
        setDescription("");
        setPreview("");
        setDifficulty("");
        setDataUpdateQuiz({});
    }
    useEffect(() => {
        if (_.isEmpty(dataUpdateQuiz)) {
            setId(dataUpdateQuiz.id);
            setDescription(dataUpdateQuiz.description);
            setDifficulty(dataUpdateQuiz.difficulty);
            setName(dataUpdateQuiz.name);
            if (dataUpdateQuiz.image) {
                setPreview(`data:image/jpeg;base64,${dataUpdateQuiz.image}`);
            }
        }
    }, [dataUpdateQuiz])
    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreview(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        }
    }
    const handleSubmitCreateUser = async () => {
        let res = await UpdateQuiz(name, description, difficulty, dataUpdateQuiz.id);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            handleClose();
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM);
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
                    <Modal.Title>Update Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">ID</label>
                            <input type="text"
                                disabled
                                className="form-control"
                                value={dataUpdateQuiz.id}
                                onChange={(event) => { setId(event.target.value) }}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input type="text"
                                className="form-control"
                                value={name}
                                onChange={(event) => { setName(event.target.value) }}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Description</label>
                            <input type="tetx"
                                className="form-control"
                                value={description}
                                onChange={(event) => { setDescription(event.target.value) }}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Difficulty</label>
                            <select className="form-select" onChange={(event) => { setDifficulty(event.target.value) }}>
                                <option value="EASY">EASY</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HARD">HARD</option>
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
export default ModalUpdateQuiz;