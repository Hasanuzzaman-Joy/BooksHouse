import ZoomInSection from "../../Components/ZoomInSection";
import BookCard from "../../Components/BookCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../Components/Loading";
import Container from "../../Components/Container";

const Bookshelf = () => {

    useEffect(() => {
        document.title = "BooksHouse | Bookshelf";
    }, [])

    const [filteredStatus, setFilteredStatus] = useState('');
    const [searchParams, setSearchParams] = useState('');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleStatus = (e) => {
        setFilteredStatus(e.target.value);
    }

    useEffect(() => {
        axios(`${import.meta.env.VITE_SERVER_URL}/all-books?filteredStatus=${filteredStatus}&searchParams=${searchParams}`)
            .then(res => {
                setBooks(res.data)
                setLoading(false)
            })
    }, [filteredStatus, searchParams])

    return (
        <>
            {
                loading ? <Loading /> :
                    (
                        <Container>
                            <ZoomInSection>
                            <div className="flex flex-col mb-3">
                                <h1 className="text-4xl font-bold text-center text-[#242253] mb-2 md:px-0 px-4">
                                    Explore the Library
                                </h1>
                                <h3 className="text-lg text-center text-gray-600 mb-6 md:px-0 px-4">
                                    Discover books shared by readers across the platform.
                                </h3>
                                <div className="flex flex-col items-center gap-4 mb-6">

                                    {/* Search Input */}
                                    <div className="flex items-center gap-2 w-full max-w-md mx-auto md:px-0 px-4">
                                        <label htmlFor="book_search" className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                                            Search:
                                        </label>
                                        <input
                                            type="search"
                                            onChange={(e) => setSearchParams(e.target.value)}
                                            name="book_search"
                                            id="book_search"
                                            placeholder="Book or Author name"
                                            className="flex-1 px-3 py-2 rounded-md border border-gray-300 bg-gray-50 text-gray-800 focus:border-gray-600"
                                            autoComplete="off"
                                        />
                                    </div>

                                    {/* Sort Dropdown */}
                                    <div className="flex items-center gap-2 w-full max-w-md mx-auto md:px-0 px-4">
                                        <label htmlFor="reading_status" className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                                            Sort by:
                                        </label>
                                        <select
                                            name="reading_status"
                                            onChange={handleStatus}
                                            id="reading_status"
                                            className="flex-1 px-3 py-2 rounded-md border border-gray-300 bg-gray-50 text-gray-800 focus:border-gray-600"
                                        >
                                            <option value="">Reading status</option>
                                            <option value="Want-to-Read">Want-to-Read</option>
                                            <option value="Reading">Reading</option>
                                            <option value="Read">Read</option>
                                        </select>
                                    </div>
                                </div>

                            </div>
                            </ZoomInSection>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:px-0 px-4">
                                {
                                    books.map(book => <BookCard key={book._id} book={book} />)
                                }
                            </div>
                        </Container>
                    )
            }
        </>
    );
};

export default Bookshelf;