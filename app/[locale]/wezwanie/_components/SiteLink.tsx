"use client";
import Button from "@/components/shared/buttons/Button";
import { useWageLanguage } from "@/context/WageLanguageContext";
import { useCopyText } from "@/hooks/useCopyText";
import { useRef } from "react";

const SiteLink = () => {
  const { translations } = useWageLanguage();
  const { title, header, description, copyLink, copied } =
    translations.copyLinkSection;

  const linkRef = useRef(null);
  const { isCopied, handleCopyText } = useCopyText(linkRef);
  const currentUrl = window.location.href;

  return (
    <div>
      <p className="text-accent">{title}</p>
      <p className="text-lg">{header}</p>
      <p>{description}</p>
      <p ref={linkRef}>{currentUrl}</p>
      <Button variant="primary" onClickAction={handleCopyText}>
        {isCopied ? copyLink : copied}
      </Button>
    </div>
  );
};

export default SiteLink;
