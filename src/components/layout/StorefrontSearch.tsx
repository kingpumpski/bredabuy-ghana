import { LoaderCircle, Search, X } from "lucide-react";
import { type FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SEARCH_FEEDBACK_MS = 450;

const StorefrontSearch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  useEffect(() => {
    if (!isSubmitting || location.pathname !== "/search") return;

    const timer = window.setTimeout(() => setIsSubmitting(false), SEARCH_FEEDBACK_MS);
    return () => window.clearTimeout(timer);
  }, [isSubmitting, location.pathname]);

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = query.trim();
    setIsSubmitting(true);
    navigate(value ? `/search?q=${encodeURIComponent(value)}` : "/search");
  };

  return (
    <form
      onSubmit={submitSearch}
      className="relative w-full"
      role="search"
      aria-busy={isSubmitting}
    >
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />

      <Input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search products, brands and categories..."
        className="h-11 rounded-full pl-10 pr-24 transition-shadow focus-visible:ring-2"
        aria-label="Search BredaBuy"
        autoComplete="off"
      />

      {query && !isSubmitting && (
        <button
          type="button"
          onClick={() => setQuery("")}
          className="absolute right-16 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}

      <Button
        type="submit"
        size="sm"
        disabled={isSubmitting}
        className="absolute right-1 top-1/2 h-9 -translate-y-1/2 rounded-full px-4 transition-transform duration-200 active:scale-95 disabled:cursor-wait"
        aria-label={isSubmitting ? "Searching" : "Search"}
      >
        {isSubmitting ? (
          <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <>
            <Search className="mr-1.5 h-4 w-4" aria-hidden="true" />
            <span>Search</span>
          </>
        )}
      </Button>
    </form>
  );
};

export default StorefrontSearch;
