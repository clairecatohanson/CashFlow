import { Link, useNavigate } from "react-router-dom"
// import "./NavBar.css"

export const NavBar = ({ user, setSelectedExpense }) => {
  const navigate = useNavigate()

  return (
    // Nav Bar
    <nav>
      <ul className="flex justify-between min-h-12 bg-teal-500 p-2">
        {/* Logo */}
        <li className="flex justify-left items-center w-48">
          <Link to="/">
            <div className="w-10 h-10  text-gray-900 text-md text-center rounded"></div>
          </Link>
        </li>
        {/* Nav Buttons Container */}
        <div className="flex justify-between w-96">
          {/* Home */}
          <li className="flex justify-center items-center">
            <Link to="/">
              <div className="w-24 h-10 hover:text-orange-100 bg-teal-500 hover:bg-orange-500 text-gray-100 text-md text-center rounded flex items-center justify-center">
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
              <div className="w-24 h-10 hover:text-orange-100 bg-teal-500 hover:bg-orange-500 text-gray-100 text-md text-center rounded flex items-center justify-center">
                <div>Expenses</div>
              </div>
            </Link>
          </li>
          {/* Teams */}
          <li className="flex justify-center items-center">
            <Link to="/teams">
              <div className="w-24 h-10 hover:text-orange-100 bg-teal-500 hover:bg-orange-500 text-gray-100 text-md text-center rounded flex items-center justify-center">
                <div>Teams</div>
              </div>
            </Link>
          </li>
          {/* Categories */}
          <li className="flex justify-center items-center">
            <Link to="/categories">
              <div className="w-24 h-10 hover:text-orange-100 bg-teal-500 hover:bg-orange-500 text-gray-100 text-md text-center rounded flex items-center justify-center">
                <div>Categories</div>
              </div>
            </Link>
          </li>
        </div>
        {/* Profile & Logout Buttons Container */}
        <div className="flex justify-end w-48 space-x-2 md:space-x-4">
          {/* Profile */}
          <li className="flex justify-center items-center">
            <Link to={`/profile/${user.id}`}>
              <div className="w-20 h-10 hover:text-orange-100 bg-teal-500 hover:bg-orange-500 text-gray-100 text-md text-center rounded flex items-center justify-center">
                <div>Profile</div>
              </div>
            </Link>
          </li>
          {/* Logout */}
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
        </div>
      </ul>
    </nav>
  )
}
