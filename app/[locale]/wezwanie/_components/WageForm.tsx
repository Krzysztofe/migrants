"use client";

import InputFields from "@/components/inputs/input-fields/InputFields";
import Button from "@/components/shared/buttons/Button";
import Card from "@/components/shared/Card";
import {
  getdataInputsWage,
  getdataInputsHeader,
  getdataInputsUser,
  getdataContractTypeOptions,
  getdataInputsUserAdress,
  getdataInputsAccount,
  getdataInputsEmployer,
  getdataInputsContract,
  getdataContractOptions,
} from "@/lib/dataCollections/wageFormInputsData";
import {
  WageFormSchema,
  wageFormSchema,
} from "@/lib/zod-schema/wageFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, Path, useForm, useWatch } from "react-hook-form";
import CardHeader from "./CardHeader";
import WageDocumentEditor from "./WageDocumentEditor";
import { SelectFieldController } from "@/components/inputs/select-field/SelectFieldController";
import RadioGroupField from "@/components/inputs/radio-field/RadioGroupField";
import { useWageLanguage } from "@/context/WageLanguageContext";

const WageForm = () => {
  const { translations } = useWageLanguage();
  const { inputsLabels, formHeaders } = translations;

  const methods = useForm<WageFormSchema>({
    resolver: zodResolver(wageFormSchema),
    defaultValues: {
      place: "",
      date: "",

      name: "",
      surname: "",
      phone: "",
      email: "",
      userCity: "",
      userStreet: "",
      userHouseNomber: "",
      userFlatNomber: "",
      userPostCode: "",
      contactType: "email",
      accountNumber: "",

      companyName: "",
      companyCity: "",
      companyStreet: "",
      companyHouseNomber: "",
      companyFlatNomber: "",
      companyPostCode: "",

      contractType: "",
      contractStartDate: "",

      workStart: "",
      workEnd: "",
      hours: "",
      money: "",
    },
    mode: "all",
  });

  const {
    setValue,
    register,
    formState: { errors },
    trigger,
    setError,
  } = methods;

  const contactType = useWatch({
    control: methods.control,
    name: "contactType",
  });

  const isEmail = contactType === "email";

  return (
    <FormProvider {...methods}>
      <form className="lg:w-[42rem] grid gap-8">
        <Card>
          <CardHeader message={formHeaders.letter} />
          <InputFields
            inputsData={getdataInputsHeader(inputsLabels)}
            register={register}
            errorMsg={errors}
          />
        </Card>

        <Card>
          <CardHeader message={formHeaders.yourData} />
          <InputFields
            inputsData={getdataInputsUser(inputsLabels)}
            register={register}
            errorMsg={errors}
          />

          <p className="text-bold mb-4">{inputsLabels.answerForm}</p>

          <RadioGroupField
            name={"contactType"}
            options={getdataContractTypeOptions(inputsLabels)}
            errorMsg={errors}
            hidden={true}
          />

          {!isEmail && (
            <InputFields
              inputsData={getdataInputsUserAdress(inputsLabels)}
              register={register}
              errorMsg={errors}
            />
          )}

          <InputFields
            inputsData={getdataInputsAccount(inputsLabels)}
            register={register}
            errorMsg={errors}
          />
        </Card>
        <Card>
          <CardHeader message={formHeaders.employer} />
          <InputFields
            inputsData={getdataInputsEmployer(inputsLabels)}
            register={register}
            errorMsg={errors}
          />
        </Card>
        <Card>
          <CardHeader message={formHeaders.contract} />

          <RadioGroupField
            label={inputsLabels.contractType}
            name={"contractType"}
            options={getdataContractOptions(inputsLabels)}
            errorMsg={errors}
            required={true}
          />

          <InputFields
            inputsData={getdataInputsContract(inputsLabels)}
            register={register}
            errorMsg={errors}
          />
        </Card>
        <Card>
          <CardHeader message={formHeaders.wage} />
          <InputFields
            inputsData={getdataInputsWage(inputsLabels)}
            register={register}
            errorMsg={errors}
          />
        </Card>
      </form>
      <div className="md:sticky md:top-[16rem] h-fit">
        <WageDocumentEditor />
      </div>
    </FormProvider>
  );
};

export default WageForm;
