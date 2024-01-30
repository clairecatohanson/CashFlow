import { Routes, Route, Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import { UserProfile } from "../components/profile/UserProfile"
import { getUserById } from "../managers/userManager"
import { EditProfile } from "../components/profile/EditProfile"
import { NewExpense } from "../components/expenses/NewExpense"
import { EditExpense } from "../components/expenses/EditExpense"
import { getUserTeamsByUser } from "../managers/teamManager"
import { NavBar } from "../components/nav/NavBar"
import { Categories } from "../components/categories/Categories"

export const ApplicationViews = () => {
  const [user, setUser] = useState({})
  const [expense, setExpense] = useState({})
  const [userTeams, setUserTeams] = useState([])
  const [personalTeam, setPersonalTeam] = useState({})

  useEffect(() => {
    const localNumbiesUser = JSON.parse(localStorage.getItem("numbies_user"))
    if (localNumbiesUser) {
      getUserById(localNumbiesUser.id).then((userObj) => {
        setUser(userObj)
      })
    }
  }, [])
  useEffect(() => {
    getUserTeamsByUser(user).then((res) => {
      const selfRemoved = res.filter((userTeam) => userTeam.splitFraction !== 1)
      const self = res.find((userTeam) => userTeam.splitFraction === 1)
      setUserTeams(selfRemoved)
      setPersonalTeam(self)
    })
  }, [user])

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route path="profile/:userId" element={<UserProfile user={user} />} />
        <Route
          path="profile/edit"
          element={<EditProfile user={user} setUser={setUser} />}
        />
        <Route
          path="new-expense"
          element={
            <NewExpense
              user={user}
              expense={expense}
              setExpense={setExpense}
              userTeams={userTeams}
              personalTeam={personalTeam}
            />
          }
        />
        <Route
          path="expenses/:expenseId/edit"
          element={
            <EditExpense
              user={user}
              expense={expense}
              setExpense={setExpense}
              userTeams={userTeams}
              personalTeam={personalTeam}
            />
          }
        />
        <Route path="categories" element={<Categories user={user} />} />
      </Route>
    </Routes>
  )
}
