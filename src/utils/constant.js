export const investmentPackage = [
  {
    percentage: "",
    duration: "choose duration",
  },
  {
    percentage: 4,
    duration: "7 days",
  },
  {
    percentage: 20,
    duration: "1 month",
  },
  {
    percentage: 65,
    duration: "3 months",
  },
  {
    percentage: 130,
    duration: "6 months",
  },
];

// var myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");

// var raw = JSON.stringify({
//   method: "decodescript",
//   params: ["76a914af92ad98c7f77559f96430dfef2a6805b87b24f888ac"],
// });

// var requestOptions = {
//   method: "POST",
//   headers: myHeaders,
//   body: raw,
//   redirect: "follow",
// };

// fetch(
//   "https://dimensional-side-moon.btc.quiknode.pro/40490a9d488ee908166ef85b72acf1ef2b153a6d/",
//   requestOptions
// )
//   .then((response) => {
//     // console.log(response);

//     return response.text();
//   })
//   .then((result) => {
//     console.log(result);

//     return result;
//   })
//   .catch((error) => console.log("error", error));

// const BTCToken = "40490a9d488ee908166ef85b72acf1ef2b153a6d";

// const core = new Core({
//   endpointUrl:
//     "https://dimensional-side-moon.btc.quiknode.pro/40490a9d488ee908166ef85b72acf1ef2b153a6d/",
// });

// console.log(core.client.getBlockNumber());

// const apiKeyCoinMarket = "5262cc94-ac3d-409c-876d-2932e062b861";

// function fetchBTCPrize() {
//   const prize = fetch("https://api.coingecko.com/api/v3/coins/btc");

//   console.log(prize);
// }

// fetchBTCPrize();

export const currentBTCRate = 45000;
export const cardCharges = 0.08;

export const isCreditCardAvailable = true;
export const isBTCPayAvailable = true;
export const isThirdPartyAvailable = true;

export const BTCAddress = "bc1q2j45n4sl78k39qy0cyta4mav0fzaalq7q44dpw";
export const timeToMakeDeposit = 60; //in Mins
