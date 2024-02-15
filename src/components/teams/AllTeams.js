import { Link } from "react-router-dom"
import { TeamList } from "./TeamList"

export const AllTeams = ({ userTeams }) => {
  return (
    // Global Container
    <div className="min-h-screen bg-gray-100">
      {/* Heading Container */}
      <div className="mb-2 text-center md:text-left w-full bg-gray-200 p-6">
        <h2 className="text-4xl mb-2">Teams</h2>
        <h3 className="text-xl">All of your expense sharing teams</h3>
      </div>
      {/* Team List Container */}
      <div className="text-teal-800 m-8 bg-white rounded-md shadow-gray-300 shadow-md p-12">
        {<TeamList userTeams={userTeams} />}
      </div>
      <div className="flex justify-center my-12">
        <button className="p-4 bg-orange-300 rounded-md text-lg shadow-orange-700 shadow hover:-translate-y-0.5 duration-150">
          <Link to="/new-team">Create a New Team</Link>
        </button>
      </div>
    </div>
  )
}
