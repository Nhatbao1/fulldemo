import Select from 'react-select'
import { useState, useEffect } from 'react';
import { getAllUsers, GetQuiz, postAssignQuiz } from '../../../../service/apiServices';
import { toast } from 'react-toastify';
const AssignQuiz = () => {
    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [listUser, setListUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});
    useEffect(() => {
        getAllQuiz();
        getALlUser();
    }, [])
    const getAllQuiz = async () => {
        let res = await GetQuiz();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map((val, index) => {
                return {
                    value: val.id,
                    label: `${val.id} - ${val.name}`,
                }
            })
            setListQuiz(newQuiz);
        }
    }
    const getALlUser = async () => {
        let res = await getAllUsers();
        if (res && res.EC === 0) {
            let newUser = res.DT.map((val, index) => {
                return {
                    value: val.id,
                    label: `${val.id} - ${val.username} - ${val.email}`,
                }
            })
            setListUser(newUser);
        }
    }
    const handleAssign = async () => {
        let res = await postAssignQuiz(selectedQuiz.value, selectedUser.value);
        if (res && res.EC === 0) {
            toast.success(res.EM);
        } else {
            toast.error(res.EM);
        }
    }
    return (
        <div className="assign-quiz-container row">
            <div className='col-6 form-group'>
                <label className='mb-2'>Selected Quiz :</label>
                <Select
                    placeholder="Quizz types"
                    options={listQuiz}
                    defaultValue={selectedQuiz}
                    onChange={setSelectedQuiz}
                />
            </div>
            <div className='col-6 form-group'>
                <label className='mb-2'>Selected User :</label>
                <Select
                    placeholder="User"
                    options={listUser}
                    defaultValue={selectedUser}
                    onChange={setSelectedUser}
                />
            </div>
            <div>
                <button className='btn btn-warning mt-3'
                    onClick={() => handleAssign()}
                >Assign</button>
            </div>
        </div>
    )
}
export default AssignQuiz;