const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
  return (
    <div className="flex justify-center">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => handlePageChange(i + 1)}
          className={`mx-1 p-3 py-1 mb-3 mt-3 rounded cursor-pointer ${currentPage === i + 1 ? "bg-orange-500 text-white" : "bg-orange-400"}`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}; 

export default Pagination;
