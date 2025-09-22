const BookDetailsSection = ({
  book,
  read,
  handleReadingUpdate,
  handleUpvote,
  user,
  upvoted,
}) => {
  const getProgressValue = (status) => {
    switch (status) {
      case "Want-to-Read":
        return 10;
      case "Reading":
        return 50;
      case "Read":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="px-6 flex flex-col justify-center md:w-2/3 space-y-4">
      <h2 className="text-2xl md:text-4xl font-bold text-[#242253] mt-8 md:mt-0">
        {book.book_title}
      </h2>
      <p className="text-gray-600 mb-5 text-base leading-7">
        {book.book_overview}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base text-gray-700 w-full">
        <div>
          <span className="font-semibold text-[#242253]">Category:</span>{" "}
          {book.book_category}
        </div>
        <div className="font-bold">
          <span className="font-semibold text-[#242253]">Total Upvote:</span>{" "}
          {upvoted.length}
        </div>
        <div>
          <span className="font-semibold text-[#242253]">Author:</span>{" "}
          {book.book_author}
        </div>
        <div>
          <span className="font-semibold text-[#242253]">Total Pages:</span>{" "}
          {book.total_page}
        </div>
        <div>
          <span className="font-semibold text-[#242253]">Added By:</span>{" "}
          {book.name}
        </div>
        <div>
          <span className="font-semibold text-[#242253]">Email:</span>{" "}
          {book.email}
        </div>

        <div>
          <span className="font-semibold text-[#242253]">Reading Status:</span>{" "}
          {read}
          <div className="w-full mt-3">
            <div className="w-3/4 bg-gray-200 rounded h-3 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  getProgressValue(read) === 100
                    ? "bg-green-500"
                    : "bg-[#242253]"
                }`}
                style={{ width: `${getProgressValue(read)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              {read === "Want-to-Read" && "Not started"}
              {read === "Reading" && "Currently Reading"}
              {read === "Read" && "Completed"}
            </p>
          </div>
        </div>

        {book.email === user?.email && (
          <div>
            <h1 className="font-semibold text-[#242253] mb-2">
              Update the reading status :
            </h1>
            <div className="space-y-2">
              <select
                onChange={(e) => handleReadingUpdate(e, book._id)}
                value={read}
                name="reading_status"
                id="reading_status"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 shadow-sm focus:border-[#242253] focus:ring-1 focus:ring-[#242253] outline-none transition-all duration-300 -ml-1 md:mr-10 cursor-pointer"
                required
              >
                <option value="" disabled>
                  Select your current reading status
                </option>
                <option value="Want-to-Read" disabled={read !== "Want-to-Read"}>
                  Want-to-Read
                </option>
                <option value="Reading" disabled={read !== "Want-to-Read"}>
                  Reading
                </option>
                <option value="Read" disabled={read !== "Reading"}>
                  Read
                </option>
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center items-center pt-10">
        <button
          onClick={() => handleUpvote(book._id, user?.email)}
          disabled={!user?.email}
          className={`btn w-full md:w-[70%] transition-all text-base pb-[2px] mb-8 md:mb-0
                    ${
                      user?.email
                        ? "bg-[#242253] hover:bg-[#bfbdff] hover:text-[#242253] text-white"
                        : "bg-gray-400 cursor-not-allowed text-gray-700"
                    }`}
        >
          Upvote This Book👍
        </button>
      </div>
    </div>
  );
};

export default BookDetailsSection;
