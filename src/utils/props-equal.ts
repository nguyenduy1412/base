import isDeepEqual from "fast-deep-equal";

export function arePropsEqual<T extends Record<string, any>>(
  prevProps: T,
  nextProps: T,
  deepKeys: (keyof T)[],
): boolean {
  const allKeys = Array.from(
    new Set([...Object.keys(prevProps), ...Object.keys(nextProps)]),
  ) as (keyof T)[];

  for (const key of allKeys) {
    if (deepKeys.includes(key)) {
      if (!isDeepEqual(prevProps[key], nextProps[key])) {
        return false;
      }
    } else {
      if (prevProps[key] !== nextProps[key]) {
        return false;
      }
    }
  }

  return true;
}

export function memoPropsEqual<T extends Record<string, any>>(
  deepKeys: (keyof T)[],
): (prevProps: T, nextProps: T) => boolean {
  return (prevProps, nextProps) =>
    arePropsEqual(prevProps, nextProps, deepKeys);
}
