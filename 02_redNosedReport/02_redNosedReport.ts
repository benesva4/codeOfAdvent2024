import isEqual from 'npm:lodash.isequal'

const filePath = new URL('.', import.meta.url).pathname + 'input.txt'
const text = await Deno.readTextFile(filePath)

const reportLines = text
  .trim()
  .split('\n')
  .map((line) =>
    line
      .split(' ')
      .map(Number)
  )

/***  PART ONE ***/

function ordered(line: number[]) {
  return isEqual(line.toSorted((a, z) => a - z), line) ||
    isEqual(line.toSorted((a, z) => z - a), line)
}

function noDuplicities(line: number[]) {
  return isEqual(Array.from(new Set(line)), line)
}

function gradual(line: number[]) {
  for (let i = 0; i < line.length - 1; i++) {
    const current = line[i]
    const next = line[i + 1]
    const diff = Math.abs(next - current)

    if (diff > 3) {
      return false
    }
  }
  return true
}

const safeReports = reportLines
  .filter(ordered)
  .filter(noDuplicities)
  .filter(gradual)

/***  PART TWO ***/

function filterSafeWithDampener(
  line: number[],
  inner?: boolean,
): boolean {
  let originalOrderIsDecreasing = false
  for (let i = 0; i < line.length - 1; i++) {
    const currentElement = line[i]
    const nextElement = line[i + 1]

    const difference = Math.abs(currentElement - nextElement)
    if (difference < 1 || difference > 3) {
      const newLine = inner
        ? []
        : [line.toSpliced(i, 1), line.toSpliced(i + 1, 1)].filter((line) =>
          filterSafeWithDampener(line, true)
        )

      return newLine.length >= 1
    }

    if (i === 0) {
      originalOrderIsDecreasing = currentElement > nextElement
    } else if ((currentElement > nextElement) !== originalOrderIsDecreasing) {
      const newLine = inner ? [] : [
        ...(i === 1 ? [line.toSpliced(0, 1)] : []),
        line.toSpliced(i, 1),
        line.toSpliced(i + 1, 1),
      ]
        .filter((line) => filterSafeWithDampener(line, true))

      return newLine.length >= 1
    }
  }
  return true
}

const safeReportsWithDampener = reportLines.filter((line) =>
  filterSafeWithDampener(line)
)

console.log('number of safe reports', safeReports.length)
console.log('number of safe lines', safeReportsWithDampener.length)
