import { useEffect } from "react";
import { useLoaderData } from "react-router";
import Rating from "../../Components/Rating";

const BookDetails = () => {

    useEffect(() => {
        document.title = "BooksHouse | Details";
    }, [])

    const book = useLoaderData();

    const { _id, book_title, cover_photo, total_page, book_author, book_category, book_overview, upvote, name, reading_status, email } = book;

    return (
        <div className='w-full md:w-11/12 mx-auto py-10'>
            <div className="bg-[#f4f3f3] mx-auto rounded-xl shadow-lg overflow-hidden md:flex">
                <figure className="w-full md:w-1/2 object-cover h-120 flex items-center justify-center bg-[#bfbdff]">
                    <img
                        src={cover_photo}
                        alt={book_title}
                        className="max-h-full max-w-full object-contain py-3"
                    />
                </figure>
                <div className="px-6 flex flex-col justify-center md:w-1/2 space-y-4">
                    <h2 className="text-3xl font-bold text-[#242253] text-center">{book_title}</h2>
                    <p className="text-gray-600 mb-5 text-base text-center">{book_overview}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base text-gray-700 justify-items-center w-full">
                        <div>
                            <span className="font-semibold text-[#242253]">Category:</span> {book_category}
                        </div>
                        <div>
                            <span className="font-semibold text-[#242253]">Reading Status:</span> {reading_status}
                        </div>
                        <div>
                            <span className="font-semibold text-[#242253]">Author:</span> {book_author}
                        </div>
                        <div>
                            <span className="font-semibold text-[#242253]">Total Pages:</span> {total_page}
                        </div>
                        <div>
                            <span className="font-semibold text-[#242253]">Added By:</span> {name}
                        </div>
                        <div className="font-bold">
                            <span className="font-semibold text-[#242253]">Total Upvote:</span> {upvote}
                        </div>
                        <div>
                            <span className="font-semibold text-[#242253]">Email:</span> {email}
                        </div>
                    </div>

                    <div className="flex justify-center items-center pt-4">
                        <button className="btn w-[50%] bg-[#242253] hover:bg-[#bfbdff] hover:text-[#242253] transition-all text-base text-white pb-[2px]">Upvote This Book👍</button>
                    </div>
                </div>
            </div>

            <div className="w-[70%] pt-10">
                <h1 className="text-2xl font-bold text-[#242253] mb-2">
                    Write a Review for This Book
                </h1>
                <textarea
                    name="book_review"
                    id="book_review"
                    rows="7"
                    placeholder="Share your thoughts, opinions, or feedback about the book..."
                    className="w-full px-3 py-2 rounded-md border border-gray-300 bg-gray-50 text-gray-800 focus:border-gray-600 resize-none"
                ></textarea>
            </div>
            <div className="my-4 flex gap-1 items-center">
                <h1 className="text-xl font-bold">Ratings :</h1>
                <Rating />
            </div>
            <button
                type="submit"
                className="w-[300px] px-8 py-2 mt-2 font-semibold rounded-md bg-[#242253] hover:bg-[#bfbdff] text-white hover:text-[#242253] border border-transparent cursor-pointer transition-all"
            >
                Submit Review
            </button>
        </div>
    );
};

export default BookDetails;