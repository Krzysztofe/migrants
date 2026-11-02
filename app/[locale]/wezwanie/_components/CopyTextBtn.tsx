import Button from "@/components/shared/buttons/Button";
import { useState } from "react";
import { RefObject } from "react";

type Props = {
  previewRef: RefObject<HTMLDivElement | null>;
};

const CopyTextBtn = ({ previewRef }: Props) => {
  const [copied, setCopied] = useState(false);

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
      {copied ? "Skopiowano" : "Kopiuj treść pisma"}
    </Button>
  );
};

export default CopyTextBtn;
