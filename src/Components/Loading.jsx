import { motion } from "motion/react"

const Loading = () => {
    return (
    <div className="w-full min-h-screen flex justify-center items-center bg-white">
      <motion.span
        className="loading loading-ring loading-xl"
        initial={{ scale: 1 }}
        animate={{ scale: [1, 4, 1] }}
        transition={{
          duration: 1.2,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
    </div>
    );
};

export default Loading;