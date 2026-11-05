import Button from "@/components/shared/buttons/Button";
import { useWageLanguage } from "@/context/WageLanguageContext";
import { useCopyText } from "@/hooks/useCopyText";
import { useState } from "react";
import { RefObject } from "react";

type Props = {
  previewRef: RefObject<HTMLDivElement | null>;
};

const CopyTextBtn = ({ previewRef }: Props) => {
  const { translations } = useWageLanguage();
  const { copyContent, copied } = translations;
  const { handleCopyText, isCopied } = useCopyText(previewRef);

  return (
    <Button type="button" onClickAction={handleCopyText} variant="empty-accent">
      {isCopied ? copied : copyContent}
    </Button>
  );
};

export default CopyTextBtn;
