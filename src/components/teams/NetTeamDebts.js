import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { formatCurrency } from "../../utils/functions"

export const NetTeamDebts = ({ user, currentUserTeams, teamExpenses }) => {
  const [teamDebts, setTeamDebts] = useState([])

  useEffect(() => {
    const teamDebtDetails = []
    if (currentUserTeams?.length && teamExpenses?.length && user.id) {
      const myUserTeam = currentUserTeams.find((ut) => ut.user.id === user.id)
      const otherUserTeams = currentUserTeams.filter(
        (ut) => ut.user.id !== user.id
      )
      const expensesPaidByMe = teamExpenses.filter((e) => e.user.id === user.id)
      let sumPaidByMe = 0
      expensesPaidByMe.forEach((e) => (sumPaidByMe += e.amount))

      otherUserTeams.forEach((otherUT) => {
        const expensesPaidByOther = teamExpenses.filter(
          (e) => e.user.id === otherUT.user.id
        )

        let sumPaidByOther = 0
        expensesPaidByOther.forEach((e) => {
          sumPaidByOther += e.amount
        })

        const amountOwedToOther =
          (sumPaidByOther * myUserTeam.splitFraction) / 100

        let paidToOtherByMe = 0
        expensesPaidByOther.forEach((e) => {
          const myExpensePayments = e.payments.filter((p) => p.user === user.id)
          myExpensePayments.forEach((p) => (paidToOtherByMe += p.amount))
        })

        const grossOwedToOther = amountOwedToOther - paidToOtherByMe

        const amountOwedToMe = (sumPaidByMe * otherUT.splitFraction) / 100

        let paidToMeByOther = 0
        expensesPaidByMe.forEach((e) => {
          const otherExpensePayments = e.payments.filter(
            (p) => p.user === otherUT.userId
          )
          otherExpensePayments.forEach((p) => (paidToMeByOther += p.amount))
        })

        const grossOwedToMe = amountOwedToMe - paidToMeByOther

        let netDebt = grossOwedToOther - grossOwedToMe
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
          <div>
            <i className="fa-solid fa-left-long"></i>
          </div>
          <div>You owe</div>
          <div>
            {debtObj.debtAmount.toLocaleString("en-us", formatCurrency)}
          </div>
        </>
      )
    } else if (debtObj.debtor === debtObj.otherUser) {
      return (
        <>
          <div>
            <i className="fa-solid fa-right-long"></i>
          </div>
          <div>owes you </div>
          <div>
            {debtObj.debtAmount.toLocaleString("en-us", formatCurrency)}
          </div>
        </>
      )
    } else {
      return (
        <>
          <div>
            <i className="fa-regular fa-circle-check"></i>
          </div>
          <div>
            Settled!<br></br>No debts.
          </div>
        </>
      )
    }
  }
  return (
    // Net Debts Container
    <div className="text-md flex justify-between items-center p-6">
      {/* Team User List */}
      <ul className="flex flex-col items-start w-2/3 space-y-6">
        {teamDebts.map((debtObj, i) => {
          return (
            // Team User Details and Debt Container
            <li
              key={`debt-${i}`}
              className="flex justify-between items-center w-full"
            >
              {/* Team User Details */}
              <Link
                to={`/profile/${debtObj.otherUser.user.id}`}
                className="w-1/2"
              >
                <div className="flex flex-col space-y-2 items-center">
                  {/* Avatar */}
                  <div className="text-xl">
                    <i className="fa-solid fa-user"></i>
                  </div>
                  {/* Username */}
                  <div className="text-sm md:text-md">
                    @{debtObj.otherUser.user.username}
                  </div>
                </div>
              </Link>
              {/* Debt Amount */}
              <div className="w-1/2 flex flex-col items-center text-center">
                {renderNetDebt(debtObj)}
              </div>
            </li>
          )
        })}
      </ul>
      {/* Logged In User Details */}
      <Link
        to={`/profile/${user.id}`}
        className="flex flex-col space-y-2 items-center w-1/3"
      >
        {/* Avatar */}
        <div className="text-4xl">
          <i className="fa-solid fa-user"></i>
        </div>
        {/* Username */}
        <div className="text-lg">You</div>
      </Link>
    </div>
  )
}
