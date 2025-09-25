import {
  formatDistance,
  parseISO,
  addMonths,
  addDays,
  formatISO,
  addMinutes,
  add,
  isToday,
  isYesterday,
  isSameWeek,
  isSameMonth,
} from "date-fns";
import { differenceInDays } from "date-fns/esm";

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export function getMonthDateFromNow(isAWeek, number, date) {
  if (isAWeek === true) {
    if (date) {
      const data = addDays(new Date(date), number);
      const result = formatISO(data);
      return result;
    }

    const data = addDays(new Date(Date.now()), number);
    const result = formatISO(data);
    return result;
  }

  if (date) {
    const data = addMonths(new Date(date), number);
    const result = formatISO(data);
    return result;
  }
  const data = addMonths(new Date(Date.now()), number);
  const result = formatISO(data);

  return result;
}

export function getFutureMinutesDate(num, date) {
  const data = addMinutes(new Date(date ? date : Date.now()), Number(num));
  const result = formatISO(data);
  return result;
}

export const formatCurrency = (value, currency) =>
  new Intl.NumberFormat("en", {
    style: "currency",
    currency: currency ? currency : "NGN",
    currencyDisplay: "narrowSymbol",
  }).format(value);

export const formatCurrencyParts = (value, currency) => {
  const parts = new Intl.NumberFormat("en", {
    style: "currency",
    currency: currency ? currency : "NGN",
    currencyDisplay: "narrowSymbol",
  }).formatToParts(value);

  return {
    currency: parts.find((p) => p.type === "currency")?.value,
    amount: parts
      .filter((p) => p.type !== "currency")
      .map((p) => p.value)
      .join(""),
  };
};

export function formatDate2(dateStr) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));
}

export function formatDateTime(dateStr) {
  return new Intl.DateTimeFormat("en", {
    // day: "numeric",
    // month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));
}

export function formatDateOnly(dateStr) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(dateStr));
}

// https://uibakery.io/regex-library/phone-number
export const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

export const isValidPhonePlain = (str) => /^\d{11}$/.test(str);

export function generateRandomChar(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export const formatDate = () => {
  const formattedDate = new Date(Date.now());

  const daysInWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthsInYear = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const year = formattedDate.getFullYear();
  const month = monthsInYear[formattedDate.getMonth()];
  const weekDays = daysInWeek[formattedDate.getDay()];
  const hours = String(formattedDate.getHours()).padStart(2, 0);
  const mins = String(formattedDate.getMinutes()).padStart(2, 0);
  const time = formattedDate.getTime();
  let day = String(formattedDate.getDate());

  day =
    day === "1" || (day.endsWith("1") && day !== "11")
      ? day + "st"
      : day === "2" || (day.endsWith("2") && day !== "12")
      ? day + "nd"
      : day === "3" || (day.endsWith("3") && day !== "13")
      ? day + "rd"
      : day + "th";

  return { year, month, day, weekDays, time, hours, mins };
};

export const getMinsAndSecs = (created_at, num) => {
  // console.log(new Date(date), num);
  const futureTime = add(new Date(created_at), { minutes: num });
  // console.log(futureTime);

  return futureTime;
};

export function sortArrayDesc(array) {
  const sortedArray = array.sort((a, b) => {
    const first = a.created_at;
    const second = b.created_at;

    if (first > second) {
      return -1;
    }

    if (first < second) {
      return 1;
    }
  });
  return sortedArray;
}

export function sortArrayDesc2(array, field) {
  const sortedArray = array.sort((a, b) => {
    const first = a[field];
    const second = b[field];

    if (first > second) {
      return -1;
    }

    if (first < second) {
      return 1;
    }
  });
  return sortedArray;
}

export function sortArrayAsc(array) {
  const sortedArray = array.sort((a, b) => {
    const first = a.created_at;
    const second = b.created_at;

    if (first > second) {
      return 1;
    }

    if (first < second) {
      return -1;
    }
  });
  return sortedArray;
}

export function arrayRange(start, stop, step) {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
  );
}

export function getTotalAmount(array, type) {
  const total = array
    ?.filter((data) => data.type === type && data.status === "success")
    ?.reduce((init, next) => init + Number(next.amount), 0);

  return total;
}

export function getTotalAmountHelper(array) {
  const total = array
    ?.filter((data) => data.status === "running")
    ?.reduce(
      (init, next) =>
        init +
        (Number(next.amount) +
          Number(next.profitPerDay) *
            Math.abs(differenceInDays(new Date(next.created_at), new Date()))),
      0
    );

  return total;
}

export function getTotalOnDuration(array, type, duration) {
  const total = array
    ?.filter(
      (data) =>
        data.type === type &&
        (duration === "today"
          ? isToday(new Date(data.created_at))
          : duration === "yesterday"
          ? isYesterday(new Date(data.created_at))
          : duration === "week"
          ? isSameWeek(new Date(data.created_at), new Date())
          : isSameMonth(new Date(data.created_at), new Date()))
    )
    ?.reduce((init, next) => init + Number(next.amount), 0);

  return total;
}

export function getAllArray(array, type) {
  const resultArray = array?.filter((data) => data.type === type);

  return resultArray;
}

export function getArrayTotal(array, type) {
  const arrayTotal = array?.filter((data) => data.type === type)?.length;

  return arrayTotal;
}

/// For referrals

export function getReferralsOnDuration(array, duration) {
  const total = array
    ?.filter((data) =>
      duration === "today"
        ? isToday(new Date(data.created_at))
        : duration === "yesterday"
        ? isYesterday(new Date(data.created_at))
        : duration === "week"
        ? isSameWeek(new Date(data.created_at), new Date())
        : duration === "all"
        ? true
        : isSameMonth(new Date(data.created_at), new Date())
    )
    ?.reduce((init, next) => init + Number(next?.amountPaidToReferral), 0);

  return total;
}

// export function getTotal(array, filter) {
//   if (filter) {
//     const total = array
//       ?.filter((data) => data.status !== filter)
//       ?.reduce((init, next) => init + next.amount, 0);

//     return total;
//   }
//   const total = array?.reduce((init, next) => init + next.amount, 0);

//   return total;
// }

export function makeNumberWhole(num) {
  const result = Math.round(Number(num) / 1) * 1;

  return result;
}

export function handleFormatCryptoAmount(num) {
  const digits = 1000000;
  const result = Number(Math.round(num * digits) / digits);

  return result;
}

export function formatTextCapitalize(text) {
  const formattedText = text
    ?.toLowerCase()
    ?.split(" ")
    ?.map(
      (el) =>
        el &&
        el?.split("")[0]?.toUpperCase() +
          el?.split("")?.slice(1, el?.split("")?.length).join("")
    )
    ?.join(" ");

  return formattedText;
}

export function formatTextCapitalizeFirstLetter(text) {
  const formattedText = text
    ?.toLowerCase()
    ?.split(".")
    ?.map(
      (el) =>
        el &&
        el?.trim()?.split("")[0]?.toUpperCase() +
          el?.trim()?.split("")?.slice(1, el?.split("")?.length).join("")
    )
    ?.join(". ");

  return formattedText;
}
