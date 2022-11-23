import { useEffect, useState } from "react";
import { getHistory } from "../../service/apiServices";
import ModalHistory from "./ModalHistory";

const History = () => {
    const [listHisroty, setListHistory] = useState([]);
    const [showModalHistory, setShowModalHistory] = useState(false);
    const [dataHistory, setDataHistory] = useState();
    useEffect(() => {
        if (dataHistory) {
            festHistory();
        }
    }, [])
    const festHistory = async () => {
        let res = await getHistory();
        if (res && res.EC === 0) {
            setListHistory(res.DT.data);
        }
    }
    const handleClickViewHistory = (data) => {
        setShowModalHistory(true);
        setDataHistory(data);
    }
    return (
        <>
            <table className="table table-hover table-bordered ">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
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
                    }

                    {listHisroty && listHisroty.length === 0 && <tr><td colSpan={4}>Not found Data </td></tr>}
                </tbody>
                <ModalHistory
                    show={showModalHistory}
                    setShow={setShowModalHistory}
                    dataHistory={dataHistory}
                />
            </table>

        </>
    );
}
export default History;