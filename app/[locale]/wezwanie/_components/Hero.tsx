"use client";
import { useWageLanguage } from "@/context/WageLanguageContext";

const Hero = () => {
  const { translations } = useWageLanguage();
  const { title, heading, description } = translations;
  return (
    <>
      <div className="flex-1">
        <p className="text-sm text-accent">{title}</p>
        <h1 className=" font-bold">{heading}</h1>
        <p className="">{description}</p>
      </div>
      <div className="flex-1 flex items-center justify-center">logo</div>
    </>
  );
};

export default Hero;
