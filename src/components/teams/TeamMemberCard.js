export const TeamMemberCard = ({ ut }) => {
  return (
    <div className="team-member-item">
      <div className="user-avatar">
        <i className="fa-solid fa-user"></i>
      </div>
      <div className="user-details">
        <div className="username">{ut.user?.username}</div>
        <div className="user-split">{ut.splitPercent}%</div>
      </div>
    </div>
  )
}
