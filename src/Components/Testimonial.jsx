import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules"; // removed Navigation
import "swiper/css";
import "swiper/css/pagination";

import ZoomInSection from "../Components/ZoomInSection";
import StarRatings from "react-star-ratings";
import { use } from "react";

const TestimonialSlider = ({ testimonialData }) => {
  const testimonial = use(testimonialData);

  return (
    <div className="w-full md:max-w-screen-xl mx-auto px-4">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
      >
        {testimonial.map((test) => (
          <SwiperSlide key={test.id}>
            <ZoomInSection>
              <div className="flex flex-col w-full p-1 mx-auto divide-y divide-gray-300 rounded-md shadow bg-white mb-20">
                <div className="flex justify-between p-4">
                  <div className="flex space-x-4">
                    <img
                      src={test.avatar}
                      alt={test.name}
                      className="object-cover w-12 h-12 rounded-full"
                    />
                    <div>
                      <h4 className="font-bold text-[#242253]">{test.name}</h4>
                      <span className="text-xs">{test.date}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <StarRatings
                      rating={test.rating}
                      starRatedColor="gold"
                      numberOfStars={5}
                      starDimension="18px"
                      starSpacing="1px"
                      name="rating"
                    />
                    <div className="text-base font-bold text-[#242253]">
                      {test.rating}
                    </div>
                  </div>
                </div>
                <div className="p-4 space-y-2 text-sm">
                  {test.feedback.map((line, index) => (
                    <p
                      key={index}
                      className="text-base text-gray-800 leading-7"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </ZoomInSection>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialSlider;
