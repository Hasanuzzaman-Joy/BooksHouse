
import { Link } from "react-router";

const BookCard = ({ book }) => {

    const { _id, book_title, cover_photo, total_page, book_author, book_category, book_overview, upvote, name, reading_status } = book

    return (
        <div className="card w-full bg-[#f4f3f3] shadow-lg border border-gray-200 hover:shadow-xl transition duration-300">
            <figure className="h-60 flex items-center justify-center bg-[#bfbdff]">
                <img
                    src={cover_photo}
                    alt={book_title}
                    className="max-h-full max-w-full object-contain py-3"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-[#242253] text-2xl font-bold">
                    {book_title}
                </h2>

                <p className="text-gray-700 text-base">{book_overview}</p>

                <div className="my-2 space-y-2 text-base">
                    <p className="text-[#242253]"><span className="font-semibold">Total Pages:</span> {total_page}</p>
                    <p className="text-[#242253]"><span className="font-semibold">Author:</span> {book_author}</p>
                    <p className="text-[#242253]"><span className="font-semibold">Category:</span> {book_category}</p>
                    <p className="text-[#242253]"><span className="font-semibold">read:</span> {reading_status}</p>
                </div>

                <div className="text-sm text-gray-500">
                    Added by <span className="font-medium">{name}</span>
                </div>

                <div className="card-actions mt-4 justify-between items-center">
                    <div className="badge badge-outline capitalize font-medium pb-[2px]">Total Upvote: {upvote.length}</div>
                    <Link to={`/book-details/${_id}`} className="btn bg-[#242253] text-white hover:bg-[#bfbdff] hover:text-[#242253] transition-all">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BookCard;