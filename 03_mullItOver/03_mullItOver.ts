const filePath = new URL('.', import.meta.url).pathname + 'input.txt'
const text = await Deno.readTextFile(filePath)

/*** PART ONE ***/

/** matchAll returns something like this
 *
  "xmul(2,4)&mul[3,7]!^don't()",
  "xmul(2,4)&mul[3,7]!^don't()",
  undefined,
  undefined,
  index: 0,
  input: "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))",
  groups: undefined,
  indices: [ [ 0, 27 ], [ 0, 27 ], undefined, undefined, groups: undefined ]
] */

/** regex that also catches to groups just inside of the in mul()*/
const mullRegex = /mul\((\d{1,3},\d{1,3})\)/g

function mul(text: string) {
  return text.matchAll(mullRegex)
    .reduce((acc, [_, group]) => {
      const [a, b] = group.split(',')
      return acc + (Number(a) * Number(b))
    }, 0)
}

/*** PART TWO ***/

/**
 * three different groups separated by pipe
 * - first part without the do() at the start
 * - second that matches between do() and don't()
 * - last one that matches everything from the first do() after last don't()
 */
const doRegex =
  /(^.*?(?=don't\(\)))|(do\(\).*?(?=don't\(\)))|((?!.*don't\(\))do\(\).*\z)/sg

function getDo(text: string) {
  return text.matchAll(doRegex).reduce(
    (acc, [matched]) => acc + matched,
    '',
  )
}

console.log('multiplication result: ', mul(text))
console.log('multiplication result for do(): ', mul(getDo(text)))
