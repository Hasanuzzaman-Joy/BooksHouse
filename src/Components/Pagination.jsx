import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({
  pages,
  handlePage,
  handleNext,
  handlePrv,
  currentPage,
}) => {
  return (
    <div className="flex justify-center items-center gap-2 mt-20">
      {/* Previous Button */}
      <button
        onClick={handlePrv}
        disabled={currentPage === 1}
        className={`px-3 py-2 rounded-lg flex items-center gap-1 border cursor-pointer transition ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-[#242253] hover:bg-[#bfbdff] text-white hover:text-[#242253] border-gray-300"
        }`}
      >
        <FaChevronLeft size={14} /> Prev
      </button>

      {/* Page Numbers */}
      <div className="flex gap-2">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePage(page)}
            className={`w-10 h-10 rounded-lg border font-medium cursor-pointer transition ${
              currentPage === page
                ? "bg-[#242253] text-white border-[#242253]"
                : "bg-white text-[#242253] border-gray-300 hover:bg-[#bfbdff]"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === pages.length}
        className={`px-3 py-2 rounded-lg flex items-center gap-1 font-medium border cursor-pointer transition ${
          currentPage === pages.length
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-[#242253] hover:bg-[#bfbdff] text-white hover:text-[#242253] border-gray-300"
        }`}
      >
        Next <FaChevronRight size={14} />
      </button>
    </div>
  );
};

export default Pagination;
