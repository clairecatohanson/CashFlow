import { useEffect, useState } from "react"
import { getUserById } from "../../managers/userManager"
import { calculateAmount, formatCurrency } from "../../utils/functions"

export const UserDebt = ({ participantUT, user, selectedExpense }) => {
  const [participant, setParticipant] = useState({})
  const [userShare, setUserShare] = useState(0.0)
  const [amountPaid, setAmountPaid] = useState(0.0)
  const [userOwed, setUserOwed] = useState(0.0)

  useEffect(() => {
    getUserById(participantUT?.userId).then((res) => {
      setParticipant(res)
    })
  }, [participantUT])

  useEffect(() => {
    const outsideUserTeams = participant.userTeams
    if (outsideUserTeams?.length) {
      const outsideShare = calculateAmount(
        selectedExpense,
        {},
        outsideUserTeams
      )
      setUserShare(outsideShare)
    }

    if (selectedExpense.payments?.length) {
      const paid = calculatePaid(selectedExpense, participant)
      setAmountPaid(paid)
    }
  }, [participant, selectedExpense])

  useEffect(() => {
    const owed = userShare - amountPaid
    setUserOwed(owed)
  }, [userShare, amountPaid])

  const calculatePaid = (selectedExpense, participant) => {
    let amountPaid = 0
    const outsideUserPayments = participant.userPayments

    const expensePaymentIds = []
    selectedExpense.payments.map((p) => expensePaymentIds.push(p.id))
    if (outsideUserPayments?.length) {
      const madeUserPayments = outsideUserPayments.filter((up) =>
        expensePaymentIds.includes(up.paymentId)
      )
      const madePaymentIds = []
      madeUserPayments.map((up) => madePaymentIds.push(up.paymentId))
      const madePayments = selectedExpense.payments.filter((p) =>
        madePaymentIds.includes(p.id)
      )
      madePayments.map((p) => (amountPaid += p.amount))

      return amountPaid
    } else {
      return amountPaid
    }
  }

  const renderDebt = () => {
    if (participant.id !== user.id) {
      return (
        <div className="debt">
          {participant.firstName} has paid you{" "}
          {amountPaid.toLocaleString("en-us", formatCurrency)} and currently
          owes you {userOwed.toLocaleString("en-us", formatCurrency)}
        </div>
      )
    }
  }

  return renderDebt()
}
