import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import "./App.scss";
import PerfectScrollbar from 'react-perfect-scrollbar';
const App = () => {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="main-container">
        <div className="sidenav-container"></div>
        <div className="app-content">
          <PerfectScrollbar>
            <Outlet/>
          </PerfectScrollbar>
          {/* để có nội dung của các component con thì dùng outlet nó sẽ render nội dung component con */}
        </div>
      </div>

    </div>
  );
}
export default App;