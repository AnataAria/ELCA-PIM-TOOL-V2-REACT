import "./App.css";
import Navbar from "./component/Navbar";
import MainPage from "./pages/MainPage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import ProjectPage from "./pages/ProjectPage";
import Leftnavbar from "./component/Leftnavbar";

function App() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="left-column">
          <Leftnavbar className="left-column" />
        </div>
        <div className="right-column">
          <Routes>
            <Route path="/" element={<MainPage />}></Route>
            <Route path="/projects" element={<ProjectPage />}></Route>
            <Route
              path="/projects/:projectId"
              element={<ProjectPage />}
            ></Route>
          </Routes>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
