import { useState } from "react";

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (query: string): void => {
    setSearchQuery(query.toLowerCase());
  };

  return {
    searchQuery,
    handleSearchChange,
  };
};
