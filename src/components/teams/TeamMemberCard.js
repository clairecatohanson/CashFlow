import { Link } from "react-router-dom"

export const TeamMemberCard = ({ ut }) => {
  return (
    <div className="team-member-item">
      <Link to={`/profile/${ut.userId}`} className="page-link">
        <div className="user-avatar">
          <i className="fa-solid fa-user"></i>
        </div>
      </Link>
      <div className="user-details">
        <Link to={`/profile/${ut.userId}`} className="page-link">
          <div className="username">@{ut.user?.username}</div>
        </Link>
        <div className="user-split">{ut.splitPercent}%</div>
      </div>
    </div>
  )
}
