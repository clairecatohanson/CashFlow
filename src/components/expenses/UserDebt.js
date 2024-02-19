import { useEffect, useState } from "react"
import { getUserById } from "../../managers/userManager"
import {
  calculatePaid,
  calculateShare,
  formatCurrency,
} from "../../utils/functions"
import { useNavigate } from "react-router-dom"

export const UserDebt = ({
  borrowerUT,
  user,
  selectedExpense,
  originalPayor,
}) => {
  const navigate = useNavigate()

  const [participant, setParticipant] = useState({})
  const [userShare, setUserShare] = useState(0.0)
  const [amountPaid, setAmountPaid] = useState(0.0)
  const [userOwed, setUserOwed] = useState(0.0)

  useEffect(() => {
    if (borrowerUT?.id) {
      getUserById(borrowerUT?.userId).then((res) => {
        setParticipant(res)
      })
    }
  }, [borrowerUT, selectedExpense])

  useEffect(() => {
    if (selectedExpense.id && !!participant.userTeams?.length) {
      const participantShare = calculateShare(selectedExpense, participant)
      setUserShare(participantShare)
    }

    let paid = 0
    if (selectedExpense.payments && participant.id) {
      paid = calculatePaid(selectedExpense, participant)
    }
    setAmountPaid(paid)
  }, [participant, selectedExpense])

  useEffect(() => {
    const owed = userShare - amountPaid
    setUserOwed(owed)
  }, [userShare, amountPaid])

  const renderParticipantDebt = () => {
    return (
      <div className="flex flex-col items-center mb-4">
        <div>
          {participant.firstName} has paid you{" "}
          <span className="font-semibold">
            {amountPaid.toLocaleString("en-us", formatCurrency)}
          </span>{" "}
          and
          <br></br>currently owes you{" "}
          <span className="font-semibold">
            {userOwed.toLocaleString("en-us", formatCurrency)}
          </span>
        </div>
      </div>
    )
  }

  const renderUserDebt = () => {
    return (
      <div className="flex flex-col items-center">
        <div className="mb-4">
          You have paid {originalPayor.firstName}{" "}
          <span className="font-semibold">
            {amountPaid.toLocaleString("en-us", formatCurrency)}
          </span>{" "}
          <br></br>and you currently owe{" "}
          <span className="font-semibold">
            {userOwed.toLocaleString("en-us", formatCurrency)}
          </span>
        </div>
        {userOwed > 0.0044 ? (
          <div className="flex justify-center space-x-10">
            <button
              className="bg-teal-800 text-gray-100 rounded-lg py-4 px-8 hover:-translate-y-0.5 hover:duration-150 hover:shadow-md hover:shadow-gray-400"
              onClick={() => {
                navigate(`/expenses/${selectedExpense.id}/settle`)
              }}
            >
              Settle Expense
            </button>
          </div>
        ) : (
          <div className="mt-6 text-center">
            Success! You have settled your portion of this expense.
          </div>
        )}
      </div>
    )
  }

  return participant.id !== user.id ? renderParticipantDebt() : renderUserDebt()
}
