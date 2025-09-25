export async function getAllCountries(country) {
  if (!country) return;

  const res = await fetch(
    `https://restcountries.com/v3.1/name/${country}?fullText=true`
  );
  const data = await res.json();

  return data;
}

export const emplyementType = [
  "",
  "Self employed",
  "Employed",
  "Vocational",
  "Not working",
];

export const jobType = [
  "",
  "Accountant",
  "Agency",
  "Agriculture",
  "Apprenticeship",
  "Arts",
  "Business Admin",
  "Business",
  "Communication",
  "Construction",
  "Education",
  "Engineering",
  "Finance",
  "Health Care",
  "Manufacturing",
  "Technology",
  "Trader",
  "Transportation",
  "Others",
];

export const amountLimit = [
  "",
  100,
  200,
  500,
  1000,
  2000,
  3000,
  5000,
  10000,
  20000,
  50000,
  100000,
];

export const countries = [
  { value: "", option: "Choose Below" },
  { value: "Nigeria", option: "Nigeria" },
  // { value: "Ghana", option: "Ghana" },
  // { value: "South Africa", option: "South Africa" },
  // { value: "Cameroon", option: "Cameroon" },
];
