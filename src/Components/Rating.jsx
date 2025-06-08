
import StarRatings from "react-star-ratings";

const Rating = ({handleRatingChange, rating}) => {

    return (
        <>
            <StarRatings
                rating={rating}
                starRatedColor="gold"
                starHoverColor="orange"
                changeRating={handleRatingChange}
                numberOfStars={5}
                name="user-rating"
                starDimension="30px"
                starSpacing="5px"
            />
        </>
    );
};

export default Rating;