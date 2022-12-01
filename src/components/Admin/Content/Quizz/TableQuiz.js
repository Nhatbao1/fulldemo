import { useEffect, useState } from "react";
import { GetQuiz, getQuizzByUser } from "../../../../service/apiServices";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalUpdateQuiz from "./ModalUpdateQuiz"
const TableQuiz = (props) => {
    const { dataFetch } = props;
    const [listQuiz, setListQuiz] = useState({});
    const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
    const [dataUpdateQuiz, setDataUpdateQuiz] = useState({});
    const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
    const [dataDeleteQuiz, setDataDeleteQuiz] = useState({});
    useEffect(() => {
        getAllQuiz();
    }, [dataFetch])
    const getAllQuiz = async () => {
        setDataDeleteQuiz({});
        setDataUpdateQuiz({});
        let res = await GetQuiz();
        if (res && res.EC === 0) {
            setListQuiz(res.DT)
        }
    }
    const handleClickUpdateQuiz = (quiz) => {
        setShowModalUpdateQuiz(true);
        setDataUpdateQuiz(quiz);
    }
    const handleClickDeleteQuiz = (quiz) => {
        setShowModalDeleteQuiz(true);
        setDataDeleteQuiz(quiz);
    }
    return (
        <table className="table table-border table-hover my-2">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Type</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {listQuiz && listQuiz.length > 0 &&
                    listQuiz.map((quiz, index) => {
                        return (
                            <tr key={`table-quiz-${index + 1}`}>
                                <td>{quiz.id}</td>
                                <td>{quiz.name}</td>
                                <td>{quiz.description}</td>
                                <td>{quiz.difficulty}</td>
                                <td style={{ display: "flex", gap: "15px" }}>
                                    <button
                                        className="btn btn-warning" onClick={() => { handleClickUpdateQuiz(quiz) }}>Update</button>
                                    <button className="btn btn-danger" onClick={() => { handleClickDeleteQuiz(quiz) }}>Delete</button>
                                </td>
                            </tr>
                        );
                    })
                }
            </tbody>
            <ModalDeleteQuiz
                show={showModalDeleteQuiz}
                setShow={setShowModalDeleteQuiz}
                dataDeleteQuiz={dataDeleteQuiz}
                getAllQuiz={getAllQuiz}
            />

            <ModalUpdateQuiz
                show={showModalUpdateQuiz}
                setShow={setShowModalUpdateQuiz}
                dataUpdateQuiz={dataUpdateQuiz}
                setDataUpdateQuiz={setDataUpdateQuiz}
                getAllQuiz={getAllQuiz}
            />
        </table>
    );
}
export default TableQuiz;