import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
  const navigate = useNavigate()

  return (
    <nav className="nav-container">
      <ul className="nav">
        <li>logo</li>
        <div className="nav-items">
          <li className="nav-item">Home</li>
          <li className="nav-item">Your Expenses</li>
          <li className="nav-item">Your Teams</li>
        </div>
        <li className="nav-logout">
          <Link
            to=""
            onClick={() => {
              localStorage.removeItem("numbies_user")
              navigate("/login", { replace: true })
            }}
          >
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
