import { Routes, Route, Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import { Chart, defaults, CategoryScale, TimeScale } from "chart.js/auto"
import { UserProfile } from "../components/profile/UserProfile"
import { getUserById } from "../managers/userManager"
import { EditProfile } from "../components/profile/EditProfile"
import { NewExpense } from "../components/expenses/NewExpense"
import { EditExpense } from "../components/expenses/EditExpense"
import { getUserTeamsByUser } from "../managers/teamManager"
import { NavBar } from "../components/nav/NavBar"
import { Categories } from "../components/categories/Categories"
import { CreateTeam } from "../components/teams/CreateTeam"
import { getPayments } from "../managers/paymentManager"
import { getExpensesWithDetails } from "../managers/expenseManager"
import { AllExpenses } from "../components/expenses/AllExpenses"
import { SettlePayment } from "../components/payments/SettlePayment"
import { getCategories } from "../managers/categoryManager"
import { AllTeams } from "../components/teams/AllTeams"
import { TeamDetails } from "../components/teams/TeamDetails"
import { EditTeam } from "../components/teams/EditTeam"
import { Home } from "../components/home/Home"

export const ApplicationViews = () => {
  const [user, setUser] = useState({})
  const [expenses, setExpenses] = useState([])
  const [payments, setPayments] = useState([])
  const [userTeams, setUserTeams] = useState([])
  const [personalTeam, setPersonalTeam] = useState({})
  const [categories, setCategories] = useState([])
  const [selectedExpense, setSelectedExpense] = useState({})

  useEffect(() => {
    const localNumbiesUser = JSON.parse(localStorage.getItem("numbies_user"))
    if (localNumbiesUser) {
      getUserById(localNumbiesUser.id).then((userObj) => {
        setUser(userObj)
      })
    }

    getPayments().then((res) => {
      setPayments(res)
    })

    getCategories().then((res) => {
      setCategories(res)
    })
  }, [])

  const getAndSetUserTeams = (user) => {
    getUserTeamsByUser(user).then((res) => {
      const selfRemoved = res.filter(
        (userTeam) => userTeam.splitPercent !== 100
      )
      const self = res.find((userTeam) => userTeam.splitPercent === 100)
      setUserTeams(selfRemoved)
      setPersonalTeam(self)
    })
  }
  useEffect(() => {
    getAndSetUserTeams(user)
  }, [user])

  useEffect(() => {
    getAndSetUserExpenses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userTeams, personalTeam])

  const getAndSetUserExpenses = () => {
    const teamIds = [personalTeam?.teamId]
    userTeams.forEach((ut) => {
      teamIds.push(ut.teamId)
    })

    getExpensesWithDetails().then((res) => {
      const userExpenses = res.filter((expense) =>
        teamIds.includes(expense.team_Id)
      )
      userExpenses.sort((a, b) => new Date(b.date) - new Date(a.date))
      setExpenses(userExpenses)
    })
  }
  Chart.register(CategoryScale, TimeScale)
  defaults.maintainAspectRatio = false
  defaults.responsive = true
  defaults.plugins.title.display = true
  defaults.plugins.title.align = "start"
  defaults.plugins.title.font.size = 20
  defaults.plugins.title.color = "black"
  defaults.plugins.legend.maxHeight = 72

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar user={user} setSelectedExpense={setSelectedExpense} />
            <Outlet />
          </>
        }
      >
        <Route
          index
          element={
            <Home
              user={user}
              expenses={expenses}
              userTeams={userTeams}
              setSelectedExpense={setSelectedExpense}
            />
          }
        />
        <Route
          path="expenses"
          element={
            <AllExpenses
              user={user}
              expenses={expenses}
              personalTeam={personalTeam}
              userTeams={userTeams}
              getAndSetUserExpenses={getAndSetUserExpenses}
              setPayments={setPayments}
              selectedExpense={selectedExpense}
              setSelectedExpense={setSelectedExpense}
              categories={categories}
            />
          }
        />
        <Route
          path="new-expense"
          element={
            <NewExpense
              user={user}
              selectedExpense={selectedExpense}
              setSelectedExpense={setSelectedExpense}
              userTeams={userTeams}
              personalTeam={personalTeam}
              categories={categories}
              setCategories={setCategories}
              getAndSetUserExpenses={getAndSetUserExpenses}
            />
          }
        />
        <Route
          path="expenses/:expenseId/edit"
          element={
            <EditExpense
              user={user}
              selectedExpense={selectedExpense}
              setSelectedExpense={setSelectedExpense}
              payments={payments}
              setPayments={setPayments}
              userTeams={userTeams}
              personalTeam={personalTeam}
              categories={categories}
              setCategories={setCategories}
              getAndSetUserExpenses={getAndSetUserExpenses}
            />
          }
        />
        <Route
          path="expenses/:expenseId/settle"
          element={
            <SettlePayment
              user={user}
              payments={payments}
              setPayments={setPayments}
              selectedExpense={selectedExpense}
              setSelectedExpense={setSelectedExpense}
              getAndSetUserExpenses={getAndSetUserExpenses}
            />
          }
        />
        <Route
          path="teams"
          element={<AllTeams user={user} userTeams={userTeams} />}
        />
        <Route
          path="teams/:teamId"
          element={<TeamDetails user={user} categories={categories} />}
        />
        <Route
          path="teams/:teamId/edit"
          element={
            <EditTeam
              user={user}
              setUser={setUser}
              getAndSetUserTeams={getAndSetUserTeams}
            />
          }
        />
        <Route
          path="new-team"
          element={
            <CreateTeam
              user={user}
              setUser={setUser}
              getAndSetUserTeams={getAndSetUserTeams}
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
              expenses={expenses}
              userTeams={userTeams}
              personalTeam={personalTeam}
            />
          }
        />
        <Route
          path="profile/:userId"
          element={
            <UserProfile
              user={user}
              userTeams={userTeams}
              setSelectedExpense={setSelectedExpense}
            />
          }
        />
        <Route
          path="profile/edit"
          element={<EditProfile user={user} setUser={setUser} />}
        />
      </Route>
    </Routes>
  )
}
