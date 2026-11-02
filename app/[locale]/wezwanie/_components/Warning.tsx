"use client";
import { useWageLanguage } from "@/context/WageLanguageContext";

const Warning = () => {
  const { translations } = useWageLanguage();
  const { warning } = translations;
  return <p className="md:w-[80rem]"> {warning}</p>;
};

export default Warning;
