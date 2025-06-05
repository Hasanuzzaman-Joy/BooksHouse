import { Link } from 'react-router';

const CallToAction = () => {
  return (
    <section
      className="relative bg-fixed bg-cover bg-center bg-no-repeat mt-14 py-20 px-5 md:px-16"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)),
          url('https://i.ibb.co/hxwF117j/hero-3.jpg')`
      }}
    >

      <div className="relative z-10 w-full md:max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 text-white">
          Grow Healthier Plants with Plenture
        </h2>
        <p className="text-base mb-8 text-white">
          Track watering schedules, monitor health, and never miss a care routine again. Join a community of mindful plant lovers using Plenture daily.
        </p>
        <Link to='/addPlant' className="btn bg-[#242253] text-base font-semibold hover:text-[#242253] hover:bg-[#bfbdff] text-white px-8 py-4 transition"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;