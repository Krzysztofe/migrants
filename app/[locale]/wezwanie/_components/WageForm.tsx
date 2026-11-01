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

const dataInputsUser = [
  {
    label: "Imię",
    name: "name",
    placeholder: "Anna",
    type: InputType.TEXT,
  },
  {
    label: "Nazwisko",
    name: "surname",
    placeholder: "Kowalska",
    type: InputType.TEXT,
  },
  {
    label: "Telefon",
    name: "phone",
    placeholder: "111-111-111",
    type: InputType.TEXT,
  },
  {
    label: "E-mail",
    name: "email",
    placeholder: "wwww@ww.pl",
    type: InputType.TEXT,
  },
  {
    label: "Numer konta bankowego ",
    name: "accountNumber",
    placeholder: "26 cyfr",
    type: InputType.TEXT,
  },
];

const dataInputsEmployer = [
  {
    label: "Nazwa firmy",
    name: "companyName",
    placeholder: "Anna",
    type: InputType.TEXT,
  },
  {
    label: "Adres siedziby firmy",
    name: "companyCity",
    placeholder: "Kowalska",
    type: InputType.TEXT,
  },
];

const WageForm = () => {
  const methods = useForm<WageFormSchema>({
    resolver: zodResolver(wageFormSchema),
    defaultValues: {
      name: "",
      surname: "",
      phone: "",
      email: "",
      accountNumber: "",

      companyName: "",
      companyCity: "",
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

  return (
    <FormProvider {...methods}>
      <form className="flex-1 grid gap-8">
        <Card>
          <CardHeader message="Twoje dane" />
          <InputFields
            inputsData={dataInputsUser}
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
        </Card>
        <Card>
          <CardHeader message="Zaległa wypłata" />
        </Card>
        <Card>
          <CardHeader message="Pismo" />
        </Card>
      </form>
      <PdfTemplate />
    </FormProvider>
  );
};

export default WageForm;
