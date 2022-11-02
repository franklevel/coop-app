export function toQueryString(filters: any) {
  if (!filters) return;
  return Object.keys(filters)
    .map((key) => key + "=" + filters[key])
    .join("&");
}
