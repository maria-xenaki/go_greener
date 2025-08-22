export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null; // hide if only 1 page

  return (
    <div className="d-flex justify-content-between mt-4">
      <button
        className="btn btn-secondary"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>

      <span>Page {currentPage} of {totalPages}</span>

      <button
        className="btn btn-secondary"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}
