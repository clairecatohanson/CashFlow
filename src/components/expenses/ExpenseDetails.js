import { useEffect, useState } from "react"
import {
  calculateAmount,
  formatCurrency,
  formatDate,
  formatDescription,
} from "../../utils/functions"
import { useNavigate } from "react-router-dom"
import { deleteExpense, getExpenses } from "../../managers/expenseManager"
import { getUserById } from "../../managers/userManager"
import { getUserTeamsByTeam } from "../../managers/teamManager"
import { UserDebt } from "./UserDebt"
import {
  deleteUserPayment,
  getPayments,
  getUserPayments,
} from "../../managers/paymentManager"

export const ExpenseDetails = ({
  user,
  selectedExpense,
  setSelectedExpense,
  personalTeam,
  userTeams,
  getAndSetUserExpenses,
  userPayments,
  setUserPayments,
  payments,
  setPayments,
}) => {
  const navigate = useNavigate()

  const [isPersonal, setIsPersonal] = useState(false)
  const [isPayor, setIsPayor] = useState(false)
  const [selectedExpenseAmount, setSelectedExpenseAmount] = useState(0.0)
  const [expenseUserTeam, setExpenseUserTeam] = useState({})
  const [expenseParticipants, setExpenseParticipants] = useState([])

  useEffect(() => {
    if (selectedExpense?.team_Id === personalTeam?.teamId) {
      setIsPersonal(true)
      setIsPayor(true)
    } else {
      setIsPersonal(false)
      setIsPayor(false)

      if (selectedExpense.userId === user.id) {
        setIsPayor(true)
      }
    }
  }, [selectedExpense, personalTeam, user])

  useEffect(() => {
    const amount = calculateAmount(selectedExpense, personalTeam, userTeams)
    setSelectedExpenseAmount(amount)
  }, [selectedExpense, personalTeam, userTeams])

  useEffect(() => {
    const team = userTeams.find((ut) => ut.teamId === selectedExpense.team_Id)
    setExpenseUserTeam(team)
  }, [userTeams, selectedExpense])

  useEffect(() => {
    getUserTeamsByTeam(selectedExpense?.team_Id).then((UTs) =>
      setExpenseParticipants(UTs)
    )
  }, [selectedExpense])

  const expenseDate = new Date(selectedExpense?.date)

  //   const handleDelete = (expense) => {
  //     deleteExpense(expense.id).then(() => {
  //       getAndSetUserExpenses()
  //     })
  //     setSelectedExpense({})
  //   }

  const handleDelete = (expense) => {
    const associatedPayments = payments.filter(
      (p) => p.expenseId === expense.id
    )
    const paymentIds = []
    associatedPayments.map((p) => {
      paymentIds.push(p.id)
    })
    const associatedUserPayments = userPayments.filter((up) =>
      paymentIds.includes(up.paymentId)
    )

    const upPromises = associatedUserPayments.map((up) =>
      deleteUserPayment(up.id)
    )
    Promise.all(upPromises).then(() => {
      getUserPayments().then((upRes) => {
        setUserPayments(upRes)
        deleteExpense(expense.id).then(() => {
          getAndSetUserExpenses()
          setSelectedExpense({})
        })
      })
    })
    getPayments().then((pRes) => {
      setPayments(pRes)
    })
  }

  const renderDetails = (selectedExpense) => {
    if (isPersonal) {
      return (
        <div className="personal-expense-details">
          <h3 className="details-expense-type">Personal Expense</h3>
          <div className="details-date">{formatDate.format(expenseDate)}</div>
          <div className="details-full-amount">
            {selectedExpenseAmount.toLocaleString("en-us", formatCurrency)}
          </div>
          <div className="details-description">
            {formatDescription(selectedExpense.description)}
          </div>
          <div className="btns">
            <button
              className="edit-btn"
              onClick={() => {
                navigate(`/expenses/${selectedExpense.id}/edit`)
              }}
            >
              Edit Expense
            </button>
            <button
              className="delete-btn"
              onClick={() => {
                handleDelete(selectedExpense)
              }}
            >
              Delete Expense
            </button>
          </div>
        </div>
      )
    } else if (isPayor) {
      return (
        <div className="shared-expense-details">
          <h3 className="details-expense-type">Shared Expense</h3>
          <div className="details-team-name">
            Team: {expenseUserTeam.team.name}
          </div>
          <div className="details-payor">Paid by: You</div>
          <div className="details-date">{formatDate.format(expenseDate)}</div>
          <div className="details-full-amount">
            Total Cost:{" "}
            {selectedExpense.amount.toLocaleString("en-us", formatCurrency)}
          </div>
          <div className="details-description">
            {formatDescription(selectedExpense.description)}
          </div>
          <div className="details-fractional-amount">
            Your Share:{" "}
            {selectedExpenseAmount.toLocaleString("en-us", formatCurrency)}
          </div>
          <div className="details-amount-owed">
            {expenseParticipants.map((participantUT) => (
              <UserDebt
                key={`user-${participantUT.userId}`}
                participantUT={participantUT}
                user={user}
                selectedExpense={selectedExpense}
              />
            ))}
          </div>
          <div className="btns">
            <button
              className="edit-btn"
              onClick={() => {
                navigate(`/expenses/${selectedExpense.id}/edit`)
              }}
            >
              Edit Expense
            </button>
            <button
              className="delete-btn"
              onClick={() => {
                handleDelete(selectedExpense)
              }}
            >
              Delete Expense
            </button>
          </div>
        </div>
      )
    } else {
      return <div>Shared Expense, someone else paid</div>
    }
  }

  return (
    <section className="details-card">
      <h3 className="section-heading">Expense Details</h3>
      {selectedExpense?.id ? (
        renderDetails(selectedExpense)
      ) : (
        <div className="none-selected">
          Select an expense to see more details.
        </div>
      )}
    </section>
  )
}
