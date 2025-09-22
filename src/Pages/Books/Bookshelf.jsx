import { useEffect, useState } from "react";
import axios from "axios";
import ZoomInSection from "../../Components/ZoomInSection";
import BookCard from "../../Components/BookCard";
import Loading from "../../Components/Loading";
import Pagination from "../../Components/Pagination";

const Bookshelf = () => {
  const [filteredStatus, setFilteredStatus] = useState("");
  const [searchParams, setSearchParams] = useState("");
  const [allBooks, setAllBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 9;

  // Page Title
  useEffect(() => {
    document.title = "BooksHouse | Bookshelf";
  }, []);

  // Fetch Books Data
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await axios(
          `${
            import.meta.env.VITE_SERVER_URL
          }/all-books?page=${currentPage}&limit=${limit}`
        );
        setAllBooks(res.data.books || []);
        setBooks(res.data.books || []);
        setTotalPages(res.data.totalPages || 1);
      } catch (err) {
        console.error(err);
        setAllBooks([]);
        setBooks([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [currentPage]);

  // filtering for search
  useEffect(() => {
    let filtered = [...allBooks];

    if (filteredStatus) {
      filtered = filtered.filter(
        (book) => book.reading_status === filteredStatus
      );
    }

    if (searchParams) {
      filtered = filtered.filter(
        (book) =>
          book.book_title.toLowerCase().includes(searchParams.toLowerCase()) ||
          book.book_author.toLowerCase().includes(searchParams.toLowerCase())
      );
    }

    setBooks(filtered);
  }, [searchParams, filteredStatus, allBooks]);

  // Scroll to Top on Page Change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Pagination Handlers
  const handlePage = (page) => setCurrentPage(page);
  const handlePrv = () => setCurrentPage((prev) => prev - 1);
  const handleNext = () => setCurrentPage((prev) => prev + 1);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full md:max-w-screen-xl mx-auto px-4 py-10">
          {/* Page Heading */}
          <ZoomInSection>
            <h1 className="text-2xl md:text-4xl font-bold text-center text-[#242253] mb-2">
              Explore the Library
            </h1>
            <h3 className="text-lg text-center text-gray-600 mb-6">
              Discover books shared by readers across the platform.
            </h3>

            {/* Filters Section */}
            <div className="flex flex-col items-center gap-4 mb-6 w-full max-w-md mx-auto">
              {/* Search Input */}
              <div className="flex items-center gap-2 w-full">
                <label
                  htmlFor="book_search"
                  className="text-sm font-semibold text-gray-700"
                >
                  Search:
                </label>
                <input
                  type="search"
                  onChange={(e) => {
                    setSearchParams(e.target.value);
                    setCurrentPage(1);
                  }}
                  id="book_search"
                  placeholder="Book or Author name"
                  className="flex-1 px-3 py-2 rounded-md border border-gray-300 bg-gray-50 text-gray-800 focus:border-gray-600 cursor-pointer"
                  autoComplete="off"
                />
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 w-full">
                <label
                  htmlFor="reading_status"
                  className="text-sm font-semibold text-gray-700"
                >
                  Sort by:
                </label>
                <select
                  id="reading_status"
                  onChange={(e) => {
                    setFilteredStatus(e.target.value);
                    setCurrentPage(1);
                  }}
                  value={filteredStatus}
                  className="flex-1 px-3 py-2 rounded-md border border-gray-300 bg-gray-50 text-gray-800 focus:border-gray-600 cursor-pointer"
                >
                  <option value="">Reading status</option>
                  <option value="Want-to-Read">Want-to-Read</option>
                  <option value="Reading">Reading</option>
                  <option value="Read">Read</option>
                </select>
              </div>
            </div>
          </ZoomInSection>

          {/* Books Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
            {books.length > 0 ? (
              books.map((book) => <BookCard key={book._id} book={book} />)
            ) : (
              <p className="text-center col-span-full text-gray-500">
                No books found for the current filter/search.
              </p>
            )}
          </div>

          {/* Pagination */}
          {!searchParams && !filteredStatus && totalPages > 1 && (
            <Pagination
              pages={Array.from({ length: totalPages }, (_, i) => i + 1)}
              handlePage={handlePage}
              handleNext={handleNext}
              handlePrv={handlePrv}
              currentPage={currentPage}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Bookshelf;
