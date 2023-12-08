export function greatestCommonDivisor(...numbers: number[]): number {
  const firstNumber = numbers[0];

  if (firstNumber === undefined) {
    return 1;
  }

  function subGreatestCommonDivisor(a: number, b: number): number {
    if (b === 0) {
      return a;
    } else {
      return subGreatestCommonDivisor(b, a % b);
    }
  }

  return numbers.reduce(
    (acc, num) => subGreatestCommonDivisor(acc, num),
    firstNumber,
  );
}

export function leastCommonMultiple(...numbers: number[]): number {
  let lcm = numbers[0];

  if (lcm === undefined) {
    return 0;
  }

  for (let i = 1; i < numbers.length; i++) {
    const currentNum = numbers[i]!;

    const gcd = greatestCommonDivisor(lcm, currentNum);
    lcm = (lcm * currentNum) / gcd;
  }

  return lcm;
}
