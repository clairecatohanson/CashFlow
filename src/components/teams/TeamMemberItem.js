import { Link } from "react-router-dom"

export const TeamMemberItem = ({ ut }) => {
  return (
    <div className="flex items-center space-x-6">
      {/* User Avatar */}
      <Link to={`/profile/${ut.userId}`}>
        <div className="text-3xl">
          <i className="fa-solid fa-user"></i>
        </div>
      </Link>
      {/* Username and Split Percentage */}
      <Link to={`/profile/${ut.userId}`} className="flex flex-col space-x-2">
        {/* Username */}
        <div className="">@{ut.user?.username}</div>
        {/* Split Percentage */}
        <div className="bg-orange-300 p-1 rounded-xl w-12 flex justify-center items-center">
          {ut.splitFraction}%
        </div>
      </Link>
    </div>
  )
}
