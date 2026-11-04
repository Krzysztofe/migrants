import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";

type Props = {
  handleCaptcha: (value: boolean) => void;
};

const Captcha = ({ handleCaptcha }: Props) => {
  const key = process.env.NEXT_PUBLIC_RECAPTCHA_KEY;

  let printChaptcha;

  if (!key) {
    printChaptcha = "CAPTCHA nie istnieje";
  } else {
    printChaptcha = (
      <ReCAPTCHA
        sitekey={key}
        onChange={(token) => handleCaptcha(!!token)}
        onExpired={() => handleCaptcha(false)}
      />
    );
  }

  return <>{printChaptcha}</>;
};

export default Captcha;
