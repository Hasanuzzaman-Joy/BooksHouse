import useAuth from "../../Hooks/useAuth";
import { IoBookSharp } from "react-icons/io5";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import ZoomInSection from "../../Components/ZoomInSection";
import axios from "axios";
import Loading from "../../Components/Loading";
import { toast } from "react-toastify";

const UpdateBook = () => {
  const { user, logOut } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch book data on load
  useEffect(() => {
    document.title = "BooksHouse | Update-Book";

    if (user?.accessToken) {
      axios(`${import.meta.env.VITE_SERVER_URL}/update-book/${id}`, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      })
        .then((res) => {
          setBook(res.data);
          setLoading(false);
        })
        .catch((err) => {
          if (err?.status === 401 || err?.status === 403) {
            logOut().then(() => console.log("Signed Out"));
          }
        });
    }
  }, [user?.accessToken, id, logOut]);

  // Handle form submission
  const handleUpdateBookForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { upvote, ...restData } = Object.fromEntries(formData);

    axios
      .patch(
        `${import.meta.env.VITE_SERVER_URL}/update-book/${book._id}`,
        restData,
        {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        }
      )
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            icon: "success",
            title: "You've successfully updated",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => navigate("/my-books"), 1300);
        }
      })
      .catch((err) => {
        if (err?.status === 401 || err?.status === 403) {
          toast.error("You can only update books using your own account.");
          setTimeout(
            () => logOut().then(() => console.log("Signed Out")),
            2500
          );
        }
      });
  };

  if (loading) return <Loading />;

  return (
    <ZoomInSection>
      <div>
        {/* Title and Icon */}
        <h2 className="mb-3 text-2xl md:text-4xl font-bold text-center text-[#242253]">
          Update This Book in Your Library
        </h2>
        <div className="flex items-center w-full my-4 gap-3">
          <hr className="w-full" />
          <IoBookSharp size={50} />
          <hr className="w-full" />
        </div>

        {/* Book Form */}
        <form onSubmit={handleUpdateBookForm} className="space-y-8">
          <div className="space-y-4">
            {/* Title & Cover */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label
                  htmlFor="book_title"
                  className="block text-sm font-semibold"
                >
                  Book Title
                </label>
                <input
                  type="text"
                  name="book_title"
                  id="book_title"
                  defaultValue={book.book_title}
                  placeholder="Enter the title of the book"
                  className="inputClasses"
                  required
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="cover_photo"
                  className="block text-sm font-semibold"
                >
                  Book Image URL
                </label>
                <input
                  type="text"
                  name="cover_photo"
                  id="cover_photo"
                  defaultValue={book.cover_photo}
                  placeholder="Paste the direct image URL of the book cover"
                  className="inputClasses"
                />
              </div>
            </div>

            {/* Total Page & Author */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label
                  htmlFor="total_page"
                  className="block text-sm font-semibold"
                >
                  Total Number of Pages
                </label>
                <input
                  type="number"
                  name="total_page"
                  id="total_page"
                  defaultValue={book.total_page}
                  placeholder="e.g., 350"
                  className="inputClasses"
                  required
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="book_author"
                  className="block text-sm font-semibold"
                >
                  Author Name
                </label>
                <input
                  type="text"
                  name="book_author"
                  id="book_author"
                  defaultValue={book.book_author}
                  placeholder="Enter the author’s full name"
                  className="inputClasses"
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label
                htmlFor="book_category"
                className="block text-sm font-semibold"
              >
                Book Category
              </label>
              <select
                name="book_category"
                id="book_category"
                defaultValue={book.book_category}
                className="inputClasses"
                required
              >
                <option value="">Select Category</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Historical">Historical</option>
                <option value="Biography">Biography</option>
                <option value="Comics">Comics</option>
              </select>
            </div>

            {/* Reading Status */}
            <div className="space-y-2">
              <label
                htmlFor="reading_status"
                className="block text-sm font-semibold"
              >
                Reading Status
              </label>
              <select
                name="reading_status"
                id="reading_status"
                defaultValue={book.reading_status}
                className="inputClasses"
                required
              >
                <option value="">Select your current reading status</option>
                <option value="Want-to-Read">Want-to-Read</option>
                <option value="Reading">Reading</option>
                <option value="Read">Read</option>
              </select>
            </div>

            {/* Overview */}
            <div className="space-y-2">
              <label
                htmlFor="book_overview"
                className="block text-sm font-semibold"
              >
                Book Overview
              </label>
              <textarea
                name="book_overview"
                id="book_overview"
                defaultValue={book.book_overview}
                rows="4"
                placeholder="Write a short summary or thoughts about the book"
                className={`inputClasses resize-none`}
              ></textarea>
            </div>

            {/* Upvote */}
            <div className="space-y-2">
              <label htmlFor="upvote" className="block text-sm font-semibold">
                Upvote
              </label>
              <input
                type="text"
                name="upvote"
                id="upvote"
                value={book.upvote?.length || 0}
                readOnly
                className="inputClasses"
              />
            </div>

            {/* User Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-semibold">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={user.displayName}
                  readOnly
                  className="inputClasses"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={user.email}
                  readOnly
                  className="inputClasses"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full px-8 py-2 font-semibold rounded-md bg-[#242253] hover:bg-[#bfbdff] text-white hover:text-[#242253] border border-transparent cursor-pointer transition-all"
          >
            Update Book Details
          </button>
        </form>
      </div>
    </ZoomInSection>
  );
};

export default UpdateBook;
