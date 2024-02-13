import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
// import "./Payments.css"
import { getExpenseById } from "../../managers/expenseManager"
import {
  calculatePaid,
  calculateShare,
  formatCurrency,
  formatDate,
  formatDescription,
} from "../../utils/functions"
import { getUserTeamsByUser } from "../../managers/teamManager"
import { createPayment, getPayments } from "../../managers/paymentManager"

export const SettlePayment = ({
  user,
  setPayments,
  selectedExpense,
  setSelectedExpense,
  getAndSetUserExpenses,
}) => {
  const { expenseId } = useParams()
  const navigate = useNavigate()

  const [payorShare, setPayorShare] = useState(0.0)
  const [payorPaid, setPayorPaid] = useState(0.0)
  const [payorOwes, setPayorOwes] = useState(0.0)
  const [payorUserTeam, setPayorUserTeam] = useState({})
  const [amountRadio, setAmountRadio] = useState("")
  const [amountInput, setAmountInput] = useState("")

  useEffect(() => {
    getExpenseById(expenseId).then((res) => {
      setSelectedExpense(res)
    })
  }, [expenseId])

  useEffect(() => {
    getUserTeamsByUser(user).then((UTs) => {
      if (UTs.length) {
        const fractionalShare = calculateShare(selectedExpense, user)
        setPayorShare(fractionalShare)
      }
      const payorUT = UTs.find((ut) => ut.teamId === selectedExpense.team_Id)
      setPayorUserTeam(payorUT)
    })

    if (selectedExpense.payments?.length) {
      const paid = calculatePaid(selectedExpense, user)
      setPayorPaid(paid)
    } else {
      setPayorPaid(0)
    }
  }, [user, selectedExpense])

  useEffect(() => {
    const owes = payorShare - payorPaid
    setPayorOwes(owes)
  }, [payorShare, payorPaid])

  const handlePay = () => {
    let payAmount = 0
    if (amountRadio === "full-amount") {
      payAmount = payorOwes
    } else if (amountRadio === "custom-amount-radio") {
      payAmount = parseInt(amountInput)
    }

    const datetime = new Date().toISOString()

    const newPayment = {
      expenseId: selectedExpense.id,
      amount: payAmount,
      datePaid: datetime,
      userId: user.id,
    }

    createPayment(newPayment).then(() => {
      getPayments().then((pRes) => {
        setPayments(pRes)
        getExpenseById(selectedExpense.id).then((seRes) => {
          setSelectedExpense(seRes)
          getAndSetUserExpenses()
          navigate("/expenses")
        })
      })
    })
  }

  return (
    // Global Container
    <div className="bg-gray-100 min-h-screen text-orange-800">
      {/* Header Container */}
      <div className="mb-2 text-center md:text-left w-full bg-gray-200 p-6">
        <h2 className="text-4xl mb-2">Settle Expense</h2>
        <h3 className="text-xl">Pay for your portion of this expense</h3>
      </div>
      {selectedExpense.id && (
        <>
          {/* Expense Details Container */}
          <div className="p-4 mx-2 md:w-4/5 md:text-xl flex justify-between md:mx-auto border-2 border-orange-700 rounded-lg bg-orange-200 text-lg text-gray-800 md:p-8 my-12">
            {/* Date */}
            <div className="">{formatDate(selectedExpense.date).withYear}</div>
            {/* Description */}
            <div className="">
              {formatDescription(selectedExpense.description)}
            </div>
            {/* Total Cost */}
            <div className="">
              {selectedExpense.amount.toLocaleString("en-us", formatCurrency)}
            </div>
          </div>
          {/* Participant & Team Details */}
          <div className="">
            <div className="text-center leading-[3rem] md:leading-normal text-lg md:text-xl tracking-wide">
              Based on your percentage share of{" "}
              <span className="font-semibold bg-orange-300 p-2 rounded-lg">
                {payorUserTeam?.splitPercent}%
              </span>{" "}
              in the team{" "}
              <span className="font-semibold bg-orange-300 px-2 md:p-2 rounded-lg inline-block">
                {payorUserTeam?.team?.name}
              </span>
            </div>
            <div className="text-center leading-[3rem] md:leading-normal text-lg md:text-xl tracking-wide mt-4 mb-8">
              you are responsible for{" "}
              <span className="text-2xl font-bold text-teal-600">
                {payorShare.toLocaleString("en-us", formatCurrency)}
              </span>{" "}
              for this expense.
            </div>
            <div className="text-center leading-[3rem] md:leading-normal text-lg md:text-xl tracking-wide mb-8">
              You have paid{" "}
              <span className="text-2xl font-bold text-teal-600">
                {payorPaid.toLocaleString("en-us", formatCurrency)}
              </span>{" "}
              towards this expense.
            </div>
          </div>
          {/* Amount Owed Container */}
          <div className="flex justify-center items-start space-x-12 md:space-x-48">
            <div className="flex flex-col justify-center items-center space-y-2">
              <div className="text-3xl">You</div>
              <div className="text-8xl">
                <i className="fa-solid fa-user"></i>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center space-y-4 text-3xl">
              <div>owe</div>
              <div className="font-bold bg-orange-300 p-2 rounded-xl">
                {payorOwes.toLocaleString("en-us", formatCurrency)}
              </div>
            </div>
            <div className="flex flex-col justify-center items-center space-y-2">
              <div className="text-3xl">{selectedExpense.user.firstName}</div>
              <div className="text-8xl">
                <i className="fa-solid fa-user"></i>
              </div>
            </div>
          </div>
          {/* Payment Radio Options */}
          <div className="flex justify-between items-start w-96 md:w-[500px] mx-auto mt-20 md:text-lg">
            {/* Pay Full Amount */}
            <div className="flex space-x-2 w-1/2">
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
            </div>
            {/* Pay Custom Amount Container */}
            <div className="flex flex-col items-start md:items-center space-y-2 w-1/2">
              {/* Pay Custom Amount Radio */}
              <div className="flex space-x-2">
                <label htmlFor="custom-amount-radio" className="ml-3">
                  Enter a Custom Amount
                </label>
                <input
                  type="radio"
                  name="payment-amount"
                  id="custom-amount-radio"
                  value={amountRadio}
                  onChange={(event) => {
                    setAmountRadio(event.target.id)
                  }}
                />
              </div>
              {/* Custom Amount Input */}
              <div>
                <label htmlFor="custom-amount-input">$</label>
                <input
                  type="number"
                  id="custom-amount-input"
                  className="text-center h-10 disabled:bg-gray-200 disabled:cursor-no-drop bg-white focus:cursor-"
                  disabled={amountRadio !== "custom-amount-radio"}
                  min="0"
                  step="0.01"
                  value={amountInput}
                  onChange={(event) => setAmountInput(event.target.value)}
                />
              </div>
            </div>
          </div>
          {/* Buttons Container */}
          <div className="flex justify-center mt-12">
            <button
              className="py-4 px-8 bg-blue-500 text-white rounded-md text-lg shadow-orange-700 shadow-md hover:-translate-y-0.5 duration-150"
              onClick={handlePay}
            >
              Pay Now
            </button>
          </div>
        </>
      )}
    </div>
  )
}
