import { useState, useCallback, useMemo } from "react";

interface FilterableItem {
  fullname: string;
}

export function useUserFilter<T extends FilterableItem>(items: T[]) {
  const [filterValue, setFilterValue] = useState("");

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      return item.fullname.toLowerCase().includes(filterValue.toLowerCase());
    });
  }, [items, filterValue]);

  return {
    filterValue,
    onSearchChange,
    onClear,
    filteredItems,
  };
}
