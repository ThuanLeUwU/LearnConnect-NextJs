"use client";
import ReactPaginate from "react-paginate";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { motion } from "framer-motion";
type PaginateProps = {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
};
const Paginate: React.FC<PaginateProps> = ({
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  const handlePageClick = ({ selected }: { selected: number }) => {
    // console.log(selected + 1);
    setCurrentPage(selected);
  };
  const paginationVariants = {
    hidden: {
      opacity: 0,
      y: 200,
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
  const showNextButton = currentPage !== totalPages - 1;
  const showPrevButton = currentPage !== 0;
  return (
    <motion.div
      variants={paginationVariants}
      initial="hidden"
      animate="visible"
    >
      <ReactPaginate
        breakLabel={<span className="mr-2">...</span>}
        nextLabel={
          showNextButton ? (
            <span className="w-10 h-10 flex items-center justify-center bg-[#30925533] rounded-md">
              <BsChevronRight />
            </span>
          ) : null
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={totalPages}
        previousLabel={
          showPrevButton ? (
            <span className="w-10 h-10 flex items-center justify-center bg-[#30925533] rounded-md">
              <BsChevronLeft />
            </span>
          ) : null
        }
        containerClassName="flex items-center justify-center mt-8 mb-4"
        pageClassName="block border- border-solid border-[#309255] hover:bg-[#30925533] w-10 h-10 flex items-center justify-center rounded-md mx-2"
        activeClassName="bg-[#309255]"
        // renderOnZeroPageCount={null}
      />
    </motion.div>
  );
};

export default Paginate;
