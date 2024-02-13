import { Link, useNavigate } from "react-router-dom"
// import "./NavBar.css"

export const NavBar = ({ setSelectedExpense }) => {
  const navigate = useNavigate()

  return (
    // Nav Bar
    <nav>
      <ul className="flex justify-between min-h-12 bg-teal-500 p-2">
        {/* Logo */}
        <li className="flex justify-center items-center">
          <Link to="/">
            <div className="w-10 h-10 bg-orange-100 text-gray-900 text-md text-center rounded">
              Logo
            </div>
          </Link>
        </li>
        {/* Nav Buttons Container */}
        <div className="flex justify-between w-72 md:w-96">
          {/* Home */}
          <li className="flex justify-center items-center">
            <Link to="/">
              <div className="w-20 h-10 hover:text-orange-100 bg-teal-500 hover:bg-orange-500 text-gray-100 text-md text-center rounded flex items-center justify-center">
                <div>Home</div>
              </div>
            </Link>
          </li>
          {/* Expenses */}
          <li className="flex justify-center items-center">
            <Link
              to="/expenses"
              onClick={() => {
                setSelectedExpense({})
              }}
            >
              <div className="w-20 h-10 hover:text-orange-100 bg-teal-500 hover:bg-orange-500 text-gray-100 text-md text-center rounded flex items-center justify-center">
                <div>Expenses</div>
              </div>
            </Link>
          </li>
          {/* Teams */}
          <li className="flex justify-center items-center">
            <Link to="/teams">
              <div className="w-20 h-10 hover:text-orange-100 bg-teal-500 hover:bg-orange-500 text-gray-100 text-md text-center rounded flex items-center justify-center">
                <div>Teams</div>
              </div>
            </Link>
          </li>
        </div>
        {/* Logout Button */}
        <li className="flex justify-center items-center">
          <Link
            to=""
            onClick={() => {
              localStorage.removeItem("numbies_user")
              navigate("/login", { replace: true })
            }}
          >
            <div className="w-10 h-10 bg-orange-100 hover:bg-orange-500 hover:text-orange-100 text-gray-900 text-md text-center rounded flex items-center justify-center">
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
