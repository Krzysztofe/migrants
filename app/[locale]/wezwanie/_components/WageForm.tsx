"use client";

import Card from "@/components/shared/Card";
import CardHeader from "./CardHeader";
import { FormProvider, useForm, Path } from "react-hook-form";
import { InputType } from "@/components/inputs/input-fields/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  WageFormSchema,
  wageFormSchema,
} from "@/lib/zod-schema/wageFormSchema";
import InputFields from "@/components/inputs/input-fields/InputFields";
import PdfTemplate from "./PdfTemplate";
import Button from "@/components/shared/buttons/Button";
import { az } from "zod/locales";
import { useState } from "react";
import {
  dataAccount,
  dataInputsContract,
  dataInputsEmployer,
  dataInputsHeader,
  dataInputsUser,
  dataInputsUserAdress,
  dataInputsWage,
} from "@/lib/dataCollections/wageFormInputsData";

const WageForm = () => {
  const [isEmail, setIsEmail] = useState(false);

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

  const handleInputChange = (name: string, value: string) => {
    console.log("name", name);
    console.log("value", value);

    setValue(name as Path<WageFormSchema>, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleSwitchinputs = (value: boolean) => {
    setIsEmail(value);
  };

  return (
    <FormProvider {...methods}>
      <form className="md:w-1/4 grid gap-8">
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
            Zaznacz, w jakiej formie chcesz uzyskać odpowiedź
          </p>

          <div className="flex flex-col gap-4 md:flex-row">
            <Button
              variant="primary"
              onClickAction={() => handleSwitchinputs(false)}
            >
              E-mail
            </Button>
            <Button
              variant="primary"
              onClickAction={() => handleSwitchinputs(true)}
            >
              Na adres fizyczny
            </Button>
          </div>
          {isEmail && (
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
      <PdfTemplate />
    </FormProvider>
  );
};

export default WageForm;
