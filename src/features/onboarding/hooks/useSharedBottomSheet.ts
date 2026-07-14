// hooks/useSharedBottomSheet.ts
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRef, useState } from "react";
import {
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
  useWatch,
  Control,
} from "react-hook-form";
import { SelectOption } from "../constants/onboarding";

export interface FieldConfig<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label: string;
  options: SelectOption[];
}

export function useSharedBottomSheet<TFieldValues extends FieldValues>(
  control: Control<TFieldValues>,
  setValue: UseFormSetValue<TFieldValues>,
  fields: FieldConfig<TFieldValues>[],
) {
  const sheetRef = useRef<BottomSheetModal>(null);

  const [activeFieldName, setActiveFieldName] =
    useState<Path<TFieldValues> | null>(null);

  const values = useWatch({ control });

  const activeField = fields.find((f) => f.name === activeFieldName) ?? null;

  const openSheet = (name: Path<TFieldValues>) => {
    setActiveFieldName(name);

    setTimeout(() => {
      sheetRef.current?.present();
    }, 0);
  };

  const closeSheet = () => {
    sheetRef.current?.dismiss();
    setActiveFieldName(null);
  };

  const handleSelect = (value: string) => {
    if (!activeFieldName) return;
    setValue(
      activeFieldName,
      value as PathValue<TFieldValues, Path<TFieldValues>>,
      { shouldValidate: true, shouldDirty: true },
    );
  };

  const getSelectedLabel = (name: Path<TFieldValues> | undefined) => {
    if (!name) return "";
    const config = fields.find((f) => f.name === name);
    const currentValue = values[name as string];
    return config?.options.find((o) => o.value === currentValue)?.label ?? "";
  };

  const getSelectedValue = (name: Path<TFieldValues> | undefined) => {
    if (!name) return undefined;
    return (values[name as string] as string) || undefined;
  };

  return {
    sheetRef,
    activeField,
    openSheet,
    closeSheet,
    handleSelect,
    getSelectedLabel,
    getSelectedValue,
  };
}
