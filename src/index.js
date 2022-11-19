import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'nprogress/nprogress.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from './components/Users/User';
import Admin from './components/Admin/Admin';
import HomePage from './components/Home/HomePage';
import DashBoard from './components/Admin/Content/DashBoard';
import ManageUser from './components/Admin/Content/ManageUser';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { Provider, ReactReduxContext } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import ManageQuizz from './components/Admin/Content/Quizz/ManageQuizz';
import ListQuizz from './components/Users/ListQuizz';
import DetailQuiz from './components/Users/DetailQuizz';
import ManageQuestion from './components/Admin/Content/Question/ManageQuestion';
import PrivateRoute from './Routes/PrivateRoute';
import './utils/i18n';
const NotFound = () => {
  return (
    <div className="container alert alert-danger">
      Not found data with your current URL
    </div>
  )
}
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {/* <React.StrictMode> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />}></Route>
            <Route path="users" element={
              <PrivateRoute>
                <ListQuizz />
              </PrivateRoute>
            }></Route>
          </Route>
          <Route path="/quiz/:id" element={<DetailQuiz />}></Route>
          <Route path="/admin" element={
            <PrivateRoute>
              <Admin />

            </PrivateRoute>
          }>
            <Route index element={<DashBoard />}></Route>
            {/* mac dinh luc nao vao cung la DashBoard ---> de index de set mac dinh */}
            <Route path="manageuser" element={<ManageUser />}></Route>
            <Route path="managequizz" element={<ManageQuizz />}></Route>
            <Route path="managequestion" element={<ManageQuestion />}></Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
      {/* </React.StrictMode> */}
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
