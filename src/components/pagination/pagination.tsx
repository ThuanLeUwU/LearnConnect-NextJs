"use client";
import ReactPaginate from "react-paginate";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { motion } from "framer-motion";
import Image from "next/image";

const Paginate = () => {
  const handlePageClick = () => {};
  const paginationVariants = {
    hidden: {
      opacity: 0,
      y: 100,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.5,
      },
    },
  };
  return (
    <motion.div
      variants={paginationVariants}
      initial="hidden"
      animate="visible"
    >
      <ReactPaginate
        breakLabel={<span className="mr-4">...</span>}
        nextLabel={
          <span className="w-10 h-10 flex items-center justify-center bg-[#30925533] rounded-md">
            <BsChevronRight />
          </span>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={60}
        previousLabel={
          <span className="w-10 h-10 flex items-center justify-center bg-[#30925533] rounded-md">
            <BsChevronLeft />
          </span>
        }
        containerClassName="flex items-center justify-center mt-8 mb-4"
        pageClassName="block border- border-solid border-[#309255] hover:bg-[#30925533] w-10 h-10 flex items-center justify-center rounded-md mr-4"
        activeClassName="bg-[#309255]"
        renderOnZeroPageCount={null}
      />
    </motion.div>
  );
};

export default Paginate;
