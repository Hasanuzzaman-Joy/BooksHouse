
const EditReview = ({ editableComment }) => {
    return (
        <div className="w-[70%] pt-10">
            <textarea
                value={editableComment}
                // onChange={(e) => setComment(e.target.value)}
                name="editableComment"
                id="editableComment"
                rows="5"
                placeholder="Share your thoughts, opinions, or feedback about the book..."
                className="w-full px-3 py-2 rounded-md border border-gray-300 bg-gray-50 text-gray-800 focus:border-gray-600 resize-none"
            ></textarea>
        </div>
    );
};

export default EditReview;