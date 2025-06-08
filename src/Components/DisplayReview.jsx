import StarRatings from "react-star-ratings";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import EditReview from "../Components/EditReview";
import { useState } from "react";

const DisplayReview = ({ reviews, setReviews }) => {
  const { user } = useAuth();
  const [editableComment, setEditableComment] = useState("");
  const [editableId, setEditableId] = useState(null); 

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          fetch(`${import.meta.env.VITE_SERVER_URL}/reviews/${id}`, {
            method: "DELETE",
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.deletedCount) {
                Swal.fire({
                  icon: "success",
                  title: "You've successfully deleted",
                  showConfirmButton: false,
                  timer: 1500,
                });
                setReviews(reviews.filter((review) => review._id !== id));
              }
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  const handleEditableComment = (comment, id) => {
    setEditableComment(comment);
    setEditableId(id);
  };

  return (
    <div className="space-y-4 mt-6">
      {reviews.length <= 0 ? (
        ""
      ) : (
        <>
          {reviews.map((review) => (
            <div
              key={review._id}
              className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white my-3"
            >
              {editableId === review._id ? (
                <EditReview editableComment={editableComment} setEditableId={setEditableId} editableId={editableId} review={review} />
              ) : (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={review.reviewerPhoto}
                        alt={review.reviewerName}
                        className="w-10 h-10 rounded-full object-cover border"
                      />
                      <h2 className="font-semibold text-[#242253]">
                        {review.reviewerName}
                      </h2>
                      <div>
                        <StarRatings
                          rating={review.rating}
                          starRatedColor="gold"
                          numberOfStars={5}
                          starDimension="18px"
                          starSpacing="1px"
                          name="rating"
                        />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      {user?.email === review.reviewerEmail && (
                        <>
                          <button
                            className="text-[#242253] font-semibold hover:underline text-sm underline cursor-pointer"
                            onClick={() =>
                              handleEditableComment(review.comment, review._id)
                            }
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-600 font-semibold hover:underline text-sm underline  cursor-pointer"
                            onClick={() => handleDelete(review._id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-600 text-base leading-[30px]">
                    {review.comment}
                  </p>
                </>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default DisplayReview;
