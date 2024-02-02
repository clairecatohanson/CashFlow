import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "./Payments.css"
import { getExpenseById } from "../../managers/expenseManager"
import {
  calculatePaid,
  calculateShare,
  formatCurrency,
  formatDate,
  formatDescription,
} from "../../utils/functions"
import { getUserTeamsByUser } from "../../managers/teamManager"
import {
  createPayment,
  createUserPayment,
  getPayments,
  getUserPayments,
} from "../../managers/paymentManager"

export const SettlePayment = ({
  user,
  setPayments,
  setUserPayments,
  setSelectedExpense,
}) => {
  const { expenseId } = useParams()
  const navigate = useNavigate()

  const [activeExpense, setActiveExpense] = useState({})
  const [payorShare, setPayorShare] = useState(0.0)
  const [payorPaid, setPayorPaid] = useState(0.0)
  const [payorOwes, setPayorOwes] = useState(0.0)
  const [payorUserTeam, setPayorUserTeam] = useState({})
  const [amountRadio, setAmountRadio] = useState("")
  const [amountInput, setAmountInput] = useState("")

  useEffect(() => {
    getExpenseById(expenseId).then((res) => {
      setActiveExpense(res)
    })
  }, [expenseId])

  useEffect(() => {
    getUserTeamsByUser(user).then((UTs) => {
      if (UTs.length) {
        const fractionalShare = calculateShare(activeExpense, {}, UTs)
        setPayorShare(fractionalShare)
      }
      const payorUT = UTs.find((ut) => ut.teamId === activeExpense.team_Id)
      setPayorUserTeam(payorUT)
    })

    if (activeExpense.payments?.length) {
      const paid = calculatePaid(activeExpense, user)
      setPayorPaid(paid)
    } else {
      setPayorPaid(0)
    }
  }, [user, activeExpense])

  useEffect(() => {
    const owes = payorShare - payorPaid
    setPayorOwes(owes)
  }, [payorShare, payorPaid])

  const handlePay = () => {
    let payAmount = 0
    if (amountRadio === "full-amount") {
      payAmount = payorOwes
    } else if (amountRadio === "custom-amount-radio") {
      payAmount = amountInput
    }

    const datetime = new Date().toISOString()

    const newPayment = {
      expenseId: activeExpense.id,
      amount: payAmount,
      datePaid: datetime,
    }

    createPayment(newPayment).then((paymentRes) => {
      const newUserPayment = {
        userId: user.id,
        paymentId: paymentRes.id,
        payeeId: activeExpense.userId,
      }
      createUserPayment(newUserPayment).then((upRes) => {
        setSelectedExpense({})
        navigate("/expenses")
      })
    })
  }

  return (
    <div className="settle-expense-container">
      <h2 className="page-heading">Settle Expense</h2>
      {activeExpense.id && (
        <>
          <div className="expense-info">
            <div className="expense-total-cost">
              Total Cost:{" "}
              {activeExpense.amount.toLocaleString("en-us", formatCurrency)}
            </div>
            <div className="expense-description">
              {formatDescription(activeExpense.description)}
            </div>
            <div className="expense-date">
              {formatDate.format(new Date(activeExpense.date))}
            </div>
          </div>
          <div className="participant-info">
            <div className="user-team">
              Based on your percentage share of {payorUserTeam?.splitPercent}%
              in the team, {payorUserTeam?.team?.name},
            </div>
            <div className="user-share">
              you are responsible for{" "}
              {payorShare?.toLocaleString("en-us", formatCurrency)} for this
              expense.
            </div>
            <div className="user-paid">
              You have paid {payorPaid?.toLocaleString("en-us", formatCurrency)}{" "}
              towards this expense.
            </div>
          </div>
          <div className="participant-details">
            <div className="participant-title">You</div>
            <div className="participant-avatar">Avatar</div>
          </div>
          <div className="amount-details">
            <div className="amount-title">owe</div>
            <div className="amount-amount">
              {payorOwes?.toLocaleString("en-us", formatCurrency)}
            </div>
          </div>
          <div className="payee-details">
            <div className="payee-title">{activeExpense.user.firstName}</div>
            <div className="payee-avatar">Avatar</div>
          </div>
          <div className="payment-radios">
            <label htmlFor="full-amount">Pay Full Amount</label>
            <input
              type="radio"
              name="payment-amount"
              id="full-amount"
              value={amountRadio}
              onChange={(event) => {
                setAmountRadio(event.target.id)
              }}
            />
            <div className="custom-amount">
              <label htmlFor="custom-amount-radio">Enter a Custom Amount</label>
              <input
                type="radio"
                name="payment-amount"
                id="custom-amount-radio"
                value={amountRadio}
                onChange={(event) => {
                  setAmountRadio(event.target.id)
                }}
              />
              <label htmlFor="custom-amount-input">$</label>
              <input
                type="number"
                id="custom-amount-input"
                disabled={amountRadio !== "custom-amount-radio"}
                min="0"
                step="0.01"
                value={amountInput}
                onChange={(event) => setAmountInput(event.target.value)}
              />
            </div>
          </div>
          <div className="btns-container">
            <button className="submit-btn" onClick={handlePay}>
              Pay Now
            </button>
          </div>
        </>
      )}
    </div>
  )
}
