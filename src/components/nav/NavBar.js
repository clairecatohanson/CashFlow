import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = ({ setSelectedExpense }) => {
  const navigate = useNavigate()

  return (
    <nav className="nav-container">
      <ul className="nav">
        <li>
          <Link to="/" className="nav-link">
            logo
          </Link>
        </li>
        <div className="nav-items">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li
            className="nav-item"
            onClick={() => {
              setSelectedExpense({})
            }}
          >
            <Link to="/expenses" className="nav-link">
              Your Expenses
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/teams" className="nav-link">
              Your Teams
            </Link>
          </li>
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
