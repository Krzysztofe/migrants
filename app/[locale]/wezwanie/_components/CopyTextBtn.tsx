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
    <button
      type="button"
      onClick={handleCopyText}
      className="rounded-md border border-accent px-5 py-3 text-accent transition-colors hover:bg-accent/10"
    >
      {copied ? "Skopiowano" : "Kopiuj treść pisma"}
    </button>
  );
};

export default CopyTextBtn;
