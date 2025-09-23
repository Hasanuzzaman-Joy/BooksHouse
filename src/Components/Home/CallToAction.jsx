import { Link } from "react-router";
import ZoomInSection from "../ZoomInSection";

const CallToAction = () => {
  return (
    <section
      className="relative bg-fixed bg-cover bg-center bg-no-repeat mt-14 md:mt-20 py-20 px-4 md:px-20"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)),
          url('https://i.ibb.co/hxwF117j/hero-3.jpg')`,
      }}
    >
      <ZoomInSection>
        <div className="relative w-full md:max-w-screen-xl mx-auto px-4 z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold leading-13 md:leading-14 mb-4 text-white">
            Track, review, and discover books.
          </h2>
          <p className="text-base mb-8 text-white">
            Track your reading journey, share reviews, and discover popular
            reads — all in one beautiful digital bookshelf.
          </p>
          <Link
            to="/bookshelf"
            className="btn bg-[#242253] text-base font-semibold hover:text-[#242253] hover:bg-[#bfbdff] text-white px-8 py-4 transition"
          >
            Get Started
          </Link>
        </div>
      </ZoomInSection>
    </section>
  );
};

export default CallToAction;
