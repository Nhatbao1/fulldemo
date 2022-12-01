import { useEffect, useState } from "react";
import { getHistory } from "../../service/apiServices";
import moment from 'moment'
const History = () => {
    const [listHisroty, setListHistory] = useState([]);
    useEffect(() => {
        festHistory();
    }, [])
    const festHistory = async () => {
        let res = await getHistory();
        if (res && res.EC === 0) {
            let newData = res?.DT?.data?.map(item => {
                return{
                    total_correct: item.total_correct,
                    total_questions: item.total_questions,
                    name:item?.quizHistory?.name??"",
                    id:item.id,
                    date:moment(item.createAt).utc().format('DD/MM/YY hh:mm:ss A'),
                }
            })
            if(newData.length >7){
                newData = newData.slice(newData.length-7,newData.lengh);
            }
            setListHistory(newData);
        }
    }
    return (
        <>
            <table className="table table-hover table-bordered ">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Quiz Name</th>
                        <th scope="col">Total Question</th>
                        <th scope="col">Total Correct</th>
                        <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listHisroty && listHisroty.length > 0 &&
                        listHisroty.map((value, index) => {
                            return (
                                <tr key={`table-quiz-${index + 1}`}>
                                    <td>{value.id}</td>
                                    <td>{value.name}</td>
                                    <td>{value.total_questions}</td>
                                    <td>{value.total_correct}</td>
                                    <td>{value.date}</td>
                                </tr>
                            );
                        })
                    }

                    {listHisroty && listHisroty.length === 0 && <tr><td colSpan={4}>Not found Data </td></tr>}
                </tbody>
            </table>

        </>
    );
}
export default History;