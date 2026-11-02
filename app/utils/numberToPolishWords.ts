const ones = [
  "",
  "jeden",
  "dwa",
  "trzy",
  "cztery",
  "pięć",
  "sześć",
  "siedem",
  "osiem",
  "dziewięć",
];

const teens = [
  "dziesięć",
  "jedenaście",
  "dwanaście",
  "trzynaście",
  "czternaście",
  "piętnaście",
  "szesnaście",
  "siedemnaście",
  "osiemnaście",
  "dziewiętnaście",
];

const tens = [
  "",
  "",
  "dwadzieścia",
  "trzydzieści",
  "czterdzieści",
  "pięćdziesiąt",
  "sześćdziesiąt",
  "siedemdziesiąt",
  "osiemdziesiąt",
  "dziewięćdziesiąt",
];

const hundreds = [
  "",
  "sto",
  "dwieście",
  "trzysta",
  "czterysta",
  "pięćset",
  "sześćset",
  "siedemset",
  "osiemset",
  "dziewięćset",
];

const thousands = ["", "tysiąc", "tysiące", "tysiące", "tysiące", "tysięcy"];

const getThousandForm = (number: number) => {
  const lastTwo = number % 100;
  const lastOne = number % 10;

  if (lastTwo >= 12 && lastTwo <= 14) return "tysięcy";
  if (lastOne === 1) return "tysiąc";
  if (lastOne >= 2 && lastOne <= 4) return "tysiące";

  return "tysięcy";
};

const getZlotyForm = (number: number) => {
  const lastTwo = number % 100;
  const lastOne = number % 10;

  if (number === 1) return "złoty";
  if (lastTwo >= 12 && lastTwo <= 14) return "złotych";
  if (lastOne >= 2 && lastOne <= 4) return "złote";

  return "złotych";
};

const convertBelowThousand = (number: number): string => {
  const result: string[] = [];

  const hundred = Math.floor(number / 100);
  const remainder = number % 100;

  if (hundred) result.push(hundreds[hundred]);

  if (remainder >= 10 && remainder <= 19) {
    result.push(teens[remainder - 10]);
  } else {
    const ten = Math.floor(remainder / 10);
    const one = remainder % 10;

    if (ten) result.push(tens[ten]);
    if (one) result.push(ones[one]);
  }

  return result.join(" ");
};

export const numberToPolishWords = (value: string | number): string => {
  const number = Number(value);

  if (!Number.isInteger(number) || number < 0 || number >= 1_000_000) {
    return "";
  }

  if (number === 0) return "zero złotych";

  const result: string[] = [];

  const thousandPart = Math.floor(number / 1000);
  const remainder = number % 1000;

  if (thousandPart) {
    if (thousandPart === 1) {
      result.push("tysiąc");
    } else {
      result.push(
        convertBelowThousand(thousandPart),
        getThousandForm(thousandPart),
      );
    }
  }

  if (remainder) {
    result.push(convertBelowThousand(remainder));
  }

  result.push(getZlotyForm(number));

  return result.filter(Boolean).join(" ");
};
