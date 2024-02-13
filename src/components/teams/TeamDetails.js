import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getUserTeamsByTeam } from "../../managers/teamManager"
import { CurrentTeamMembers } from "./CurrentTeamMembers"
import { TopCategories } from "./TopCategories"
import { NetTeamDebts } from "./NetTeamDebts"
import { getExpensesByTeam } from "../../managers/expenseManager"

export const TeamDetails = ({ user }) => {
  const { teamId } = useParams()
  const navigate = useNavigate()

  const [currentUserTeams, setCurrentUserTeams] = useState([])
  const [teamExpenses, setTeamExpenses] = useState([])

  useEffect(() => {
    getUserTeamsByTeam(teamId).then((res) => {
      setCurrentUserTeams(res)
    })

    getExpensesByTeam(teamId).then((res) => {
      setTeamExpenses(res)
    })
  }, [teamId])

  return (
    // Global Container
    <div className="bg-gray-100 min-h-screen text-orange-800 pb-12">
      {/* Heading and Buttons Container */}
      <div className="flex flex-col items-center justify-between md:flex-row md:items-center w-full bg-gray-200 p-6 mx-auto">
        <div className="m-2 text-center md:text-left">
          <h2 className="text-4xl mb-2">Team Details</h2>
          <h3 className="text-xl">{currentUserTeams[0]?.team.name}</h3>
        </div>
        {/* Button */}
        <div className="m-2">
          <button
            className="p-4 bg-orange-300 rounded-md text-lg shadow-orange-700 shadow hover:-translate-y-0.5 duration-150"
            onClick={() => {
              navigate(`/teams/${teamId}/edit`)
            }}
          >
            Edit Team
          </button>
        </div>
      </div>
      {/* Top 2 Cards Container */}
      <div className="flex flex-col w-4/5 mx-auto mt-10 mb-6 justify-center items-start space-y-6 md:w-[700px] lg:flex-row lg:flex-wrap lg:space-y-0 lg:w-11/12">
        {/* Team Members Card */}
        <section className="bg-gray-100 w-full rounded-md p-3 lg:w-2/5 lg:mr-4 xl:w-[590px] lg:mb-4 shadow-xl shadow-gray-500">
          <h3 className="text-xl my-4 text-center font-semibold">
            Team Members
          </h3>
          <CurrentTeamMembers currentUserTeams={currentUserTeams} />
        </section>
        {/* Team Spending Snapshot Card */}
        <section className="bg-gray-100 w-full rounded-md p-3 lg:w-2/5 xl:w-[590px] lg:mb-4 shadow-xl shadow-gray-500">
          <h3 className="text-xl my-4 text-center font-semibold">
            Team Financial Snapshot
          </h3>
          <TopCategories user={user} teamExpenses={teamExpenses} />
        </section>
      </div>
      {/* Team Net Debts Card */}
      <section className="bg-gray-100 w-4/5 rounded-md p-3 md:w-[700px] lg:w-[800px] mx-auto shadow-xl shadow-gray-500">
        <h3 className="text-xl my-4 text-center font-semibold">
          Net Unsettled Debts
        </h3>
        <NetTeamDebts
          user={user}
          currentUserTeams={currentUserTeams}
          teamExpenses={teamExpenses}
        />
      </section>
    </div>
  )
}
