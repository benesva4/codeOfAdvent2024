// @ts-types="npm:@types/lodash.zip"
import zip from 'npm:lodash.zip'

const filePath = new URL('.', import.meta.url).pathname + 'input.txt'
const text = await Deno.readTextFile(filePath)

/*** PART ONE ***/

const rows = text.trim().split('\n').map((row) => row.split(''))
const columns = zip(...rows) as string[][]

const reversedRows = rows.map((row) => row.toReversed())
const reversedColumns = zip(...reversedRows) as string[][]

function getDiagonals(rows: string[][]) {
  const diagonals: string[][] = []
  for (let i = 0; i < rows.length - 3; i++) {
    diagonals.push([])
    for (let j = 0; j < rows.length - i; j++) {
      diagonals[i][j] = rows[j][j + i]
    }
  }
  return diagonals
}

const directions = [
  ...rows,
  ...columns,
  ...getDiagonals(rows),
  ...getDiagonals(columns).slice(1), // to ommit diagonal that is already in
  ...getDiagonals(reversedRows),
  ...getDiagonals(reversedColumns).slice(1), // to ommit diagonal that is already in
]

function getNumberOfXmas(testArrays: string[][]) {
  const xmasRegex = /(?=(XMAS))|(?=(SAMX))/g

  const testStrings = testArrays.map((direction) => direction.join(''))

  return testStrings.reduce((acc, dir) => (
    acc + [...dir.matchAll(xmasRegex)].length
  ), 0)
}

/*** PART TWO ***/

const masRegex = /MAS|SAM/

function countMas(rows: string[][]) {
  let count = 0
  for (let i = 1; i < rows.length - 1; i++) {
    for (let j = 1; j < rows.length - 1; j++) {
      const controlString1 = [
        rows[i - 1][j - 1],
        rows[i][j],
        rows[i + 1][j + 1],
      ].join('')

      const controlString2 = [
        rows[i + 1][j - 1],
        rows[i][j],
        rows[i - 1][j + 1],
      ].join('')

      if (masRegex.test(controlString1) && masRegex.test(controlString2)) {
        count++
      }
    }
  }

  return count
}

console.log('Number of XMAS: ', getNumberOfXmas(directions))
console.log('Number of X-MAS: ', countMas(rows))
