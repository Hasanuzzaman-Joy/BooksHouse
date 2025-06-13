import { motion } from "motion/react";
import ZoomInSection from "../Components/ZoomInSection";

const About = () => {
    return (
        <ZoomInSection>
        <div className='grid grid-cols-1 md:grid-cols-2 w-full gap-6 mt-15 md:mt-20 md:px-0 px-4'>
            <div>
                <h1 className='text-4xl font-bold mb-5 text-center md:text-left text-[#242253]'>About BooksHouse</h1>
                <p className='font-normal text-base leading-8'>
                    BooksHouse is a dynamic web application designed to help book lovers organize, discover, and share their reading journeys in one seamless digital bookshelf. Whether you want to catalog books you’ve read, track your current reads, or plan your next favorites, BooksHouse makes managing your personal library effortless and enjoyable.
                </p>
                <p className='font-normal text-base leading-8 pt-3'>
                    With BooksHouse, you can:
                </p>
                <ul className='list-disc list-inside font-normal leading-8 mb-3'>
                    <li>Add books with detailed information such as title, author, category, reading status, and more</li>
                    <li>Track your reading progress with visual summaries and personalized dashboards</li>
                    <li>Explore featured categories like Fiction, Non-Fiction, and Fantasy through dynamic, interactive cards</li>
                </ul>
            </div>
            <div>
                <motion.img
                    src="https://i.ibb.co/j9LnmhqH/about.png"
                    alt=""
                    className='w-3/4 block mx-auto mt-4 md:mt-7 md:rounded-lg'
                    animate={{
                        y:[0,20,0],
                        transition:{duration: 3, repeat:Infinity}
                    }}
                />
            </div>
        </div>
        </ZoomInSection>
    );
};

export default About;