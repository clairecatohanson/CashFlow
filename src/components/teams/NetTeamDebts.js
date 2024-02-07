import { useEffect, useState } from "react"
import { formatCurrency } from "../../utils/functions"

export const NetTeamDebts = ({ user, currentUserTeams, teamExpenses }) => {
  const [teamDebts, setTeamDebts] = useState([])

  useEffect(() => {
    const teamDebtDetails = []
    if (currentUserTeams && teamExpenses && user) {
      const myUserTeam = currentUserTeams.find((ut) => ut.userId === user.id)
      const otherUserTeams = currentUserTeams.filter(
        (ut) => ut.userId !== user.id
      )
      const expensesPaidByMe = teamExpenses.filter((e) => e.userId === user.id)
      let sumPaidByMe = 0
      expensesPaidByMe.forEach((e) => (sumPaidByMe += e.amount))

      otherUserTeams.forEach((otherUT) => {
        const expensesPaidByOther = teamExpenses.filter(
          (e) => e.userId === otherUT.userId
        )

        let sumPaidByOther = 0
        expensesPaidByOther.forEach((e) => {
          sumPaidByOther += e.amount
        })

        const amountOwedToOther =
          (sumPaidByOther * myUserTeam?.splitPercent) / 100

        let paidToOtherByMe = 0
        expensesPaidByOther.forEach((e) => {
          const myExpensePayments = e.payments.filter(
            (p) => p.userId === user.id
          )
          myExpensePayments.forEach((p) => (paidToOtherByMe += p.amount))
        })

        const grossOwedToOther = amountOwedToOther - paidToOtherByMe

        const amountOwedToMe = (sumPaidByMe * otherUT.splitPercent) / 100

        let paidToMeByOther = 0
        expensesPaidByMe.forEach((e) => {
          const otherExpensePayments = e.payments.filter(
            (p) => p.userId === otherUT.userId
          )
          otherExpensePayments.forEach((p) => (paidToMeByOther += p.amount))
        })

        const grossOwedToMe = amountOwedToMe - paidToMeByOther

        let netDebt = (grossOwedToOther - grossOwedToMe).toFixed(2)
        if (netDebt > 0) {
          teamDebtDetails.push({
            lender: otherUT,
            debtor: user,
            debtAmount: netDebt,
            otherUser: otherUT,
          })
        } else if (netDebt < 0) {
          netDebt *= -1
          teamDebtDetails.push({
            lender: user,
            debtor: otherUT,
            debtAmount: netDebt,
            otherUser: otherUT,
          })
        } else {
          teamDebtDetails.push({
            lender: "",
            debtor: "",
            debtAmount: 0,
            otherUser: otherUT,
          })
        }
      })
    }
    setTeamDebts(teamDebtDetails)
  }, [currentUserTeams, teamExpenses, user])

  const renderNetDebt = (debtObj) => {
    if (debtObj.lender === debtObj.otherUser) {
      return (
        <>
          <div className="debt-participants">
            You owe @{debtObj.lender.user.username}{" "}
          </div>
          <div className="debt-dollar-amount">
            {debtObj.debtAmount.toLocaleString("en-us", formatCurrency)}
          </div>
        </>
      )
    } else if (debtObj.debtor === debtObj.otherUser) {
      return (
        <>
          <div className="debt-participants">
            @{debtObj.debtor.user.username} owes you{" "}
          </div>
          <div className="debt-dollar-amount">
            {debtObj.debtAmount.toLocaleString("en-us", formatCurrency)}
          </div>
        </>
      )
    } else {
      return (
        <>
          <div className="no-debt">
            Settled!<br></br>No debts with<br></br>@
            {debtObj.otherUser.user.username}
          </div>
        </>
      )
    }
  }
  return (
    <div className="net-debts">
      <div className="debt-details">
        {teamDebts.map((debtObj, i) => {
          return (
            <div className="team-debt" key={`debt-${i}`}>
              <div className="other-user-details">
                <i className="fa-solid fa-user other-user-avatar"></i>
                <div className="other-user-username">
                  @{debtObj.otherUser.user.username}
                </div>
              </div>
              <div className="net-debt-amount">{renderNetDebt(debtObj)}</div>
            </div>
          )
        })}
      </div>
      <div className="logged-in-user-details">
        <i className="fa-solid fa-user logged-in-user-avatar"></i>
        <div className="your-username">You</div>
      </div>
    </div>
  )
}
