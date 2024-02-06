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
    if (borrowerUT.id) {
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
      <div className="participant-debt">
        <div className="debt">
          {participant.firstName} has paid you{" "}
          {amountPaid.toLocaleString("en-us", formatCurrency)} and currently
          owes you {userOwed.toLocaleString("en-us", formatCurrency)}
        </div>
      </div>
    )
  }

  const renderUserDebt = () => {
    return (
      <div className="user-debt">
        <div className="debt">
          You have paid {originalPayor?.firstName}{" "}
          {amountPaid.toLocaleString("en-us", formatCurrency)} and you currently
          owe {userOwed.toLocaleString("en-us", formatCurrency)}
        </div>
        {userOwed > 0.0044 ? (
          <div className="btns">
            <button
              className="settle-btn"
              onClick={() => {
                navigate(`/expenses/${selectedExpense.id}/settle`)
              }}
            >
              Settle Expense
            </button>
          </div>
        ) : (
          <div className="nothing-owed">
            Success! You have settled your portion of this expense.
          </div>
        )}
      </div>
    )
  }

  return participant.id !== user.id ? renderParticipantDebt() : renderUserDebt()
}
