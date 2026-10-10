export const convertDate = (date: Date) => {
  return Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    year: "numeric",
    month: "short",
  }).format(date);
};

export const statusSelection = (val: string) => {
  if (val == "CONFIRMED") {
    return "success";
  } else if (val == "REJECTED") {
    return "error";
  }
  return "default";
};

export function formatAgencyName(slug: string): string {
  return slug
    .replace(/-[a-f0-9]{8}$/i, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
export function capitalizeText(str: string) {
  const text = str.split("");
  let results = "";
  text.forEach((i) => {
    if (i == text[0]) {
      results += i.toUpperCase();
      return;
    }
    results += i.toLowerCase();
  });

  return results;
}
