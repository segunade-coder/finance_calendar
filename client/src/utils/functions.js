export const colors = [
  ["#2196f3", "#ffffff"],
  ["#7A3803", "#ffffff"],
  ["#9c27b0", "#ffffff"],
  ["#4caf4f", "#ffffff"],
  ["#E34A27", "#FFFFFF"],
  ["#028A0F", "#ffffff"],
  ["#eab308", "#ffffff"],
  ["#990F02", "#ffffff"],
  ["#4B5320", "#ffffff"],
  ["#DD571C", "#ffffff"],
  ["#3A5311", "#ffffff"],
  ["#3944BC", "#ffffff"],
];
const colorShuffled = colors.sort(() => Math.random - 0.5);

export const returnColor = (i, reversed = false) => {
  let index = i;
  index = index >= colors.length ? 0 : i;
  return reversed ? colorShuffled[index] : colors[index];
};

export const formatList = (role) => {
  const formatter = new Intl.ListFormat("en-GB", {
    style: "narrow",
    type: "conjunction",
  });

  const newRole = formatter.format(JSON.parse(role));
  return newRole;
};
export const renderDate = (date) => {
  if (date !== "" && date !== undefined && date !== null) {
    const formatter = Intl.DateTimeFormat("en-GB", {
      // dateStyle: "short",
      day: "2-digit",
      month: "short",
      year: "2-digit",
    });
    return formatter.format(new Date(date));
  }
};
export const statusFormat = (id) => {
  id = Number(id);
  switch (id) {
    case 0:
      return { text: "Pending", color: "secondary" };
    case 1:
      return { text: "Stuck", color: "danger" };
    case 2:
      return { text: "Done", color: "success" };
    case 3:
      return { text: "Working on", color: "warning" };

    default:
      return { text: "Pending", color: "secondary" };
  }
};
export const formatTimeAgo = (date) => {
  let formatter = new Intl.RelativeTimeFormat(undefined, {
    numeric: "auto",
  });
  const DIVISION = [
    { amount: 60, name: "seconds" },
    { amount: 60, name: "minutes" },
    { amount: 24, name: "hours" },
    { amount: 7, name: "days" },
    { amount: 4.34524, name: "weeks" },
    { amount: 12, name: "months" },
    { amount: Number.POSITIVE_INFINITY, name: "years" },
  ];

  let duration = (date - new Date()) / 1000;
  for (let i = 0; i < DIVISION.length; i++) {
    const division = DIVISION[i];
    if (Math.abs(duration) < division.amount) {
      return formatter.format(Math.round(duration), division.name);
    }
    duration /= division.amount;
  }
};
export const totalCash = (arr, prop) =>
  arr.map((cash) => cash[prop]).reduce((x, y) => x + y, 0);

export const checkIfEmpty = (values) => {
  let errors = [];
  values.forEach((value) => {
    let objValues = Object.values(value)[0] || null;
    let objKey = Object.keys(value);
    if (typeof objValues === "object") {
      if (Array.isArray(objValues) && objValues.length === 0)
        errors.push(`${objKey[0]} should not be empty`);

      if (objValues === null || objValues === undefined)
        errors.push(`${objKey[0]} is required`);
    } else {
      if (objValues === "" || objValues === null || objValues === undefined) {
        errors.push(`${objKey[0]} is required`);
      }
    }
  });
  return errors;
};
export const dateExpired = (date) =>
  new Date(date).valueOf() < new Date(Date.now()).valueOf() ? true : false;
export const getStatus = (id) => {
  id = parseInt(id);
  switch (id) {
    case 0:
      return "Pending";
    case 1:
      return "Stuck";
    case 2:
      return "Done";
    case 3:
      return "Working on";

    default:
      return "Pending";
  }
};
export const getStatusNumber = (id) => {
  switch (id) {
    case "Pending":
      return 0;
    case "Stuck":
      return 1;
    case "Done":
      return 2;
    case "Working on":
      return 3;
    default:
      return 0;
  }
};
