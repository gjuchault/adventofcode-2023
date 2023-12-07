export function generateCombinations(
  values: string[],
  length: number,
): string[][] {
  const combinations: string[][] = [];

  // Function to generate combinations recursively
  function generate(currentCombo: string[]) {
    if (currentCombo.length === length) {
      combinations.push(currentCombo.slice());
      return;
    }

    for (let i = 0; i < values.length; i++) {
      currentCombo.push(values[i]!);
      generate(currentCombo);
      currentCombo.pop();
    }
  }

  generate([]);
  return combinations;
}

export function fillCombination<TItem = string>(
  input: TItem[],
  valueToReplace: TItem,
  possibleValues: TItem[],
): TItem[][] {
  const combinations: TItem[][] = [];

  // Function to generate combinations recursively
  function generateCombinations(index: number) {
    if (index === input.length) {
      combinations.push([...input]);
      return;
    }

    if (input[index] === valueToReplace) {
      for (const value of possibleValues) {
        input[index] = value;
        generateCombinations(index + 1);
        input[index] = valueToReplace; // Reset the value for backtracking
      }
    } else {
      generateCombinations(index + 1);
    }
  }

  generateCombinations(0);
  return combinations;
}
