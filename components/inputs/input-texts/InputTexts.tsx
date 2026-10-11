import InputIndicators from "./InputIndicators";

type Props = {
  label?: string;
  description?: string;
  required?: boolean;
  unique?: boolean;
  hidden?: boolean;
};

const InputTexts = ({
  label,
  description,
  required,
  unique,
  hidden,
}: Props) => {
  const hasLabel = !!label;
  const hasDescription = !!description;

  return (
    <div>
      {hasLabel && (
        <legend className="mb-4 mr-6 font-semibold">
          <div className="flex">
            {label}
            <InputIndicators {...{ required, unique, hidden }} />
          </div>
        </legend>
      )}
    </div>
  );
};

export default InputTexts;
