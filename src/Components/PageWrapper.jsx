import { motion } from "motion/react";

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}         
      transition={{ duration: 0.8 }} 
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;