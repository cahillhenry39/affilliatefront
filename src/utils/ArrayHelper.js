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

export const nigerianStates = [
  { value: "", option: "Choose Below" },
  { value: "Abia", option: "Abia" },
  { value: "Adamawa", option: "Adamawa" },
  { value: "Akwa Ibom", option: "Akwa Ibom" },
  { value: "Anambra", option: "Anambra" },
  { value: "Bauchi", option: "Bauchi" },
  { value: "Bayelsa", option: "Bayelsa" },
  { value: "Benue", option: "Benue" },
  { value: "Borno", option: "Borno" },
  { value: "Cross River", option: "Cross River" },
  { value: "Delta", option: "Delta" },
  { value: "Ebonyi", option: "Ebonyi" },
  { value: "Edo", option: "Edo" },
  { value: "Ekiti", option: "Ekiti" },
  { value: "Enugu", option: "Enugu" },
  { value: "Federal Capital Territory", option: "Federal Capital Territory" },
  { value: "Gombe", option: "Gombe" },
  { value: "Imo", option: "Imo" },
  { value: "Jigawa", option: "Jigawa" },
  { value: "Kaduna", option: "Kaduna" },
  { value: "Kano", option: "Kano" },
  { value: "Katsina", option: "Katsina" },
  { value: "Kebbi", option: "Kebbi" },
  { value: "Kogi", option: "Kogi" },
  { value: "Kwara", option: "Kwara" },
  { value: "Lagos", option: "Lagos" },
  { value: "Nasarawa", option: "Nasarawa" },
  { value: "Niger", option: "Niger" },
  { value: "Ogun", option: "Ogun" },
  { value: "Ondo", option: "Ondo" },
  { value: "Osun", option: "Osun" },
  { value: "Oyo", option: "Oyo" },
  { value: "Plateau", option: "Plateau" },
  { value: "Rivers", option: "Rivers" },
  { value: "Sokoto", option: "Sokoto" },
  { value: "Taraba", option: "Taraba" },
  { value: "Yobe", option: "Yobe" },
  { value: "Zamfara", option: "Zamfara" },
];
