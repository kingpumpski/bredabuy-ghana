import {
  Search,
  X,
} from "lucide-react";

import {
  FormEvent,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const StorefrontSearch = () => {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const submitSearch = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const value = query.trim();

    if (!value) {
      navigate("/search");
      return;
    }

    navigate(
      `/search?q=${encodeURIComponent(value)}`
    );
  };

  return (
    <form
      onSubmit={submitSearch}
      className="relative w-full"
      role="search"
    >
      <Search
        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />

      <Input
        value={query}
        onChange={(event) =>
          setQuery(event.target.value)
        }
        placeholder="Search products, brands and categories..."
        className="h-11 rounded-full pl-10 pr-20"
        aria-label="Search BredaBuy"
      />

      {query && (
        <button
          type="button"
          onClick={() => setQuery("")}
          className="absolute right-14 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}

      <Button
        type="submit"
        size="sm"
        className="absolute right-1 top-1/2 h-9 -translate-y-1/2 rounded-full px-4"
      >
        Search
      </Button>
    </form>
  );
};

export default StorefrontSearch;
