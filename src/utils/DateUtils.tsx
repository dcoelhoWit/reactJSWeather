export function formatEpochToUTCDate(epochTimestamp: number): string {
  const currentDate = new Date();
  const targetDate = new Date(epochTimestamp * 1000);
  const differenceInTime = targetDate.getTime() - currentDate.getTime();
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

  if (differenceInDays === 0) {
    return "Today";
  } else if (differenceInDays === 1) {
    return "Tomorrow";
  } else {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "UTC",
    };
    return targetDate.toLocaleString("en-GB", options).replace(",", "");
  }
}

export function formatEpochToUTCTime(epochTimestamp: number): string {
  const date = new Date(epochTimestamp * 1000);
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  };
  return date.toLocaleString("en-GB", options).replace(",", "");
}
