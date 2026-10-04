import Link from "next/link";

const VARIANTS = {
  primary: "btn-primary",
  "primary-empty": "btn-primary-empty",
  ghost: "",
};

type Props = {
  children: React.ReactNode;
  link: string;
  target?: string;
  rel?: string;
  className?: string;
  variant?: "primary" | "primary-empty" | "ghost";
  ariaLabel?: string;
  ariaCurrent?: "page";
  download?: boolean;
};

export default function ButtonLink({
  link,
  target,
  rel,
  className,
  variant = "ghost",
  ariaLabel,
  ariaCurrent,
  children,
  download,
}: Props) {
  return (
    <Link
      href={link}
      target={target}
      rel={target === "_blank" ? (rel ?? "noopener noreferrer") : rel}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
      download={download}
      className={`block cursor-pointer text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${VARIANTS[variant]} ${className ?? ""} `}
    >
      {children}
    </Link>
  );
}
