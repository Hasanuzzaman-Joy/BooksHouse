import { Suspense, useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import Rating from "../../Components/Rating";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import DisplayReview from "../../Components/DisplayReview";
import Loading from "../../Components/Loading";
import { Bounce, toast, ToastContainer } from "react-toastify";
import Container from "../../Components/Container";

const BookDetails = () => {

    useEffect(() => {
        document.title = "BooksHouse | Book-Details";
    }, [])

    const { user, err, setErr } = useAuth();

    const book = useLoaderData();

    const { _id, book_title, cover_photo, total_page, book_author, book_category, book_overview, upvote, name, reading_status, email } = book;

    const [upvoted, setUpvoted] = useState(upvote);
    const [read, setRead] = useState(reading_status);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [reviews, setReviews] = useState([]);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    useEffect(() => {
        setErr('');
    }, [setErr]);

    const handleReview = (id) => {
        if (!comment.trim()) {
            setErr("Please write your feedback here");;
            return;
        }

        const doc = {
            reviewedBookId: id,
            reviewerName: user?.displayName,
            reviewerEmail: user?.email,
            reviewerPhoto: user?.photoURL,
            comment,
            rating
        }

        axios.post(`${import.meta.env.VITE_SERVER_URL}/reviews`, doc)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        icon: "success",
                        title: "Your comment has been posted successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    setReviews((prevReviews) => [...prevReviews, { ...doc, _id: res.data.insertedId }]);
                    setComment("");
                    setRating(0);
                }
            }
            )
            .catch(err => console.log(err))
    }

    const handleUpvote = (id, email) => {
        axios.patch(`${import.meta.env.VITE_SERVER_URL}/upvote/${id}`, { email })
            .then(res => {
                if (res.data.modifiedCount) {
                    Swal.fire({
                        icon: "success",
                        title: "Your have upvoted successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setUpvoted([...upvoted, email])
                }
                else {
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
            .catch(err => console.log(err))
    }

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

        const doc = { status: updateReadStatus };

        axios.patch(`${import.meta.env.VITE_SERVER_URL}/book/${id}`, doc)
            .then(res => {
                if (res.data.modifiedCount) {
                    setRead(updateReadStatus)
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/all-reviews/${_id}`).then(res => res.json()).then(data => setReviews(data))
    }, [_id])

    const hasReviewed = reviews.find(review => review?.reviewerEmail === user?.email);

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
        <Container>
            <ToastContainer />
            <div className="bg-[#f4f3f3] mx-auto rounded-xl shadow-lg overflow-hidden md:flex">
                <figure className="w-full md:w-1/2 object-cover h-130 flex items-center justify-center bg-[#bfbdff]">
                    <img
                        src={cover_photo}
                        alt={book_title}
                        className="max-h-full max-w-full object-contain py-3"
                    />
                </figure>
                <div className="px-6 flex flex-col justify-center md:w-2/3 space-y-4">
                    <h2 className="text-3xl font-bold text-[#242253] text-center mt-8 md:mt-0">{book_title}</h2>
                    <p className="text-gray-600 mb-5 text-base text-center">{book_overview}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base text-gray-700 w-full">
                        <div>
                            <span className="font-semibold text-[#242253]">Category:</span> {book_category}
                        </div>
                        <div className="font-bold">
                            <span className="font-semibold text-[#242253]">Total Upvote:</span> {upvoted.length}
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
                        <div>
                            <span className="font-semibold text-[#242253]">Email:</span> {email}
                        </div>
                        <div>
                            <span className="font-semibold text-[#242253]">Reading Status:</span> {read}
                            <div className="w-full mt-3">
                                <div className=" w-3/4 bg-gray-200 rounded-full h-3 overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-500 ${getProgressValue(read) === 100
                                            ? "bg-green-500"
                                            : getProgressValue(read) === 50
                                                ? "bg-[#242253]"
                                                : "bg-[#242253]"
                                            }`}
                                        style={{ width: `${getProgressValue(read)}%` }}
                                    ></div>
                                </div>
                                <p className="text-xs text-gray-600 mt-1">
                                    {read === "Want-to-Read" && "Not started"}
                                    {read === "Reading" && "Currently Reading"}
                                    {read === "Read" && "Completed"}
                                </p>
                            </div>
                        </div>
                        <div>
                            {
                                email === user?.email ? <>
                                    <h1 className="font-semibold text-[#242253] mb-2">
                                        Update the reading status :
                                    </h1>
                                    <div className="space-y-2">
                                        <select
                                            onChange={(e) => handleReadingUpdate(e, _id)}
                                            value={read}
                                            name="reading_status"
                                            id="reading_status"
                                            className="w-full px-3 py-2 rounded-md border border-gray-300 bg-gray-50 text-gray-800 focus:border-gray-600 -ml-1 md:mr-10"
                                            required
                                        >
                                            <option value="" disabled>Select your current reading status</option>
                                            <option value="Want-to-Read" disabled={read !== "Want-to-Read"}>Want-to-Read</option>
                                            <option value="Reading" disabled={read !== "Want-to-Read"}>Reading</option>
                                            <option value="Read" disabled={read !== "Reading"}>Read</option>
                                        </select>
                                    </div>
                                </> : <></>
                            }
                        </div>
                    </div>

                    <div className="flex justify-center items-center pt-10">
                        <button
                            onClick={() => handleUpvote(_id, user?.email)}
                            disabled={!user?.email}
                            className={`btn w-full md:w-[70%] transition-all text-base pb-[2px] mb-8 md:mb-0
      ${user?.email
                                    ? "bg-[#242253] hover:bg-[#bfbdff] hover:text-[#242253] text-white"
                                    : "bg-gray-400 cursor-not-allowed text-gray-700"}`}
                        >
                            Upvote This Book👍
                        </button>
                    </div>
                </div>
            </div>
            {
                user?.email ? <>
                    <div className="w-full md:w-[70%] pt-10">
                        <h1 className="text-2xl font-bold text-[#242253] mb-2">
                            Write a Review for This Book
                        </h1>
                        <textarea
                            value={comment}
                            onChange={(e) => { setComment(e.target.value) }}
                            name="book_review"
                            id="book_review"
                            rows="7"
                            placeholder="Share your thoughts, opinions, or feedback about the book..."
                            className="w-full px-3 py-2 rounded-md border border-gray-300 bg-gray-50 text-gray-800 focus:border-gray-600 resize-none"
                        ></textarea>
                        {err && <p className='text-sm' style={{ color: 'red' }}>{err}</p>}
                    </div>
                    <div className="my-4 flex gap-1 items-center">
                        <h1 className="text-xl font-bold">Ratings :</h1>
                        <Rating handleRatingChange={handleRatingChange} rating={rating} />
                    </div>
                    <button
                        onClick={() => handleReview(_id)}
                        disabled={hasReviewed}
                        type="submit"
                        className="w-[300px] px-8 py-2 mt-2 font-semibold rounded-md bg-[#242253] hover:bg-[#bfbdff] text-white hover:text-[#242253] border border-transparent cursor-pointer transition-all disabled:cursor-not-allowed"
                    >
                        Submit Review
                    </button>
                </>
                    :
                    " "
            }

            <Suspense fallback={<Loading />}>
                <DisplayReview reviews={reviews} setReviews={setReviews} />
            </Suspense>
        </Container>
    );
};

export default BookDetails;