import './ManageQuizz.scss';
import Select from 'react-select'
import { useEffect, useState } from 'react';
import { postQuiz } from '../../../../service/apiServices';
import { toast } from 'react-toastify';
import TableQuiz from './TableQuiz';
import Accordion from 'react-bootstrap/Accordion';
import UpdateQuestion from './UpdateQuestion';
import AssignQuiz from './AssignQuiz';
const ManageQuizz = (props) => {
    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' }
    ]
    const [dataFetch, setDataFetch] = useState();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState('EASY');
    const [image, setImage] = useState(null);
    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setImage(event.target.files[0])
        }
    }
    const handleClickBtnQuiz = async () => {
        let res = await postQuiz(description, name, type?.value, image);
        if (!name || !description) {
            toast.error("Name/Description is required");
            return;
        }
        if (res && res.EC === 0) {
            toast.success(res.EM);
            setName("");
            setDescription("");
            setImage("");
            setDataFetch(res.DT);
        } else {
            toast.error(res.EM)
        }
    }
    return (
        <div className="quizz-container">

            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        <div className="title">
                            Manage Quizz
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <div className="add-new mt-5">

                            <fieldset className="border rounded-3 p-3">
                                <legend className="float-none w-auto px-3">Add New Quiz</legend>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" value={name} onChange={(event) => { setName(event.target.value) }} />
                                    <label>Name</label>
                                </div>
                                <div className="form-floating">
                                    <input type="text" className="form-control" value={description} onChange={(event) => { setDescription(event.target.value) }} />
                                    <label>Description</label>
                                </div>
                                <div className='my-3'>
                                    <Select
                                        placeholder="Quizz types"
                                        options={options}
                                        defaultValue={type}
                                        onChange={setType}
                                    />
                                </div>
                                <div className='more-actions form-group'>
                                    <label className='mb-1'>Upload Image</label>
                                    <input type="file" className='form-control' onChange={(event) => { handleUploadImage(event) }} />
                                </div>
                                <div className='mt-2'>
                                    <button
                                        className='btn btn-primary'
                                        onClick={() => { handleClickBtnQuiz() }}
                                    >
                                        Save
                                    </button>
                                </div>
                            </fieldset>
                        </div>
                        <div className="list-quizz">
                            <TableQuiz dataFetch={dataFetch} />
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        <div className="title">
                            Update Q/A Quizzes
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <UpdateQuestion />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>
                        <div className="title">
                            Assign To User
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <AssignQuiz />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}
export default ManageQuizz;