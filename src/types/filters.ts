export default interface Filters {
  gender: "male" | "female" | "both";
  searchQuery?: string;
  pageNumber: number;
}
