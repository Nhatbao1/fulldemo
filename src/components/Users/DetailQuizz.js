import _, { indexOf } from "lodash";
import { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDetailQuizzById, postSubmitQuiz } from "../../service/apiServices";
import "./DetailQuiz.scss";
import Question from "./Question";
import { ToastContainer, toast } from "react-toastify";
import ModalResult from "./ModalResult";
import CountDown from "./CountDown";
const DetailQuiz = (props) => {
    const refDiv = useRef([]);
    const params = useParams();
    const quizId = params.id;
    const location = useLocation();
    const [dataQuiz, setDataQuiz] = useState([]);
    const [show, setShow] = useState(false);
    const [totalQ, seTotalQ] = useState("");
    const [correctQ, setCorrectQ] = useState("");
    const [isSubmitQuiz, setIsSubmitQuiz] = useState(false);
    const [isShowAnswer, setIsShowAnswer] = useState(false);
    const [index, setIndex] = useState(0);
    useEffect(() => {
        detailQuizz();
    }, [quizId])
    const detailQuizz = async () => {
        let res = await getDetailQuizzById(quizId);
        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                .groupBy("id")
                .map((value, key) => {
                    let answer = [];
                    let questionDescription, image = null;
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                        item.answers.isSelected = false;
                        item.answers.isCorrect = false;
                        answer.push(item.answers);
                    })
                    answer = _.orderBy(answer, ['id'], ['asc']);
                    return { questionId: key, answer, questionDescription, image }
                })
                .value();
            setDataQuiz(data)
        }
    }
    const handleClickNext = () => {
        setIndex(+index + 1);
    }
    const handleClickPrev = () => {
        setIndex(+index - 1);
    }
    const handleClickSubmit = async () => {
        let payload = {
            quizId: +quizId,
            answers: []
        };
        let answers = [];
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(question => {
                let questionId = question.questionId;
                let userAnswerId = [];
                question.answer.forEach(a => {
                    if (a.isSelected === true) {
                        userAnswerId.push(a.id)
                    }
                })
                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId
                })
            })
            payload.answers = answers;
        }
        let res = await postSubmitQuiz(payload);
        if (res && res.EC === 0) {
            setShow(true);
            seTotalQ(res.DT.countTotal);
            setCorrectQ(res.DT.countCorrect);
            if (res.DT && res.DT.quizData) {
                let dataQuizClone = _.cloneDeep(dataQuiz);
                let a = res.DT.quizData;
                for (let q of a) {
                    for (let i = 0; i < dataQuizClone.length; i++) {
                        if (+q.questionId === +dataQuizClone[i].questionId) {
                            let newAnswers = [];
                            for (let j = 0; j < dataQuizClone[i].answer.length; j++) {
                                let s = q.systemAnswers.find(item => +item.id === +dataQuizClone[i].answer[j].id)
                                if (s) {
                                    dataQuizClone[i].answer[j].isCorrect = true;
                                }
                                newAnswers.push(dataQuizClone[i].answer[j]);
                            }
                            dataQuizClone[i].answer = newAnswers;
                        }
                    }
                }
                setDataQuiz(dataQuizClone);
            }
        } else {

        }
    }
    const handleCheckBox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz)
        let question = dataQuizClone.find(item => +item.questionId === +questionId)
        if (question && question.answer) {
            let b = question.answer.map(item => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            })
            question.answer = b;
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
        if (index > -1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone);
        }
    }
    const handleClickChangeQuiz = (question, index) => {
        setIndex(index);
        if (refDiv.current) {
            refDiv.current.forEach(item => {
                if (item && item.className === "question-a clicked") {
                    item.className = "question-a";
                }
            })
        }
        if (question && question.answer.length > 0) {
            let isAnswered = question.answer.find(a => a.isSelected === true);
            if (isAnswered) {
                return;
            }
        }
        refDiv.current[index].className = "question-a clicked";
    }
    const getClassQuestion = (question) => {
        if (question && question.answer.length > 0) {
            let isAnswered = question.answer.find(a => a.isSelected === true);
            if (isAnswered) {
                return "question-a selected";
            }
        }
        return "question-a";
    }
    const handleShowAnswer = () => {
        setIsSubmitQuiz(true);
        setIsShowAnswer(true);
    }
    return (
        <div className="detail-quiz-container">
            <div className="left-content">
                <div className="title">
                    Quiz {quizId} : {location?.state?.quizTitle}
                </div>
                <hr />
                <div className="q-content">
                    <Question
                        data={dataQuiz.length > 0 ? dataQuiz[index] : []}
                        index={index}
                        handleCheckBox={handleCheckBox}
                        isShowAnswer={isShowAnswer}
                        isSubmitQuiz={isSubmitQuiz}
                    />
                </div>
                {index === 0
                    ?
                    <div className="btn-quiz">
                        <button className="btn btn-primary" onClick={() => { handleClickPrev() }} disabled >Prev</button>
                        <button className="btn btn-primary" onClick={() => { handleClickNext() }} >Next</button>
                        <button className="btn btn-warning" disabled={isSubmitQuiz} onClick={() => { handleClickSubmit() }}>Finish</button>
                    </div>
                    :
                    (index < +dataQuiz.length - 1
                        ?
                        <div className="btn-quiz">
                            <button className="btn btn-primary" onClick={() => { handleClickPrev() }}>Prev</button>
                            <button className="btn btn-primary" onClick={() => { handleClickNext() }} >Next</button>
                            <button className="btn btn-warning" disabled={isSubmitQuiz} onClick={() => { handleClickSubmit() }}>Finish</button>
                        </div>
                        :
                        <div className="btn-quiz">
                            <button className="btn btn-primary" onClick={() => { handleClickPrev() }}>Prev</button>
                            <button className="btn btn-primary" onClick={() => { handleClickNext() }} disabled>Next</button>
                            <button className="btn btn-warning" disabled={isSubmitQuiz} onClick={() => { handleClickSubmit() }}>Finish</button>
                        </div>
                    )

                }
            </div>
            <div className="right-content">
                <div className="main-timer">
                    <CountDown handleClickSubmit={handleClickSubmit} />
                </div>
                <div className="main-questions">
                    {dataQuiz && dataQuiz.length > 0 &&
                        dataQuiz.map((question, index) => {
                            return (
                                <div
                                    key={`question-abc-${index + 1}`}
                                    className={getClassQuestion(question)}
                                    onClick={() => handleClickChangeQuiz(question, index)}
                                    ref={element => refDiv.current[index] = element}
                                >
                                    {index + 1}
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            <ModalResult
                show={show}
                setShow={setShow}
                totalQ={totalQ}
                correctQ={correctQ}
                handleShowAnswer={handleShowAnswer}
            />
        </div>
    )
}
export default DetailQuiz;