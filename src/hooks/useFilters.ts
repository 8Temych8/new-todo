import { useState } from "react";

export const useFilters = () => {
  const [filter, setFilter] = useState<"All" | "Complete" | "Incomplete">(
    "All"
  );

  const filterHandler = (
    filterState: "All" | "Complete" | "Incomplete"
  ): void => {
    setFilter(filterState);
  };

  return {
    filter,
    filterHandler,
  };
};
