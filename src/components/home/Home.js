import { Link } from "react-router-dom"
import "./Home.css"
import { SharedExpenses } from "../expenses/SharedExpenses"
import { TopCategories } from "../teams/TopCategories"

export const Home = ({ user, expenses, userTeams, setSelectedExpense }) => {
  return (
    <div className="home-container">
      <div className="home-greeting">Hello, {user.firstName}</div>
      <div className="home-cards-container">
        <div className="quick-actions-card">
          <h3 className="card-heading">Quick Actions</h3>
          <div className="links-container">
            <Link to="new-expense" className="home-btn-link">
              <div className="quick-action-btn">Add New Expense</div>
            </Link>
            <Link to="expenses" className="home-btn-link">
              <div
                className="quick-action-btn"
                onClick={() => {
                  setSelectedExpense({})
                }}
              >
                View All Expenses
              </div>
            </Link>
            <Link to="new-team" className="home-btn-link">
              <div className="quick-action-btn">Create New Team</div>
            </Link>
            <Link to="teams" className="home-btn-link">
              <div className="quick-action-btn">View Your Teams</div>
            </Link>
            <Link to="categories" className="home-btn-link">
              <div className="quick-action-btn">Customize Categories</div>
            </Link>
            <Link to={`profile/${user.id}`} className="home-btn-link">
              <div className="quick-action-btn">View Your Profile</div>
            </Link>
          </div>
        </div>
        <div className="personal-snapshot-card">
          <h3 className="card-heading">Personal Finance Snapshot</h3>
          <TopCategories user={user} teamExpenses={expenses} />
        </div>
        <div className="shared-expenses-card">
          <h3 className="card-heading">Recent Shared Expenses</h3>
          <SharedExpenses
            user={user}
            userTeams={userTeams}
            commonUserTeams={userTeams}
          />
        </div>
      </div>
    </div>
  )
}
