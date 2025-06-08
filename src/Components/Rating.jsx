import { useState } from "react";
import StarRatings from "react-star-ratings";

const Rating = () => {


    const [rating, setRating] = useState(0);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
        console.log('Selected Rating:', newRating);
    };

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