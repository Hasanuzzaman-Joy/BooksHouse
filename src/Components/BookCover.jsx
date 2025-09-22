const BookCover = ({ cover_photo, book_title }) => {
  return (
    <figure className="w-full md:w-1/2 object-cover h-130 flex items-center justify-center bg-[#bfbdff]">
      <img
        src={cover_photo}
        alt={book_title}
        className="max-h-full max-w-full object-contain py-3"
      />
    </figure>
  );
};

export default BookCover;
