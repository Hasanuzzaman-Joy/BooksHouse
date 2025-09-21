import axios from "axios";
import useAuth from "../../Hooks/useAuth";
import { IoBookSharp } from "react-icons/io5";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import ZoomInSection from "../../Components/ZoomInSection";
import { toast } from "react-toastify";

const AddBook = () => {
  // Page Title
  useEffect(() => {
    document.title = "BooksHouse | Add-Book";
  }, []);

  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  // Handle Book Form
  const handleBookForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    data.upvote = [];

    // Post Book Data
    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/add-book`, data, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      })
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "You've successfully added",
            icon: "success",
            showConfirmButton: false,
            timer: 2500,
          });

          setTimeout(() => {
            navigate("/my-books");
          }, 2200);
        }
      })
      .catch((err) => {
        if (err) {
          if (err?.status === 401 || err?.status === 403) {
            toast.error("You can only add books using your own account.");
            setTimeout(() => {
              logOut().then(() => {
                console.log("Signed Out");
              });
            }, 2500);
          }
        }
      });
  };

  return (
    <ZoomInSection>
      <div>
        {/* Title and Icon */}
        <h2 className="mb-3 text-2xl md:text-4xl font-bold text-center text-[#242253]">
          Add a New Book to Your Library
        </h2>
        <div className="flex items-center w-full my-4 gap-3">
          <hr className="w-full" />
          <IoBookSharp size={50} />
          <hr className="w-full" />
        </div>

        {/* Book Form */}
        <form onSubmit={handleBookForm} className="space-y-8">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Book Title and Cover Photo */}
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
                  placeholder="Paste the direct image URL of the book cover"
                  className="inputClasses"
                />
              </div>
            </div>

            {/* Total Page and Author Name */}
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
                  id="total_page"
                  placeholder="e.g., 350"
                  name="total_page"
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
                  placeholder="Enter the author’s full name"
                  className="inputClasses"
                  required
                />
              </div>
            </div>

            {/* Book Category */}
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
                className="inputClasses"
                required
              >
                <option value="">Select your current reading status</option>
                <option value="Want-to-Read">Want-to-Read</option>
                <option value="Reading">Reading</option>
                <option value="Read">Read</option>
              </select>
            </div>

            {/* Book Overview */}
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
                rows="4"
                placeholder="Write a short summary or thoughts about the book"
                className={`inputClasses resize-none`}
              ></textarea>
            </div>

            {/* upvote (Read-Only, Default 0) */}
            <div className="space-y-2">
              <label htmlFor="upvote" className="block text-sm font-semibold">
                Upvote
              </label>
              <input
                type="text"
                name="upvote"
                id="upvote"
                value={0}
                readOnly
                placeholder="Upvote"
                className="inputClasses"
              />
            </div>

            {/* User Info (Read-Only) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-semibold">
                  Your Name
                </label>
                <input
                  type="text"
                  value={user.displayName}
                  readOnly
                  name="name"
                  id="name"
                  placeholder="Your Name"
                  className="inputClasses"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold">
                  Email address
                </label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  name="email"
                  id="email"
                  placeholder="abc@gmail.com"
                  className="inputClasses"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-8 py-2 font-semibold rounded-md bg-[#242253] hover:bg-[#bfbdff] text-white hover:text-[#242253] border border-transparent cursor-pointer transition-all"
          >
            Add Book
          </button>
        </form>
      </div>
    </ZoomInSection>
  );
};

export default AddBook;
