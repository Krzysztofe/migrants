import Loader from "../loaders/Loader";

const VARIANTS = {
  primary: "btn-primary",
  "primary-empty": "btn-primary-empty",
  ghost: "",
};

type Props = {
  variant?: "primary" | "primary-empty" | "ghost";
  isLoading?: boolean;
  onClickAction?: (...args: any[]) => void | Promise<void>;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
  "aria-expanded"?: boolean;
  children?: React.ReactNode;
};

const Button = (props: Props) => {
  return (
    <button
      type={props.type}
      onClick={props.onClickAction}
      disabled={props.disabled || props.isLoading}
      aria-label={props.ariaLabel}
      aria-busy={props.isLoading}
      aria-disabled={props.disabled || props.isLoading}
      aria-expanded={props["aria-expanded"]}
      className={`block 
cursor-pointer relative text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${VARIANTS[props.variant ?? "ghost"]} ${props.className ?? ""} `}
    >
      <span
        className={`${props.isLoading ? "opacity-0" : "opacity-100"} flex items-center justify-center gap-2`}
      >
        {props.children}
      </span>

      {props.isLoading && (
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center"
        >
          <Loader size="sm" />
        </span>
      )}

      {props.isLoading && (
        <span className="sr-only">Trwa wykonywanie operacji</span>
      )}
    </button>
  );
};

export default Button;
