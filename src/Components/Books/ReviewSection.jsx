import Rating from "../Rating";

const ReviewSection = ({
  user,
  comment,
  setComment,
  rating,
  handleRatingChange,
  handleReview,
  hasReviewed,
  bookId,
  err,
}) => {
  if (!user?.email) return null;

  return (
    <>
      <div className="w-full md:w-[70%] pt-10">
        <h1 className="text-2xl font-bold text-[#242253] mb-2">
          Write a Review for This Book
        </h1>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          name="book_review"
          id="book_review"
          rows="7"
          placeholder="Share your thoughts, opinions, or feedback about the book..."
          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 shadow-sm focus:border-[#242253] focus:ring-1 focus:ring-[#242253] outline-none transition-all duration-200 resize-none"
        />
        {err && (
          <p className="text-sm" style={{ color: "red" }}>
            {err}
          </p>
        )}
      </div>

      <div className="my-4 flex gap-1 items-center">
        <h1 className="text-xl font-bold">Ratings :</h1>
        <Rating handleRatingChange={handleRatingChange} rating={rating} />
      </div>

      <button
        onClick={() => handleReview(bookId)}
        disabled={hasReviewed}
        type="submit"
        className="w-[300px] px-8 py-2 mt-2 font-semibold rounded-md bg-[#242253] hover:bg-[#bfbdff] text-white hover:text-[#242253] border border-transparent cursor-pointer transition-all disabled:cursor-not-allowed"
      >
        Submit Review
      </button>
    </>
  );
};

export default ReviewSection;
