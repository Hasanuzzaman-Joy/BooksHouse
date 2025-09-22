import { Suspense, useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import { Bounce, toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";
import BookCover from "../../Components/BookCover";
import BookDetailsSection from "../../Components/BookDetailsSection";
import ReviewSection from "../../Components/ReviewSection";
import DisplayReview from "../../Components/DisplayReview";
import Loading from "../../Components/Loading";

const BookDetails = () => {
  const { user, err, setErr } = useAuth();
  const book = useLoaderData();

  const [upvoted, setUpvoted] = useState(book.upvote);
  const [read, setRead] = useState(book.reading_status);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    document.title = "BooksHouse | Book-Details";
  }, []);

  useEffect(() => {
    setErr("");
  }, [setErr]);

  // Fetch all reviews for this book
  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/all-reviews/${book._id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, [book._id]);

  const hasReviewed = reviews.find(
    (review) => review?.reviewerEmail === user?.email
  );

  // Handle star rating change
  const handleRatingChange = (newRating) => setRating(newRating);

  // Handle submitting a review
  const handleReview = (id) => {
    if (!comment.trim()) return setErr("Please write your feedback here");
    if (!rating)
      return setErr("Please give a star rating before submitting your review.");

    const doc = {
      reviewedBookId: id,
      reviewerName: user?.displayName,
      reviewerEmail: user?.email,
      reviewerPhoto: user?.photoURL,
      comment,
      rating,
    };

    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/reviews`, doc)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Your comment has been posted successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          setReviews((prev) => [...prev, { ...doc, _id: res.data.insertedId }]);
          setComment("");
          setRating(0);
        }
      })
      .catch((err) => console.log(err));
  };

  // Handle upvote
  const handleUpvote = (id, email) => {
    axios
      .patch(`${import.meta.env.VITE_SERVER_URL}/upvote/${id}`, { email })
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            icon: "success",
            title: "Your have upvoted successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          setUpvoted([...upvoted, email]);
        } else {
          toast.error("You can't upvote your own added books", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  // Handle reading status update
  const handleReadingUpdate = (e, id) => {
    const updateReadStatus = e.target.value;

    if (
      (read === "Want-to-Read" && updateReadStatus !== "Reading") ||
      (read === "Reading" && updateReadStatus !== "Read")
    ) {
      toast.error("Invalid status transition. You can only go forward.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }

    axios
      .patch(`${import.meta.env.VITE_SERVER_URL}/book/${id}`, {
        status: updateReadStatus,
      })
      .then((res) => {
        if (res.data.modifiedCount) setRead(updateReadStatus);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full md:max-w-screen-xl mx-auto px-4 py-10">
      {/* Book Cover and Details Section */}
      <div className="bg-[#f4f3f3] mx-auto rounded shadow-lg overflow-hidden md:flex">
        <BookCover
          cover_photo={book.cover_photo}
          book_title={book.book_title}
        />
        <BookDetailsSection
          book={book}
          read={read}
          handleReadingUpdate={handleReadingUpdate}
          handleUpvote={handleUpvote}
          user={user}
          upvoted={upvoted}
        />
      </div>

      {/* Review Section */}
      <ReviewSection
        user={user}
        comment={comment}
        setComment={setComment}
        rating={rating}
        handleRatingChange={handleRatingChange}
        handleReview={handleReview}
        hasReviewed={hasReviewed}
        bookId={book._id}
        err={err}
      />

      {/* Display Reviews */}
      <Suspense fallback={<Loading />}>
        <DisplayReview reviews={reviews} setReviews={setReviews} />
      </Suspense>
    </div>
  );
};

export default BookDetails;
