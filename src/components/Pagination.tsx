import { motion } from "framer-motion";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Generate array of page numbers to display
  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxPagesToShow = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center mt-6">
      <nav className="bg-neutral-900 p-2 rounded-lg border border-neutral-700/50">
        <ul className="flex space-x-2 items-center">
          <li>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                px-3 py-1 text-sm font-satoshi rounded-lg text-white bg-neutral-900 hover:bg-neutral-800/80 hover:text-orange-500
                transition-all duration-200 backdrop-blur-sm disabled:opacity-50 flex items-center
              `}
              onClick={handlePrevious}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <svg
                className="w-5 h-5 mr-1 text-neutral-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
          </li>
          {getPageNumbers().map((pageNumber) => (
            <li key={pageNumber}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  px-3 py-1 text-sm font-satoshi rounded-lg transition-all duration-200 backdrop-blur-sm
                  ${
                    pageNumber === currentPage
                      ? "bg-neutral-800/80 text-orange-400 border border-orange-400 shadow-orange-500/50"
                      : "bg-neutral-900 text-white hover:bg-neutral-800/80 hover:text-orange-500"
                  }
                `}
                onClick={() => onPageChange(pageNumber)}
                aria-label={`Page ${pageNumber}`}
              >
                {pageNumber}
              </motion.button>
            </li>
          ))}
          <li>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                px-3 py-1 text-sm font-satoshi rounded-lg text-white bg-neutral-900 hover:bg-neutral-800/80 hover:text-orange-500
                transition-all duration-200 backdrop-blur-sm disabled:opacity-50 flex items-center
              `}
              onClick={handleNext}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <svg
                className="w-5 h-5 ml-1 text-neutral-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;