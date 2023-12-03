export function uniqueArray<TItem, THashed = TItem>(
  input: TItem[],
  uniqueBy: (item: TItem) => THashed
): TItem[] {
  const seen = new Map<THashed, boolean>();
  const result = [];

  for (const item of input) {
    const hash = uniqueBy(item);

    if (!seen.has(hash)) {
      seen.set(hash, true);
      result.push(item);
    }
  }

  return result;
}
