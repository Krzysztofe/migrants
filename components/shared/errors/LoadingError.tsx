"use client";

import Button from "../buttons/Button";
type Props = {
  error: unknown;
  message?: string;
  size: "sm" | "lg";
};

const LoadingError = (props: Props) => {
  const errorMessage =
    props.error instanceof Error ? props.error.message : "Nieznany błąd";

  if (props.size === "lg")
    return (
      <div className="flex flex-col items-center justify-center text-center p-4 h-[400px]">
        <h2 className="font-semibold text-red-600 text-lg mb-2">
          {props.message || "Błąd ładowania danych"}
        </h2>
        <p className="text-gray-700 text-sm mb-4">{errorMessage}</p>
        <Button
          onClickAction={() => window.location.reload()}
          className="!bg-error text-white px-2"
          variant="ghost"
        >
          {" "}
          Odświerz{" "}
        </Button>
      </div>
    );

  if (props.size === "sm")
    return (
      <div className="flex items-center justify-center text-center gap-3 p-2">
        <h2 className="font-semibold text-red-600 text-sm">
          {props.message || "Błąd ładowania danych"}
        </h2>
        <p className="text-gray-700 text-sm truncate max-w-[250px]">
          {errorMessage}
        </p>
        <Button
          onClickAction={() => window.location.reload()}
          className="!bg-error text-white px-2"
          variant="ghost"
        >
          {" "}
          Odświerz{" "}
        </Button>
      </div>
    );
};

export default LoadingError;
