import "./App.css";
import { ToastContainer } from "react-toastify";
import Register from "./components/Register";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import About from "./components/About";
import AllCards from "./components/AllCards";
import MyCards from "./components/MyCards";
import NewCard from "./components/NewCard";
import EditCard from "./components/EditCard";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/allCards" element={<AllCards />}></Route>
          <Route path="/myCards" element={<MyCards />}></Route>
          <Route path="/addCard" element={<NewCard />}></Route>
          <Route path="/edit/:id" element={<EditCard />}></Route>
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
