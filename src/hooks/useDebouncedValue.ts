import { useEffect, useState } from "react";

export const useDebouncedValue = <TValue>(
  value: TValue,
  delay = 200,
): TValue => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [delay, value]);

  return debouncedValue;
};
