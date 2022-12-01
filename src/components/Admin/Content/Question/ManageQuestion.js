import { useEffect, useState } from 'react';
import Select from 'react-select';
import './ManageQuestion.scss';
import { TbHearPlus } from "react-icons/tb";
import { GetQuiz, postCreateNewAnswerForQuiz, postCreateNewQuestionForQuiz } from "../../../../service/apiServices";
import { BsFillPatchPlusFill, BsPatchMinusFill } from "react-icons/bs";
import { AiOutlineMinusCircle, AiFillPlusSquare } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';
import _, { create, flatMap } from "lodash";
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";
import { toast } from 'react-toastify';
const ManageQuestion = () => {
    const initQuestions = [
        {
            id: uuidv4(),
            description: '',
            imageFile: '',
            imageName: '',
            isEmptyQuestion: false,
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false,
                    isEmptyAnswer: false,
                },
            ]
        },
    ]
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const [dataPreviewImage, setDataPreviewImage] = useState({
        url: '',
        title: '',
    })
    const [questions, setQuestions] = useState(initQuestions)
    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState({});
    useEffect(() => {
        getAllQuiz();
    }, [])
    const getAllQuiz = async () => {
        let res = await GetQuiz();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map((val, index) => {
                return {
                    value: val.id,
                    label: `${val.id} - ${val.description}`,
                }
            })
            setListQuiz(newQuiz)
        }
    }
    const handleAddRemoveQuestion = (type, id) => {
        if (type === 'ADD') {
            const newQuestion = {
                id: uuidv4(),
                description: 'questions 3',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false,
                    },
                ]
            }
            setQuestions([...questions, newQuestion]);
        }
        if (type === 'REMOVE') {
            let questionsClone = _.cloneDeep(questions);
            questionsClone = questionsClone.filter((question, index) => {
                return question.id !== id;
            })
            setQuestions(questionsClone);
        }
    }
    const handleAddRemoveAnswer = (type, answerID, questionID) => {
        let questionsClone = _.cloneDeep(questions);
        if (type === 'ADD') {
            const newAnswer =
            {
                id: uuidv4(),
                description: '',
                isCorrect: false,
            }
            let index = questionsClone.findIndex((val, index) => val.id === questionID)
            if (index > -1) {
                questionsClone[index].answers.push(newAnswer);
            }
            setQuestions(questionsClone);
        }
        if (type === 'REMOVE') {
            let questionsClone = _.cloneDeep(questions);
            let index = questionsClone.findIndex((val, index) => val.id === questionID);
            if (index > -1) {
                questionsClone[index].answers = questionsClone[index].answers.filter((val, index) => {
                    return val.id !== answerID;
                })
            }
            setQuestions(questionsClone);
        }
    }
    const handleOnChange = (type, questionID, value) => {
        if (type === "QUESTION") {
            let questionsClone = _.cloneDeep(questions);
            let index = questionsClone.findIndex((val, index) => val.id === questionID);
            if (index > -1) {
                questionsClone[index].description = value;
            }
            setQuestions(questionsClone);
        }
    }
    const handleOnChangeAnswer = (type, questionID, answerID, value) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex((val, index) => val.id === questionID);
        if (index > -1) {
            if (type === "ANSWER") {
                let indexAnswer = questionsClone[index].answers.findIndex((val, index) => val.id === answerID);
                questionsClone[index].answers[indexAnswer].description = value;
                setQuestions(questionsClone);
            }
            if (type === "CHECKED") {

                let indexAnswer = questionsClone[index].answers.findIndex((val, index) => val.id === answerID);
                questionsClone[index].answers[indexAnswer].isCorrect = value;
            }
        }
        setQuestions(questionsClone);
    }
    const handleChangeFileQuestion = (questionID, event) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex((val, index) => val.id === questionID);
        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            questionsClone[index].imageFile = event.target.files[0];
            questionsClone[index].imageName = event.target.files[0].name;
        }
        setQuestions(questionsClone);
    }
    const handlePreviewImage = (questionID) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex((val, index) => val.id === questionID);
        if (index > -1) {
            setDataPreviewImage({
                url: URL.createObjectURL(questionsClone[index].imageFile),
                title: questionsClone[index].imageName
            })
        }
        setIsPreviewImage(true);
    }
    const handleSubmitQuestionForQuiz = async () => {
        if (_.isEmpty(selectedQuiz)) {
            toast.error("Please choose a Quiz");
            return;
        }
        let isValidAnswer = true;
        let indexQuestion = 0, indexAnswer = 0, count = 0;
        for (let i = 0; i < questions.length; i++) {
            for (let j = 0; j < questions[i].answers.length; j++) {
                if (!questions[i].answers[j].description) {
                    isValidAnswer = false;
                    indexAnswer = j;
                    break;
                }
            }
            indexQuestion = i;
            if (isValidAnswer === false) {
                break;
            }
        }
        if (isValidAnswer === false) {
            initQuestions[indexQuestion].answers[indexAnswer].isEmptyAnswer = true;
            setQuestions(initQuestions);
        }
        let isValidQuestion = true;
        let indexQ1 = 0;
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].description) {
                indexQ1 = i;
                isValidQuestion = false;
                break;
            }
        }
        if (isValidQuestion === false) {
            initQuestions[indexQ1].isEmptyQuestion = true;
            setQuestions(initQuestions);
        }
        for (let i = 0; i < questions.length; i++) {
            for (let j = 0; j < questions[i].answers.length; j++) {
                if (questions[i].answers[j].isCorrect === true) {
                    count = count + 1;
                }
            }
        }
        if (count <= 0) {
            toast.error("Please choose one correct Answer");
        }
        for (const question of questions) {
            const q = await postCreateNewQuestionForQuiz(+selectedQuiz.value, question.description, question.imageFile);
            for (const answer of question.answers) {
                await postCreateNewAnswerForQuiz(answer.description, answer.isCorrect, q.DT.id)
            }
        }
        toast.success("Create question and answer success");
        setQuestions(initQuestions);
    }
    return (
        <div className="questions-container">
            <div className="title">
                Manage Questions
            </div>
            <div className="add-new-questions">
                <div className='col-6 form-group'>
                    <label className='mb-2'>Selected Quiz :</label>
                    <Select
                        placeholder="Quizz types"
                        options={listQuiz}
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                    />
                </div>
                <div className='mt-3 mb-2'>
                    Add questions:
                </div>
                {questions && questions.length > 0 &&
                    questions.map((question, index) => {
                        return (
                            <div key={question.id} className='q-main mb-4'>
                                <div className='questions-content'>
                                    <div className="form-floating description">
                                        {question.isEmptyQuestion === false
                                            ?
                                            <input type="type" className="form-control "
                                                value={question.description}
                                                onChange={(event) => handleOnChange('QUESTION', question.id, event.target.value)}
                                            />
                                            :
                                            <input type="type" className="form-control is-invalid"
                                                value={question.description}
                                                onChange={(event) => handleOnChange('QUESTION', question.id, event.target.value)}
                                            />
                                        }

                                        <label >Questions {index + 1} description</label>
                                    </div>
                                    <div className='group-upload'>
                                        <label className='label-upload' htmlFor={`${question.id}`}><RiImageAddFill /></label>
                                        <input id={`${question.id}`} type={'file'} hidden onChange={(event) => { handleChangeFileQuestion(question.id, event) }} />
                                        {question.imageName
                                            ?
                                            <span style={{ cursor: "pointer" }} onClick={() => handlePreviewImage(question.id)}>{question.imageName}</span>
                                            :
                                            <span>0 file is uploaded</span>
                                        }
                                    </div>
                                    {questions.length <= 1
                                        ?
                                        <div className='btn-add'>
                                            <span className='icon-add' onClick={() => handleAddRemoveQuestion('ADD', question.id)}> <BsFillPatchPlusFill /></span>
                                        </div>
                                        :
                                        <div className='btn-add'>
                                            <span className='icon-add' onClick={() => handleAddRemoveQuestion('ADD', question.id)}> <BsFillPatchPlusFill /></span>
                                            <span className='icon-remove' onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}> <BsPatchMinusFill /></span>
                                        </div>
                                    }
                                </div>

                                {question.answers.map((answer, index) => {
                                    return (
                                        <div className='answers-content' key={answer.id}>
                                            <input
                                                className="form-check-input iscorrect"
                                                type="checkbox"
                                                checked={answer.isCorrect}
                                                onChange={(event) => { handleOnChangeAnswer('CHECKED', question.id, answer.id, event.target.checked) }}
                                            />
                                            <div className="form-floating answer-name">
                                                {answer.isEmptyAnswer === false
                                                    ?
                                                    <input type="text" className="form-control " value={answer.description} onChange={(event) => handleOnChangeAnswer('ANSWER', question.id, answer.id, event.target.value)} />
                                                    :
                                                    <input type="text" className="form-control is-invalid" value={answer.description} onChange={(event) => handleOnChangeAnswer('ANSWER', question.id, answer.id, event.target.value)} />
                                                }
                                                <label>Answer {index + 1}</label>
                                            </div>
                                            {
                                                question.answers.length <= 1
                                                    ?
                                                    <div className='btn-group'>
                                                        <span className='icon-add' onClick={() => handleAddRemoveAnswer('ADD', answer.id, question.id)}> <AiFillPlusSquare /></span>
                                                    </div>
                                                    :
                                                    <div className='btn-group'>
                                                        <span className='icon-add' onClick={() => handleAddRemoveAnswer('ADD', answer.id, question.id)}> <AiFillPlusSquare /></span>
                                                        <span className='icon-remove' onClick={() => handleAddRemoveAnswer('REMOVE', answer.id, question.id)}> <AiOutlineMinusCircle /></span>
                                                    </div>
                                            }
                                        </div>
                                    );
                                })}

                                {isPreviewImage === true &&
                                    <Lightbox
                                        image={dataPreviewImage.url}
                                        title={dataPreviewImage.title}
                                        onClose={() => setIsPreviewImage(false)}>
                                    </Lightbox>
                                }
                            </div>
                        );
                    })
                }
                {questions && questions.length > 0 &&
                    <div>
                        <button
                            className='btn btn-warning'
                            onClick={() => { handleSubmitQuestionForQuiz() }}
                        >Save Questions</button>
                    </div>
                }
            </div>

        </div>
    );
}
export default ManageQuestion;