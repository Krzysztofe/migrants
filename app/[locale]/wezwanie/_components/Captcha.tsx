import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";

const Captcha = () => {
  const key = process.env.NEXT_PUBLIC_RECAPTCHA_KEY;
  const [isCaptcha, setCaptcha] = useState(false);

  console.log("", key);

  const handleChange = () => {
    setCaptcha(true);
  };

  let printChaptcha;

  if (!key) {
    printChaptcha = "CAPTCHA nie istnieje";
  } else {
    printChaptcha = <ReCAPTCHA sitekey={key} onChange={handleChange} />;
  }

  return <>{printChaptcha}</>;
};

export default Captcha;
