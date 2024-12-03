export function parseLists(input: string) {
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
