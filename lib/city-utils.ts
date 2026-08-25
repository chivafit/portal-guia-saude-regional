export function citySlug(city: string) {
  return city.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replaceAll(" ", "-");
}

export function cityFromSlug(slug: string, cities: string[]) {
  return cities.find((city) => citySlug(city) === slug) ?? "";
}

export function cityAdCode(city: string) {
  return `CITY_${citySlug(city).toUpperCase()}_TOP`;
}
