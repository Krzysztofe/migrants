import { RefObject, useEffect, useRef, useState } from "react";

export const useCopyText = (previewRef: RefObject<HTMLDivElement | null>) => {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopyText = async () => {
    if (!previewRef.current) return;

    try {
      await navigator.clipboard.writeText(previewRef.current.innerText);

      setIsCopied(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Nie udało się skopiować tekstu:", error);
    }
  };

  return {
    handleCopyText,
    isCopied,
  };
};
