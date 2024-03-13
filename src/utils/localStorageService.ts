import Filters from "../types/filters";

const DEFAULT_FILTERS: Filters = {
  gender: "male",
  searchQuery: "",
  pageNumber: 1,
};

export const getStoredFilters = () =>
  JSON.parse(
    localStorage.getItem("filters") || JSON.stringify(DEFAULT_FILTERS)
  ) as Filters;

export const storeFilters = (filters: Filters) =>
  localStorage.setItem("filters", JSON.stringify(filters));
