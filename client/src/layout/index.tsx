import { motion } from "framer-motion";
import { Navbars } from "../components";
import { ILayout } from "../interface";

const variants = {
  hidden: { opacity: 0, x: 0, y: -10 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -10 },
};

export default function Layout({ children }: ILayout) {
  return (
    <div className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
      <Navbars />
      <motion.main
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ type: "linear" }}
        className=""
      >
        {children}
      </motion.main>
    </div>
  );
}
