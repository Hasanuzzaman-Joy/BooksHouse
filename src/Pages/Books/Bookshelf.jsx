import BookCard from "../../Components/BookCard";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Services/AxiosInstance/useAxiosSecure";

const Bookshelf = () => {

    const [books, setBooks] = useState([]);
    const axiosInstance = useAxiosSecure();

    useEffect(() => {
        axiosInstance(`${import.meta.env.VITE_SERVER_URL}/books`)
            .then(res => {
                setBooks(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }, [axiosInstance])

    console.log(books)

    return (
        <div className="w-full md:w-11/12 mx-auto py-7">
            <div className="flex flex-col mb-3">
                <h1 className="text-4xl font-bold text-center text-[#242253] mb-2">
                    Explore the Library
                </h1>
                <h3 className="text-lg text-center text-gray-600 mb-6">
                    Discover books shared by readers across the platform.
                </h3>
            </div>

            <div className="grid grid-cols-3 gap-5">
                {
                    books.map(book => <BookCard key={book._id} book={book} />)
                }
            </div>
        </div>
    );
};

export default Bookshelf;