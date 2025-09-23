import { useLoaderData, useParams } from "react-router";
import { Link } from "react-router";
import ZoomInSection from "../../Components/ZoomInSection";
import { useEffect } from "react";
import SectionHeader from "../../Components/Home/SectionHeader";

const CategoryBooks = () => {
  // Page Title
  useEffect(() => {
    document.title = "BooksHouse | Category";
  }, []);

  const books = useLoaderData();
  const { category } = useParams();

  return (
    <div className="w-full md:max-w-screen-xl mx-auto px-4 py-10">
      <SectionHeader
        title={`Explore ${category} Books`}
        subtitle={`Discover a wide collection of ${category} books to expand your knowledge and imagination`}
      />
      <div className="grid md:grid-cols-2 grid-cols-1 gap-8 ">
        {books.map((book) => (
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
                    <span className="font-semibold">Total Pages:</span>{" "}
                    {book.total_page}
                  </p>
                  <p className="text-[#242253]">
                    <span className="font-semibold">Author:</span>{" "}
                    {book.book_author}
                  </p>
                  <p className="text-[#242253]">
                    <span className="font-semibold">Category:</span>{" "}
                    {book.book_category}
                  </p>
                </div>

                <div className="text-sm text-gray-500">
                  Added by <span className="font-medium">{book.name}</span>
                </div>

                <div className="card-actions mt-4 justify-between items-center">
                  <div className="badge badge-outline capitalize font-medium pb-[2px]">
                    Total Upvote: {book.upvote.length}
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
    </div>
  );
};

export default CategoryBooks;
