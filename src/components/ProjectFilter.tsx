"use client";

import { useEffect, useState } from "react";
import {
  PROJECT_LIST_ID,
  filterCounts,
  filters,
  isFilterId,
  type FilterId,
} from "@/lib/projects";

const PARAM = "filter";

function applyFilter(id: FilterId) {
  const list = document.getElementById(PROJECT_LIST_ID);
  if (list) list.dataset.filter = id;
}

/**
 * Filter control for the project list.
 *
 * Renders only the buttons. The list is server-rendered and filtered in CSS
 * from its `data-filter` attribute, so the project markup never enters the
 * client bundle. The choice is mirrored into `?filter=` so a view can be
 * shared, and read after mount to avoid a hydration mismatch.
 */
export function ProjectFilter() {
  const [active, setActive] = useState<FilterId>("all");

  const select = (id: FilterId) => {
    setActive(id);
    applyFilter(id);
    const url = new URL(window.location.href);
    if (id === "all") url.searchParams.delete(PARAM);
    else url.searchParams.set(PARAM, id);
    window.history.replaceState(null, "", url);
  };

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get(PARAM);
    if (isFilterId(fromUrl) && fromUrl !== "all") {
      setActive(fromUrl);
      applyFilter(fromUrl);
    }
  }, []);

  // A link elsewhere on the page (the hero results, the skill list) can point
  // at a project the current filter hides. Clear the filter before the browser
  // resolves the anchor, so the jump lands on something visible.
  useEffect(() => {
    if (active === "all") return;
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href^="#project-"]');
      if (!link) return;
      const target = document.querySelector(link.getAttribute("href")!);
      if (target && target.getAttribute("data-category") !== active) {
        select("all");
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  });

  return (
    <div className="filter" role="group" aria-label="Filter projects">
      {filters.map((filter) => (
        <button
          key={filter.id}
          type="button"
          onClick={() => select(filter.id)}
          aria-pressed={active === filter.id}
          aria-controls={PROJECT_LIST_ID}
        >
          {filter.label}
          <span className="filter__count">{filterCounts[filter.id]}</span>
        </button>
      ))}
      <span className="sr-only" role="status">Showing {filterCounts[active]} projects</span>
    </div>
  );
}
