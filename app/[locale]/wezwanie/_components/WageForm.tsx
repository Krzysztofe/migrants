"use client";

import InputFields from "@/components/inputs/input-fields/InputFields";
import Button from "@/components/shared/buttons/Button";
import Card from "@/components/shared/Card";
import {
  contractOptions,
  dataAccount,
  dataInputsContract,
  dataInputsEmployer,
  dataInputsHeader,
  dataInputsUser,
  dataInputsUserAdress,
  dataInputsWage,
  contactTypeOptions,
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

const WageForm = () => {
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

  const handleInputChange = (name: string, value: string) => {
    console.log("name", name);
    console.log("value", value);

    setValue(name as Path<WageFormSchema>, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  return (
    <FormProvider {...methods}>
      <form className="lg:w-[42rem] grid gap-8">
        <Card>
          <CardHeader message="Pismo" />
          <InputFields
            inputsData={dataInputsHeader}
            register={register}
            errorMsg={errors}
            // onChange={handleInputChange}
          />
        </Card>

        <Card>
          <CardHeader message="Twoje dane" />
          <InputFields
            inputsData={dataInputsUser}
            register={register}
            errorMsg={errors}
            // onChange={handleInputChange}
          />

          <p className="text-bold mb-4">
            W jakiej formie chcesz uzyskać odpowiedź
          </p>

          <RadioGroupField
            name={"contactType"}
            options={contactTypeOptions}
            errorMsg={errors}
            hidden={true}
          />

          {!isEmail && (
            <InputFields
              inputsData={dataInputsUserAdress}
              register={register}
              errorMsg={errors}
              // onChange={handleInputChange}
            />
          )}

          <InputFields
            inputsData={dataAccount}
            register={register}
            errorMsg={errors}
            // onChange={handleInputChange}
          />
        </Card>
        <Card>
          <CardHeader message="Pracodawca / Zleceniodawca" />
          <InputFields
            inputsData={dataInputsEmployer}
            register={register}
            errorMsg={errors}
            // onChange={handleInputChange}
          />
        </Card>
        <Card>
          <CardHeader message="Umowa" />

          <RadioGroupField
            label="Rodzaj umowy"
            name={"contractType"}
            options={contractOptions}
            errorMsg={errors}
            hidden={false}
          />

          <InputFields
            inputsData={dataInputsContract}
            register={register}
            errorMsg={errors}
            // onChange={handleInputChange}
          />
        </Card>
        <Card>
          <CardHeader message="Zaległa wypłata" />
          <InputFields
            inputsData={dataInputsWage}
            register={register}
            errorMsg={errors}
            // onChange={handleInputChange}
          />
        </Card>
      </form>
      <div className="md:sticky md:top-[20rem] h-fit">
        <WageDocumentEditor />
      </div>
    </FormProvider>
  );
};

export default WageForm;
