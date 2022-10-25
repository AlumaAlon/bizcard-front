import { FunctionComponent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { successMsg } from "../services/feedbackService";
import { getUser } from "../services/userService";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    biz: "",
  });
  useEffect(() => {
    getUser()
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
    successMsg("You've Logged Out successfully!");
  };
  return (
    <nav>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid container">
          <span className="navbar-brand">
            <img src="/images/Logo.png" alt="logo" className="logoImg" />
            Biz<span>Cards</span>
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              {user && sessionStorage.getItem("token") && (
                <li className="nav-item">
                  <Link className="nav-link" to="/allCards">
                    All BizCards
                  </Link>
                </li>
              )}
              {user.biz && sessionStorage.getItem("token") && (
                <li className="nav-item">
                  <Link className="nav-link" to="/myCards">
                    My BizCards
                  </Link>
                </li>
              )}
              {user.biz && sessionStorage.getItem("token") && (
                <li className="nav-item">
                  <Link className="nav-link" to="/addCard">
                    Create BizCard
                  </Link>
                </li>
              )}
            </ul>
            {user && sessionStorage.getItem("token") && (
              <ul className="navbar-nav logoutDropDown">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Welcome, {user.name}
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <span className="dropdown-item biz">
                        <i className="fa-solid fa-user mx-1"></i> You are
                        {user.biz ? " Business Owner" : ` Regular User`}
                      </span>
                    </li>
                    <li>
                      <a
                        className="dropdown-item pe-auto"
                        onClick={handleLogout}
                      >
                        <i className="fa-solid fa-power-off mx-1"></i> Logout
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            )}
            {user && !sessionStorage.getItem("token") && (
              <ul className="navbar-nav logoutDropDown">
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </nav>
  );
};

export default Navbar;
