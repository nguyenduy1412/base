import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useMemo, useRef } from "react";
import {
  Control,
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";

interface UseBottomSheetFieldProps<TFieldValues extends FieldValues, TOption> {
  control: Control<TFieldValues>;
  setValue: UseFormSetValue<TFieldValues>;
  name: Path<TFieldValues>;
  options?: readonly TOption[];
  valueKey?: keyof TOption;
}

export function useBottomSheetField<
  TFieldValues extends FieldValues,
  TOption extends Record<string, any> = any
>({
  control,
  setValue,
  name,
  options,
  valueKey = "value" as keyof TOption,
}: UseBottomSheetFieldProps<TFieldValues, TOption>) {
  const value = useWatch({ control, name });

  const selectedOption = useMemo(() => {
    if (!options) return undefined;
    return options.find((option) => option[valueKey] === value);
  }, [value, options, valueKey]);

  const sheetRef = useRef<BottomSheetModal>(null);

  const openSheet = () => sheetRef.current?.present();
  const closeSheet = () => sheetRef.current?.dismiss();

  const handleSetValue = (newValue: any) => {
    setValue(name, newValue as PathValue<TFieldValues, Path<TFieldValues>>, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return {
    value,
    selectedOption,
    sheetRef,
    openSheet,
    closeSheet,
    handleSetValue,
  };
}
