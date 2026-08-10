import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  useProductStore,
} from "../store/product.store";

interface ProductPaginationProps {
  totalPages: number;
}

const ProductPagination = ({
  totalPages,
}: ProductPaginationProps) => {
  const page = useProductStore(
    (state) => state.page
  );

  const setPage = useProductStore(
    (state) => state.setPage
  );

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-2">

      <Button
        variant="outline"
        size="icon"
        disabled={page <= 1}
        onClick={() =>
          setPage(page - 1)
        }
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <span className="px-4 text-sm">
        Page {page} of {totalPages}
      </span>

      <Button
        variant="outline"
        size="icon"
        disabled={
          page >= totalPages
        }
        onClick={() =>
          setPage(page + 1)
        }
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

    </div>
  );
};

export default ProductPagination;
