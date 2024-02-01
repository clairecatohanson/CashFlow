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
import { CreateTeam } from "../components/teams/CreateTeam"
import { getPayments, getUserPayments } from "../managers/paymentManager"
import { getExpenses } from "../managers/expenseManager"
import { Expenses } from "../components/expenses/Expenses"

export const ApplicationViews = () => {
  const [user, setUser] = useState({})
  const [expense, setExpense] = useState({})
  const [expenses, setExpenses] = useState([])
  const [payments, setPayments] = useState([])
  const [userPayments, setUserPayments] = useState([])
  const [userTeams, setUserTeams] = useState([])
  const [personalTeam, setPersonalTeam] = useState({})
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const localNumbiesUser = JSON.parse(localStorage.getItem("numbies_user"))
    if (localNumbiesUser) {
      getUserById(localNumbiesUser.id).then((userObj) => {
        setUser(userObj)
      })
    }

    getExpenses().then((res) => {
      setExpenses(res)
    })

    getPayments().then((res) => {
      setPayments(res)
    })

    getUserPayments().then((res) => {
      setUserPayments(res)
    })
  }, [])

  useEffect(() => {
    getUserTeamsByUser(user).then((res) => {
      const selfRemoved = res.filter(
        (userTeam) => userTeam.splitPercent !== 100
      )
      const self = res.find((userTeam) => userTeam.splitPercent === 100)
      setUserTeams(selfRemoved)
      setPersonalTeam(self)
    })
  }, [user])

  useEffect(() => {
    getAndSetUserExpenses()
  }, [userTeams, personalTeam])

  const getAndSetUserExpenses = () => {
    const teamIds = [personalTeam?.teamId]
    userTeams.map((ut) => {
      teamIds.push(ut.teamId)
    })

    getExpenses().then((res) => {
      const userExpenses = res.filter((expense) =>
        teamIds.includes(expense.team_Id)
      )
      setExpenses(userExpenses)
    })
  }

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
        <Route
          path="expenses"
          element={
            <Expenses
              user={user}
              expenses={expenses}
              personalTeam={personalTeam}
              userTeams={userTeams}
              getAndSetUserExpenses={getAndSetUserExpenses}
              userPayments={userPayments}
              setUserPayments={setUserPayments}
              payments={payments}
              setPayments={setPayments}
              setExpenses={setExpenses}
            />
          }
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
              categories={categories}
              setCategories={setCategories}
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
              setExpenses={setExpenses}
              payments={payments}
              setPayments={setPayments}
              userPayments={userPayments}
              setUserPayments={setUserPayments}
              userTeams={userTeams}
              personalTeam={personalTeam}
              categories={categories}
              setCategories={setCategories}
            />
          }
        />
        <Route
          path="categories"
          element={
            <Categories
              user={user}
              categories={categories}
              setCategories={setCategories}
            />
          }
        />
        <Route path="new-team" element={<CreateTeam user={user} />} />
        <Route path="profile/:userId" element={<UserProfile user={user} />} />
        <Route
          path="profile/edit"
          element={<EditProfile user={user} setUser={setUser} />}
        />
      </Route>
    </Routes>
  )
}
