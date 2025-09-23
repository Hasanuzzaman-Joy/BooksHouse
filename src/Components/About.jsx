import { motion } from "motion/react";
import ZoomInSection from "../Components/ZoomInSection";

const About = () => {
  const textStyle = "font-normal text-base text-gray-800 leading-8";

  return (
    <ZoomInSection>
      <div className="w-full md:max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-14 md:mt-20 px-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-5 text-center md:text-left text-[#242253]">
            About BooksHouse
          </h1>

          <p className={textStyle}>
            BooksHouse is a dynamic web application designed to help book lovers
            organize, discover, and share their reading journeys in one seamless
            digital bookshelf. Whether you want to catalog books you’ve read,
            track your current reads, or plan your next favorites, BooksHouse
            makes managing your personal library effortless and enjoyable.
          </p>

          <p className={`${textStyle} pt-3`}>With BooksHouse, you can:</p>

          <ul className={`list-disc list-inside ${textStyle} mb-3`}>
            <li>
              Add books with detailed information such as title, author,
              category, reading status, and more
            </li>
            <li>
              Track your reading progress with visual summaries and personalized
              dashboards
            </li>
            <li>
              Explore featured categories like Fiction, Non-Fiction, and Fantasy
              through dynamic, interactive cards
            </li>
          </ul>
        </div>

        {/* About Image */}
        <div>
          <motion.img
            src="https://i.ibb.co/j9LnmhqH/about.png"
            alt="BooksHouse Illustration"
            className="w-full md:w-3/4 block mx-auto mt-0 md:mt-7 md:rounded-lg"
            animate={{
              y: [0, 20, 0],
              transition: { duration: 3, repeat: Infinity },
            }}
          />
        </div>
      </div>
    </ZoomInSection>
  );
};

export default About;
