import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getQuizzByUser } from '../../service/apiServices'
import "./ListQuizz.scss";
const ListQuizz = (props) => {
    const [arrQuizz, setArrQuizz] = useState([]);
    useEffect(() => {
        getQuizzData();
    }, []);
    const getQuizzData = async () => {
        const res = await getQuizzByUser();
        if (res && res.EC === 0) {
            setArrQuizz(res.DT)
        }
    }
    const navigate = useNavigate();
    return (
        <div className='list-quiz-container container'>
            {arrQuizz && arrQuizz.length > 0 &&
                arrQuizz.map((quiz, index) => {
                    return (
                        <div key={`${index}-quiz}`} className="card" style={{ width: "18rem" }}>
                            <div className="card-img-top" ><img src={`data:image/jpeg;base64,${quiz.image}`} alt="Card image cap" /></div>
                            <div className="card-body">
                                <h5 className="card-title">Quiz {index + 1} </h5>
                                <p className="card-text">{quiz.description}</p>
                                <a className="btn btn-primary" onClick={() => { navigate(`/quiz/${quiz.id}`, { state: { quizTitle: quiz.description } }) }}>Start now</a>
                            </div>
                        </div>
                    )
                })
            }
            {arrQuizz && arrQuizz.length === 0 &&
                <div>You don't have any quiz </div>
            }
        </div>
    )
}
export default ListQuizz;