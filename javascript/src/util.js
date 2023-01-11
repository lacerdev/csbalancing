function buildSizeEntities(size, score) {
  const result = []
  for (let i = 0; i < size; i += 1) {
    result.push({ id: i + 1, score })
  }
  return result
}

function mapEntities(arr) {
  return arr.map((item, index) => ({
    id: index + 1,
    score: item
  }))
}

function arraySeq(count, startAt) {
  return Array.apply(0, Array(count)).map((it, index) => index + startAt)
}

function byScoreAsc(a, b) {
  return a.score - b.score
}

function byMinScore(minValue) {
  return function ({ score }) {
    return score >= minValue
  }
}

function byMaxScore(maxValue) {
  return function ({ score }) {
    return score <= maxValue
  }
}

function onlyAvailableCS(customerSuccessAway) {
  return function ({ id }) {
    return !customerSuccessAway.includes(id)
  }
}

module.exports = {
  buildSizeEntities,
  mapEntities,
  arraySeq,
  byScoreAsc,
  byMaxScore,
  byMinScore,
  onlyAvailableCS
}
