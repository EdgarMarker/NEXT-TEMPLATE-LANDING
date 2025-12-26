"use client";
import "./filter.css";
import { SLUG } from "@/app/_domain/module.interface";
import { useMemo, useState } from "react";

interface FilterOption {
  value: string;
  label: string;
}

interface Props<T> {
  allItems: T[];
  filterOptions: FilterOption[];
  renderItem: (item: T, index: any) => React.ReactNode;
  getItemCategorySlug: (item: T) => SLUG;
  itemsPerPage?: number;
}

const FilterAndPagination = <T,>({
  allItems,
  filterOptions,
  renderItem,
  getItemCategorySlug,
  itemsPerPage = 9,
}: Props<T>) => {
  const [selectedCategory, setSelectedCategory] = useState(
    filterOptions[0]?.value || "all"
  );
  const [page, setPage] = useState(1);

  const filteredItems = useMemo(() => {
    if (selectedCategory === "all") return allItems;
    return allItems.filter(
      (item) => getItemCategorySlug(item).current === selectedCategory
    );
  }, [allItems, selectedCategory, getItemCategorySlug]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleFilterChange = (value: string) => {
    setSelectedCategory(value);
    setPage(1);
  };

  const goToPage = (num: number) => {
    if (num !== page) setPage(num);
  };

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="column__1 filter__container">
      {/**FILTRADOR CON SU SELECT */}
      <label htmlFor="filter-select" className="filter-select">
        Filtrar:{" "}
        <select
          id="filter-select"
          value={selectedCategory}
          onChange={(e) => handleFilterChange(e.target.value)}
        >
          {filterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      {/*RESULTADO DEL SELECT*/}
      <ul role="list" className="listado">
        {currentItems.map((item, idx) => renderItem(item, idx))}
      </ul>

      {/**BOTONES DE PAGINA */}
      {totalPages > 1 && (
        <div className="pagination">
          <button type="button" onClick={goPrev} disabled={page === 1}>
            ‹
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              type="button"
              key={num}
              onClick={() => goToPage(num)}
              className={page === num ? "active" : ""}
            >
              {num}
            </button>
          ))}

          <button type="button" onClick={goNext} disabled={page === totalPages}>
            ›
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterAndPagination;
