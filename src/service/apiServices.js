// goi api trong file nay
import axios from '../utils/axiosCustomize';
// khong anh huong boi file axiosCustomize chi export ra 1 bien duy nhat la instance
const postCreateNewUsers = (email, password, username, role, image) => {
    const data = new FormData();
    // trong axios neu khong gui data duoi dang file co the truyen data duoi dang object
    // chon postman form-data co the gui file cung request
    // form.append('my-file','my-value')
    // data co the dat ten khac
    // dung loi goi API thao tac bang js se mat thoi gian nen dung bat dong bo --> de hung ket qua nao xong up truoc dung async
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image); // -> day la 1 file nen dung form data de truyen len server 
    return axios.post('api/v1/participant', data);
}
const getAllUsers = () => {
    return axios.get('api/v1/participant/all');
    //  get de lay data tu sever
}
const putUpdateUser = (id, username, role, image) => {
    const data = new FormData();
    // kh co email va password vi kh muon nguoi dung thay doi dc thong tin
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image); // -> day la 1 file nen dung form data de truyen len server 
    return axios.put('api/v1/participant', data);
    /// ghi ' ' dung nhu trong postman de tranh bi nham key - value
}
const deleteUser = (userId) => {
    return axios.delete('api/v1/participant', { data: { id: userId } });
    //  delete duoi dang formURL data la 1 object
}
const getListUsersWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`)
}
const postLogin = (userEmail, userPassword) => {
    return axios.post('api/v1/login', {
        email: userEmail,
        password: userPassword,
        delay: 5000
    });
}
const postRegister = (userEmail, userPassword, userName) => {
    return axios.post('api/v1/register', { email: userEmail, password: userPassword, userName: userName });

}
const getQuizzByUser = () => {
    return axios.get('api/v1/quiz-by-participant');
}
const getDetailQuizzById = (id) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
}
const postSubmitQuiz = (data) => {
    return axios.post('api/v1/quiz-submit', { ...data })
    // neu gui raw data thi phai truyen 1 bien object
}
const postQuiz = (description, name, difficulty, image) => {
    const data = new FormData();
    // trong axios neu khong gui data duoi dang file co the truyen data duoi dang object
    // chon postman form-data co the gui file cung request
    // form.append('my-file','my-value')
    // data co the dat ten khac
    // dung loi goi API thao tac bang js se mat thoi gian nen dung bat dong bo --> de hung ket qua nao xong up truoc dung async
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', image); // -> day la 1 file nen dung form data de truyen len server 
    return axios.post('api/v1/quiz', data);
}
const GetQuiz = () => {
    return axios.get('api/v1/quiz/all');
}
const DeleteQuiz = (quizId) => {
    return axios.delete(`api/v1/quiz/${quizId}`);
}
const UpdateQuiz = (name, description, difficulty, id) => {
    const data = new FormData();
    data.append('name', name);
    data.append('description', description);
    data.append('difficulty', difficulty);
    data.append('id', id);
    return axios.put('api/v1/quiz', data);
}
const postCreateNewQuestionForQuiz = (quizId, description, image) => {
    const data = new FormData();
    data.append('quiz_id', quizId);
    data.append('description', description);
    data.append('questionImage', image)
    return axios.post('api/v1/question', data);
}
const postCreateNewAnswerForQuiz = (description, correct_answer, question_id) => {

    return axios.post('api/v1/answer', { description, correct_answer, question_id });
}
const postAssignQuiz = (quizId, userId) => {
    return axios.post('api/v1/quiz-assign-to-user', { quizId, userId });
}
const getQuizByQA = (quizId) => {
    return axios.get(`api/v1/quiz-with-qa/${quizId}`);
}
const postUpsertQA = (data) => {
    return axios.post('api/v1/quiz-upsert-qa', { ...data });
}
const postLogOut = (email, refresh_token) => {
    return axios.post('api/v1/logout', { email, refresh_token });
}
const getOverview = () => {
    return axios.get("api/v1/overview");

}
const postUpdateProfile = (username, image) => {
    const data = new FormData();
    data.append('username', username);
    data.append('userImage', image)
    return axios.post('api/v1/profile', data);
}
const postChangePassword = (current_password, new_password) => {
    return axios.post('api/v1/change-password', { current_password, new_password });
}
const getHistory = () => {
    return axios.get('api/v1/history');

}
export {
    postCreateNewUsers, getAllUsers,
    putUpdateUser, deleteUser,
    getListUsersWithPaginate, postLogin,
    postRegister, getQuizzByUser,
    getDetailQuizzById, postSubmitQuiz,
    postQuiz, GetQuiz, DeleteQuiz,
    UpdateQuiz, postCreateNewQuestionForQuiz,
    postCreateNewAnswerForQuiz, postAssignQuiz,
    getQuizByQA, postUpsertQA, postLogOut, getOverview,
    postUpdateProfile, postChangePassword, getHistory
};
// dung cap ngoac de export ra nhieu function