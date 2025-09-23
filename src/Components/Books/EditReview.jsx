import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const EditReview = ({
  editableId,
  setEditableId,
  review,
  setReviews,
  reviews,
}) => {
  const [commented, setCommented] = useState(review?.comment || "");

  const handleEditReview = () => {
    const id = editableId;
    const data = { comment: commented };

    axios
      .patch(`${import.meta.env.VITE_SERVER_URL}/update-review/${id}`, data)
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            icon: "success",
            title: "Review updated successfully",
            showConfirmButton: false,
            timer: 1500,
          });

          // Update the review in the parent state
          const updatedReviews = reviews.map((newReview) =>
            newReview._id === id
              ? { ...newReview, comment: commented }
              : newReview
          );
          setReviews(updatedReviews);

          setEditableId(null);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <textarea
        value={commented}
        onChange={(e) => setCommented(e.target.value)}
        name="editableComment"
        id="editableComment"
        rows="7"
        placeholder="Share your thoughts, opinions, or feedback about the book..."
        className="w-full px-3 py-2 rounded-md border border-gray-300 bg-gray-50 text-gray-800 focus:border-gray-600 resize-none"
      />

      <div className="flex gap-3 mt-2">
        <button
          onClick={handleEditReview}
          className="btn bg-[#bfbdff] hover:bg-[#242253] transition-all text-[#242253] text-base font-medium hover:text-white"
        >
          Update
        </button>
        <button
          onClick={() => setEditableId(null)}
          className="btn bg-[#bfbdff] hover:bg-[#242253] transition-all text-[#242253] text-base font-medium hover:text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditReview;
