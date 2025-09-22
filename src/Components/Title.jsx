import { IoBookSharp } from "react-icons/io5";

const Title = () => (
  <div className="flex justify-center items-center gap-3 mb-8">
    {/* Book Icon */}
    <IoBookSharp size={40} className="text-[#242253]" />
    <h1 className="text-2xl md:text-4xl font-bold text-center text-[#242253] flex flex-col items-center gap-2">
      {/* Title Text */}
      My Reading Shelf
    </h1>
  </div>
);

export default Title;
