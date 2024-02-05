import { Link } from "react-router-dom"
import { TeamList } from "./TeamList"

export const AllTeams = ({ userTeams }) => {
  return (
    <div className="all-teams-container">
      <h2 className="page-heading">Your Teams</h2>
      <div className="all-teams">{<TeamList userTeams={userTeams} />}</div>
      <div className="btns-container">
        <button className="create-btn">
          <Link to="/new-team" className="btn-link">
            Create a New Team
          </Link>
        </button>
      </div>
    </div>
  )
}
