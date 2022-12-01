import _ from "lodash"
import { useState } from "react";
import Lightbox from "react-awesome-lightbox";
import { IoIosCheckmark, IoIosClose } from "react-icons/io"
const Question = (props) => {
    const { data, index, handleCheckBox, isShowAnswer } = props;
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    if (_.isEmpty(data)) {
        return (<></>)
    }
    const handleCheckInputBox = (event, aId, qId) => {
        handleCheckBox(aId, qId);
    }
    return (
        <>
            {data.image ?
                <div className="image">
                    <img src={`data:image/jpeg;base64,${data.image}`} onClick={() => setIsPreviewImage(true)} />
                    {isPreviewImage === true &&
                        <Lightbox
                            image={`data:image/jpeg;base64,${data.image}`}
                            onClose={() => setIsPreviewImage(false)}>
                        </Lightbox>
                    }
                </div>
                :
                <div className="image">

                </div>
            }
            <div className="question">Question {index + 1}: {data.questionDescription}</div>
            <div className="answer">
                {data.answer && data.answer.length &&
                    data.answer.map((value, index) => {
                        return (
                            <div className="a-child" key={`answer-${index}`}>
                                <div className="form-check">
                                    <input className="form-check-input"
                                        type="checkbox"
                                        onChange={(event) => { handleCheckInputBox(event, value.id, data.questionId) }}
                                        disabled={props.isSubmitQuiz}
                                        checked={value.isSelected}
                                    />
                                    <label className="form-check-label" htmlFor={`checkbox-${index}-${index}`}>
                                        {value.description}
                                    </label>
                                    {isShowAnswer === true &&
                                        <>
                                            {value.isSelected === true && value.isCorrect === false
                                                && <IoIosClose className="incorrect" />
                                            }

                                            {value.isCorrect === true
                                                && <IoIosCheckmark className="correct" />
                                            }
                                        </>
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
export default Question;