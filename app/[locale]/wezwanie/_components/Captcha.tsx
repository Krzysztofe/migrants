import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

type Props = {
  handleCaptcha: (value: boolean) => void;
};

const Captcha = ({ handleCaptcha }: Props) => {
  const key = process.env.NEXT_PUBLIC_RECAPTCHA_KEY;
  const captchaRef = useRef<ReCAPTCHA>(null);

  let printChaptcha;

  if (!key) {
    printChaptcha = "CAPTCHA nie istnieje";
  } else {
    printChaptcha = (
      <ReCAPTCHA
        ref={captchaRef}
        sitekey={key}
        onChange={(token) => handleCaptcha(!!token)}
        onExpired={() => handleCaptcha(false)}
      />
    );
  }

  return <>{printChaptcha}</>;
};

export default Captcha;
