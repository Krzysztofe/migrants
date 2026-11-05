import { UseFormRegister } from "react-hook-form";
import InputError from "../InputError";
import DataLoader from "@/components/shared/loaders/DataLoader";
import { ChangeEvent } from "react";

export enum InputType {
  TEXT = "text",
  SUPER_TEXT = "superText" /* ? */,
  EMAIL = "email",
  DATE = "date",
  NUMBER = "number",
  PESEL = "pesel",
  CHECKBOX = "checkbox",
  SINGLE_SELECT = "singleSelect",
  PARAGRAPH = "paragraph",
}

export type InputData = {
  label?: string;
  name: string;
  placeholder?: string;
  type: InputType | "password";
  defaultValue?: string;
  description?: string;
  required?: boolean;
  unique?: boolean;
  dataAttribut?: string;
  labelClassName?: string;
  hidden?: boolean;
  mask?: "postCode";
};

type Props = {
  inputData: InputData;
  register?: UseFormRegister<any>;
  onChange?: (name: string, value: string) => void | Promise<void>;
  isLoading?: Record<string, boolean>;
  isSubmitting?: boolean;
  default?: Record<string, string>;
  error?: any;
  variant?: string;
};

export const formatPostCode = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 5);
  return digits.length > 2
    ? `${digits.slice(0, 2)}-${digits.slice(2)}`
    : digits;
};

const InputField = (props: Props) => {
  const { name, label, type, required, placeholder, defaultValue, mask } =
    props.inputData;
  const inputDefaultValue = props.default?.[name] ?? defaultValue ?? "";

  const registration = props.register?.(name);
  const fieldError = props.error?.[name];
  const isPostCode = mask === "postCode";

  const handleChange = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    if (isPostCode) e.target.value = formatPostCode(e.target.value);

    if (props.onChange) {
      void props.onChange(name, e.target.value);
    } else {
      void registration?.onChange(e);
    }
  };

  return (
    <div className="group relative">
      <input
        id={name}
        name={name}
        inputMode={isPostCode || type === "number" ? "numeric" : undefined}
        maxLength={isPostCode ? 6 : undefined}
        autoComplete={isPostCode ? "postal-code" : undefined}
        // maxLength={type === "number" ? 6 : undefined}
        type={type}
        aria-label={`${label || label || name}`}
        placeholder={placeholder}
        defaultValue={inputDefaultValue}
        disabled={props.isLoading?.[name] || props.isSubmitting}
        aria-required={required}
        aria-invalid={!!fieldError}
        aria-describedby={fieldError ? `${name}-error` : undefined}
        className={`peer w-full rounded-sm border border-gray-primary p-3 text-base focus:border-accent focus:outline-none ${fieldError ? "border-error" : "border-default"} ${
          props.isLoading?.[name] || props.isSubmitting
            ? "cursor-not-allowed opacity-50"
            : ""
        } `}
        {...registration}
        // onChange={(e) => {
        //   if (props.onChange) {
        //     void props.onChange(name, e.target.value);
        //   } else {
        //     void registration?.onChange(e);
        //   }
        // }}
        onChange={(e) => {
          handleChange(e);
        }}
      />

      {props.isLoading?.[name] && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <DataLoader size="sm" />
        </div>
      )}
      <InputError
        errorMsg={
          (props.error?.[name]?.message as string) ||
          (props.error as any)?.message ||
          (props.error?.[name] && props.error?.[name][0])
        }
        nameId={name}
      />
    </div>
  );
};

export default InputField;
