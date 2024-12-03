import { parseLists } from "./parseLists.ts";

const text = await Deno.readTextFile("input.txt");

const [leftList, rightList] = parseLists(text);

function getSum() {
  const sortedLeftList = leftList.sort((a, z) => a - z);
  const sortedRightList = rightList.sort((a, z) => a - z);

  const distances = sortedLeftList.map((leftId, i) => {
    const rightId = sortedRightList[i];
    return Math.abs(leftId - rightId);
  });

  const sumOfDistances = distances.reduce((acc, currentValue) => {
    return acc + currentValue;
  }, 0);

  return sumOfDistances;
}

function getSimilarity() {
  const sortedLeftList = leftList.sort((a, z) => a - z);

  const uniqueLeftIds = new Map<number, number>();
  sortedLeftList.forEach((id) => uniqueLeftIds.set(id, 0));

  rightList.forEach((rightId) => {
    const leftIdValue = uniqueLeftIds.get(rightId);
    if (leftIdValue !== undefined) {
      uniqueLeftIds.set(rightId, leftIdValue + 1);
    }
  });

  const similarity = Array.from(uniqueLeftIds).reduce(
    (acc, [id, occurance]) => (acc = acc + id * occurance),
    0
  );

  return similarity;
}

console.log("sum: ", getSum());
console.log("similarity: ", getSimilarity());