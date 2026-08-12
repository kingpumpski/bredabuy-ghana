import {
  FormEvent,
  useState,
} from "react";
import { LoaderCircle, Search, X } from "lucide-react";
import { useNavigate, useNavigation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const StorefrontSearch = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [query, setQuery] = useState("");

  const isSearching =
    navigation.state === "loading" &&
    navigation.location?.pathname === "/search";

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const value = query.trim();
    const destination = value
      ? `/search?q=${encodeURIComponent(value)}`
      : "/search";

    void navigate(destination);
  };

  return (
    <form
      onSubmit={submitSearch}
      className="relative w-full"
      role="search"
      aria-busy={isSearching}
    >
      <Search
        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />

      <Input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search products, brands and categories..."
        className="h-11 rounded-full pl-10 pr-24"
        aria-label="Search BredaBuy"
      />

      {query && !isSearching && (
        <button
          type="button"
          onClick={() => setQuery("")}
          className="absolute right-16 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}

      <Button
        type="submit"
        size="sm"
        disabled={isSearching}
        className="absolute right-1 top-1/2 h-9 -translate-y-1/2 rounded-full px-4 transition-transform duration-200 active:scale-95"
        aria-label={isSearching ? "Searching" : "Submit search"}
      >
        {isSearching ? (
          <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <Search className="h-4 w-4" aria-hidden="true" />
        )}
        <span className="hidden sm:inline">
          {isSearching ? "Searching" : "Search"}
        </span>
      </Button>
    </form>
  );
};

export default StorefrontSearch;
