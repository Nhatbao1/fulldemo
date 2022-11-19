import "./DashBoard.scss";
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip, YAxis, Legend, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { getOverview } from "../../../service/apiServices";
const DashBoard = (props) => {
    const [dataOverview, setDataOverview] = useState({});
    const [dataChart, setDataChart] = useState([]);
    // useEffect(() => {
    //     fetchOverview();
    // }, [])
    // const fetchOverview = async () => {
    //     let res = await getOverview();
    //     if (res && res.EC === 0) {
    //         setDataOverview(res.DT);
    //         setDataChart([
    //             {
    //                 "name": "Quizzes",
    //                 "Qz": res?.DT?.others?.countQuiz,
    //             },
    //             {
    //                 "name": "Questions",
    //                 "Qs": res?.DT.others?.countQuestions,
    //             },
    //             {
    //                 "name": "Answers",
    //                 "As": res?.DT.others?.countAnswers,
    //             },
    //         ]);
    //     }
    // }
    return (
        <div className="dashboard-container">
            <div className="title">DashBoard</div>
            <div className="content">
                <div className="left-content">
                    <div className="child">
                        <span className="text1">Total Users</span>
                        {/* {dataOverview && dataOverview.users ?
                            <span className="text2">{dataOverview.users.total}</span>
                            :
                            <span className="text2">100</span>
                        } */}
                    </div>
                    <div className="child">
                        <span className="text1">Total Quizzes</span>
                        {/* {dataOverview && dataOverview.others.countQuiz ?
                            <span className="text2">{dataOverview.others.countQuiz}</span>
                            :
                            <span className="text2">100</span>
                        } */}
                    </div>
                    <div className="child">
                        <span className="text1">Total Questions</span>
                        {/* {dataOverview && dataOverview.others.countQuestions ?
                            <span className="text2">{dataOverview.others.countQuestions}</span>
                            :
                            <span className="text2">100</span>
                        } */}
                    </div>
                    <div className="child">
                        <span className="text1">Total Answers</span>
                        {/* {dataOverview && dataOverview.others.countAnswers ?
                            <span className="text2">{dataOverview.others.countAnswers}</span>
                            :
                            <span className="text2">100</span>
                        } */}
                    </div>
                </div>
                <div className="right-content">
                    <ResponsiveContainer width="95%" height="100%">
                        <BarChart width={400} height={300} data={dataOverview}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Qz" fill="#8884d8" />
                            <Bar dataKey="Qs" fill="#82ca9d" />
                            <Bar dataKey="As" fill="#fcb12a" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
export default DashBoard;