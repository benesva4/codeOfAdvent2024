function parseLists(input: string) {
  const rows = input.trimEnd().split('\n')

  const leftList: number[] = []
  const rightList: number[] = []

  rows.forEach((row) => {
    const [leftId, rightId] = row.split('   ')
    leftList.push(Number(leftId))
    rightList.push(Number(rightId))
  })

  return [leftList, rightList]
}

const filePath = new URL('.', import.meta.url).pathname + 'input.txt'
const text = await Deno.readTextFile(filePath)

/*** PART ONE ***/

const [leftList, rightList] = parseLists(text)

function getSum() {
  const sortedLeftList = leftList.toSorted((a, z) => a - z)
  const sortedRightList = rightList.toSorted((a, z) => a - z)

  const distances = sortedLeftList.map((leftId, i) => {
    const rightId = sortedRightList[i]
    return Math.abs(leftId - rightId)
  })

  const sumOfDistances = distances.reduce((acc, currentValue) => {
    return acc + currentValue
  }, 0)

  return sumOfDistances
}

/*** PART TWO ***/

function getSimilarity() {
  const sortedLeftList = leftList.toSorted((a, z) => a - z)

  const uniqueLeftIds = new Map<number, number>()
  sortedLeftList.forEach((id) => uniqueLeftIds.set(id, 0))

  rightList.forEach((rightId) => {
    const leftIdValue = uniqueLeftIds.get(rightId)
    if (leftIdValue !== undefined) {
      uniqueLeftIds.set(rightId, leftIdValue + 1)
    }
  })

  const similarity = Array.from(uniqueLeftIds).reduce(
    (acc, [id, occurrence]) => (acc = acc + id * occurrence),
    0,
  )

  return similarity
}

console.log('sum: ', getSum())
console.log('similarity: ', getSimilarity())
