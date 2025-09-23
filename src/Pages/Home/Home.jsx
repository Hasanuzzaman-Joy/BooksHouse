import { Suspense, useEffect, useState } from "react";
import Faq from "../../Components/Faq";
import Slider from "../../Components/Slider";
import Testimonial from "../../Components/Testimonial";
import Loading from "../../Components/Loading";
import CallToAction from "../../Components/CallToAction";
import PopularBooks from "../../Components/PopularBooks";
import FeaturedCategories from "../../Components/FeaturedCategories";
import About from "../../Components/About";
import ZoomInSection from "../../Components/ZoomInSection";
import SectionHeader from "../../Components/SectionHeader";

// Static Data
const testimonialData = fetch("/testimonial.json").then((res) => res.json());
const faqData = fetch("/faq.json").then((res) => res.json());
const categoriesData = fetch("/categories.json").then((res) => res.json());

const Home = () => {
  // Page Title
  useEffect(() => {
    document.title = "BooksHouse";
  }, []);

  // State for Popular Books
  const [popularBooks, setPopularBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Popular Books from Server
  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/popular-books`)
      .then((res) => res.json())
      .then((data) => {
        setPopularBooks(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className=" w-full mx-auto">
      {/* Loading Spinner */}
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {/* Hero Section */}
          <ZoomInSection>
            <div>
              <Slider />
            </div>
          </ZoomInSection>

          {/* About Section */}
          <About />

          {/* Popular Books Section */}
          <div className="w-full md:max-w-screen-xl mx-auto px-4 mt-20">
            <SectionHeader
              title="Most Popular Books Among Readers"
              subtitle="Discover the books that readers love the most"
            />
            <PopularBooks popularBooks={popularBooks} />
          </div>

          {/* Featured Categories Section */}
          <div className="w-full md:max-w-screen-xl mx-auto px-4 mt-14 md:mt-20">
            <SectionHeader
              title="Featured Categories"
              subtitle="Browse books by category and discover your next favorite read"
            />
            <Suspense fallback={<Loading />}>
              <FeaturedCategories categoriesData={categoriesData} />
            </Suspense>
          </div>

          {/* FAQ Section */}
          <Suspense fallback={<Loading />}>
            <Faq faqData={faqData}></Faq>
          </Suspense>

          {/* Call To Action Section */}
          <CallToAction />

          {/* Testimonial Section */}
          <div className="bg-[#f4f3f3] pt-14 pb-14 w-full mx-auto">
            <SectionHeader
              title="What Book Lovers Say About BooksHouse"
              subtitle="Real feedback and experiences from our community of readers"
            />
            <Suspense fallback={<Loading />}>
              <Testimonial testimonialData={testimonialData}></Testimonial>
            </Suspense>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
