import { Link } from "react-router-dom"
// import "./Home.css"
import { SharedExpenses } from "../expenses/SharedExpenses"
import { TopCategories } from "../teams/TopCategories"

export const Home = ({ user, expenses, userTeams, setSelectedExpense }) => {
  return (
    // Global Container
    <div className="min-h-screen bg-gray-300 mt-0 pb-10">
      {/* Greeting */}
      <div className="font-medium tracking-normal-wide text-5xl italic text-center py-14">
        Hello, {user.firstName}
      </div>
      {/* Top 2 Cards Container */}
      <div className="flex flex-col w-4/5 mx-auto mb-6 justify-center items-start space-y-6 md:w-[700px] lg:flex-row lg:flex-wrap lg:space-y-0 lg:w-11/12">
        {/* Quick Actions */}
        <section className="bg-gray-100 w-full rounded-md p-3 lg:w-2/5 lg:mr-4 xl:w-[590px] lg:mb-4 shadow-xl shadow-gray-500">
          <h3 className="text-xl my-4 text-center font-semibold">
            Quick Actions
          </h3>
          {/* Links Container */}
          <div className="flex flex-wrap justify-center items-center space-x-4 space-y-4 mb-4">
            <Link className="" to="new-expense">
              <div className="hover:bg-blue-800 w-32 h-16 text-center text-teal-100 font-light shadow-lg shadow-gray-300 bg-blue-300 rounded-md p-2 mt-4 mb-0 mr-0 ml-4">
                Add New Expense
              </div>
            </Link>
            <Link className="" to="expenses">
              <div
                className="hover:bg-blue-800 w-32 h-16 text-center text-teal-100 font-light shadow-lg shadow-gray-300 bg-blue-300 rounded-md p-2"
                onClick={() => {
                  setSelectedExpense({})
                }}
              >
                View All Expenses
              </div>
            </Link>
            <Link className="" to="new-team">
              <div className="hover:bg-blue-800 w-32 h-16 text-center text-teal-100 font-light shadow-lg shadow-gray-300 bg-blue-300 rounded-md p-2">
                Create New Team
              </div>
            </Link>
            <Link className="" to="teams">
              <div className="hover:bg-blue-800 w-32 h-16 text-center text-teal-100 font-light shadow-lg shadow-gray-300 bg-blue-300 rounded-md p-2">
                View Your Teams
              </div>
            </Link>
            <Link className="" to="categories">
              <div className="hover:bg-blue-800 w-32 h-16 text-center text-teal-100 font-light shadow-lg shadow-gray-300 bg-blue-300 rounded-md p-2">
                Customize Categories
              </div>
            </Link>
            <Link className="" to={`profile/${user.id}`}>
              <div className="hover:bg-blue-800 w-32 h-16 text-center text-teal-100 font-light shadow-lg shadow-gray-300 bg-blue-300 rounded-md p-2">
                View Your Profile
              </div>
            </Link>
          </div>
        </section>
        {/* Personal Finance Snapshot */}
        <section className="bg-gray-100 w-full rounded-md p-3 lg:w-2/5 xl:w-[590px] lg:mb-4 shadow-xl shadow-gray-500">
          <h3 className="text-xl my-4 text-center font-semibold">
            Personal Financial Snapshot
          </h3>
          <TopCategories user={user} teamExpenses={expenses} />
        </section>
        {/* Shared Expenses Snapshot */}
      </div>
      <section className="bg-gray-100 w-4/5 rounded-md p-3 md:w-[700px] lg:w-[800px] mx-auto shadow-xl shadow-gray-500">
        <h3 className="text-xl my-4 text-center font-semibold">
          Recent Shared Expenses
        </h3>
        <SharedExpenses
          setSelectedExpense={setSelectedExpense}
          commonUserTeams={userTeams}
        />
      </section>
    </div>
  )
}
