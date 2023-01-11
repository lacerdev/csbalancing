const { byScoreAsc, onlyAvailableCS, byMinScore, byMaxScore } = require('./util')

/**
 * Returns the id of the CustomerSuccess with the most customers
 * @param {array} customerSuccess
 * @param {array} customers
 * @param {array} customerSuccessAway
 */
function customerSuccessBalancing(customerSuccess, customers, customerSuccessAway) {
  const { filteredCustomers, availableCustomerSuccess } = refineParameters(
    customerSuccess,
    customers,
    customerSuccessAway
  )

  if (filteredCustomers.length === 0) {
    return 0
  }

  const bestCS = getCSWithMaxCustomers(availableCustomerSuccess, filteredCustomers)
  return bestCS.id
}

function getCSWithMaxCustomers(availableCustomerSuccess, filteredCustomers) {
  return availableCustomerSuccess.reduce(
    (prev, { id, score }) => {
      const matchedScoresNumber = filteredCustomers.filter(customer => score >= customer.score).length

      filteredCustomers.splice(0, matchedScoresNumber)

      if (matchedScoresNumber > prev.numCustomers) {
        return { id, numCustomers: matchedScoresNumber }
      }

      if (matchedScoresNumber === prev.numCustomers) {
        return { id: 0, numCustomers: prev.numCustomers }
      }

      return prev
    },
    { id: 0, numCustomers: 0 }
  )
}

function refineParameters(customerSuccess, customers, customerSuccessAway) {
  const sortedCustomerSuccess = customerSuccess.sort(byScoreAsc)
  const sortedCustomers = customers.sort(byScoreAsc)
  const minCustomerScore = sortedCustomers[0].score

  const availableCustomerSuccess = sortedCustomerSuccess
    .filter(onlyAvailableCS(customerSuccessAway))
    .filter(byMinScore(minCustomerScore))

  const maxCustomerSuccessScore = availableCustomerSuccess[availableCustomerSuccess.length - 1]?.score
  const filteredCustomers = sortedCustomers.filter(byMaxScore(maxCustomerSuccessScore))

  return { filteredCustomers, availableCustomerSuccess }
}

module.exports = {
  customerSuccessBalancing
}
