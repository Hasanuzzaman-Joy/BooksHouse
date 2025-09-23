import { Link } from "react-router";
import ZoomInSection from "../ZoomInSection";

const PopularBooks = ({ popularBooks }) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {popularBooks.map((book) => (
          <ZoomInSection key={book._id}>
            <div className="card w-full bg-[#f4f3f3] shadow-lg border border-gray-200 hover:shadow-xl transition duration-300">
              <figure className="h-60 flex items-center justify-center bg-[#bfbdff]">
                <img
                  src={book.cover_photo}
                  alt={book.book_title}
                  className="max-h-full max-w-full object-contain py-3"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-[#242253] text-2xl font-bold">
                  {book.book_title}
                </h2>

                <p className="text-gray-700 text-base line-clamp-2">
                  {book.book_overview}
                </p>

                <div className="my-2 space-y-2 text-base">
                  <p className="text-[#242253]">
                    <span className="font-semibold">Author:</span>{" "}
                    {book.book_author}
                  </p>
                  <p className="text-[#242253]">
                    <span className="font-semibold">Category:</span>{" "}
                    {book.book_category}
                  </p>
                </div>

                <div className="card-actions mt-4 justify-between items-center">
                  <div className="badge badge-outline capitalize font-medium">
                    Total Upvote: {book.upvote?.length || 0}
                  </div>
                  <Link
                    to={`/book-details/${book._id}`}
                    className="btn bg-[#242253] text-white hover:bg-[#bfbdff] hover:text-[#242253] transition-all"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </ZoomInSection>
        ))}
      </div>
    </>
  );
};

export default PopularBooks;
