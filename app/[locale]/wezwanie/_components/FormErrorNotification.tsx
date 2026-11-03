// "use client";

// import Button from "@/components/shared/buttons/Button";
// import { useWageLanguage } from "@/context/WageLanguageContext";
// import { useFormContext } from "react-hook-form";

// const FormErrorNotification = () => {
//   const { translations } = useWageLanguage();
//   const { errorsButton } = translations;
//   const {
//     formState: { errors },
//   } = useFormContext();

//   const goToFirstError = () => {
//     const firstError = Object.keys(errors)[0];

//     if (!firstError) return;

//     document.getElementById(firstError)?.scrollIntoView({
//       behavior: "smooth",
//       block: "center",
//     });
//   };

//   const errorCount = Object.keys(errors).length;

//   return (
//     <div className="h-[3.2rem] mt-4">
//       {errorCount !== 0 && (
//         <Button
//           variant="empty-accent"
//           onClickAction={goToFirstError}
//           className=" w-full"
//         >
//           {/* {errorsButton} - {errorCount} */}
//           popraw błedy - {errorCount} <span>przejdz do pierwszego</span>
//         </Button>
//       )}
//     </div>
//   );
// };

// export default FormErrorNotification;

"use client";

import Button from "@/components/shared/buttons/Button";
import { useWageLanguage } from "@/context/WageLanguageContext";
import { WageFormSchema } from "@/lib/zod-schema/wageFormSchema";

import { useFormContext, useWatch } from "react-hook-form";

const requiredFields: (keyof WageFormSchema)[] = [
  "place",
  "date",
  "name",
  "surname",
  "email",
  "userCity",
  "accountNumber",
  "companyName",
  "companyCity",
  "contractType",
  "contractStartDate",
  "workStart",
  "workEnd",
  "hours",
  "money",
];

const FormErrorNotification = () => {
  const { translations } = useWageLanguage();
  const { fixErrors, moveTo, toFill, from, fields, filledFields } =
    translations;

  const {
    control,
    formState: { errors, isValid },
  } = useFormContext<WageFormSchema>();

  const values = useWatch({ control });

  const emptyCount = requiredFields.filter((field) => {
    return !values[field]?.trim();
  }).length;

  const totalCount = requiredFields.length;
  const errorCount = Object.keys(errors).length;

  const goToFirstError = () => {
    const firstError = Object.keys(errors)[0];

    if (!firstError) return;

    document.getElementById(firstError)?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const className = "text-sm border p-4 mb-4";

  let infoBar;

  if (errorCount > 0) {
    infoBar = (
      <Button
        variant="ghost"
        onClickAction={goToFirstError}
        className={`w-full border-error !text-error flex !justify-between ${className}`}
      >
        <div className="w-full flex justify-between">
          <div>
            {" "}
            {fixErrors} {errorCount}
          </div>{" "}
          <div>{moveTo}</div>
        </div>
      </Button>
    );
  } else if (emptyCount > 0) {
    infoBar = (
      <div className={`${className} border-accent/30 bg-accent/5`}>
        {toFill}
        <span className="pl-1">
          {emptyCount} {from} {totalCount} {fields}
        </span>
      </div>
    );
  } else if (isValid) {
    infoBar = (
      <div className={`${className} border-succes text-succes`}>
        {filledFields}
      </div>
    );
  }

  return <div className="">{infoBar}</div>;
};

export default FormErrorNotification;
