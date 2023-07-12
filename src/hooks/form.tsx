/* eslint-disable @typescript-eslint/no-unused-vars */

import { ChangeEvent, useState } from "react";

type RadioCardHandler = { name: string; newValue: string };
type ChangeEventHandler = (
  e: ChangeEvent<HTMLInputElement> | RadioCardHandler
) => void;

interface FormStateHook<T> {
  formData: T;
  handleChange: ChangeEventHandler;
  resetForm: () => void;
  logFormData: (logTitle?: string) => void;
}

export function useFormState<T extends Record<string, string>>(
  initialState: T,
  logTitle?: string
): FormStateHook<T> {
  const [formData, setFormData] = useState<T>(initialState);

  const handleChange: ChangeEventHandler = (e) => {
    if (typeof e === "object" && "name" in e && "newValue" in e) {
      console.log("e is RadioCardHandler");
      const { name, newValue } = e as RadioCardHandler;
      // Handle the case where `(newVal: string) => void` is called
      setFormData((prevData) => ({
        ...prevData,
        [name]: newValue,
      }));
    } else {
      // Handle the case where `ChangeEvent` is called
      console.log("e is not RadioCardHandler");
      const { target } = e as ChangeEvent<HTMLInputElement>;
      setFormData((prevData) => ({
        ...prevData,
        [target.name]: target.value,
      }));
    }
  };

  const resetForm = () => {
    setFormData(initialState);
  };

  const logFormData = () => {
    if (logTitle) {
      console.log(logTitle, formData);
    } else {
      console.log(formData);
    }
  };

  return {
    formData,
    handleChange,
    resetForm,
    logFormData,
  };
}
