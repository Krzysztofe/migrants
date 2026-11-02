import Button from "@/components/shared/buttons/Button";
import { useWageLanguage } from "@/context/WageLanguageContext";
import { useState } from "react";
import { RefObject } from "react";

type Props = {
  previewRef: RefObject<HTMLDivElement | null>;
};

const CopyTextBtn = ({ previewRef }: Props) => {
  const { translations } = useWageLanguage();
  const { copyContent, copied } = translations;
  const [icCopied, setCopied] = useState(false);

  const handleCopyText = async () => {
    if (!previewRef.current) return;

    try {
      await navigator.clipboard.writeText(previewRef.current.innerText);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Nie udało się skopiować tekstu:", error);
    }
  };

  return (
    <Button type="button" onClickAction={handleCopyText} variant="empty-accent">
      {icCopied ? copied : copyContent}
    </Button>
  );
};

export default CopyTextBtn;
