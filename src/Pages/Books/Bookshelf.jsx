import { useLoaderData } from "react-router";
import BookCard from "../../Components/BookCard";

const Bookshelf = () => {

    const books = useLoaderData();

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