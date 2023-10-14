"use client";
import ProgressBar from "@ramonak/react-progress-bar";
import axios from "axios";
import { useEffect, useState } from "react";

export type CourseItem = {
  id: string | number;
  name: string;
  description: string;
  shortDescription: string;
  difficultyLevel: string;
  imageUrl: string;
  price: number;
  totalEnrollment: number;
  contentLength: number;
  averageRating: number;
  status: number;
  categoryId: number;
};

const CourseItem = ({ imageUrl, name }: { imageUrl: string; name: string }) => {
  return (
    <div className="lg:col-span-4 border border-solid border-[#acd6bc] p-[20px] rounded-lg my-[10px] hover:border-[#309255] mx-[15px]">
      <div className="single-courses">
        <div>
          <div className="courses-images">
            <a href="/after-enroll">
              <img className="rounded-lg w-full" src={imageUrl} alt="Courses" />
            </a>
          </div>
          <div className="courses-content">
            <div className="courses-author">
              <div className="flex text-center items-center pt-[25px]">
                <div className="author-thumb">
                  <a href="#">
                    <img
                      className="rounded-full w-[50px] h-[50px]"
                      src="./author-01.jpg"
                      alt="Author"
                    />
                  </a>
                </div>
                <div className="pl-3">
                  <a className="text-[#52565b] hover:text-[#309255]" href="#">
                    Jason Williams
                  </a>
                  <a> || </a>
                  <a className="text-[#309255]" href="#">
                    Ohula Malsh
                  </a>
                </div>
              </div>
            </div>

            <h4 className="mt-[13px] mb-2 text-[#52565b] text-[16px] hover:text-[#309255]">
              <a href="">
                {name}
                {/* Data Science and Machine Learning with Python - Hands On! */}
              </a>
            </h4>

            <div className="courses-rating">
              <p className="text-[#52565b] text-[14px]">38% Complete</p>

              <div className="rating-progress-bar mt-2">
                <ProgressBar
                  completed={38}
                  bgColor="#309255"
                  height="15px"
                  customLabel=""
                />
              </div>
              <div className="rating-meta">
                <span className="rating-star">
                  <span className="rating-bar"></span>
                </span>
                <div className="flex justify-between">
                  <a
                    href="/after-enroll"
                    className="text-[#52565b] text-[14px] text-right pt-2"
                  >
                    Continue
                  </a>
                  <button> Report </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// const CourseItem = () => {
//   const [courses, setCourses] = useState<CourseItem[]>([]);
//   const API_URL =
//     "https://learnconnectapitest.azurewebsites.net/api/course?per_page=2";

//   const totalPages = 300;
//   const [loading, setLoading] = useState(true);
//   // const [pages, setPages] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);
//   console.log("course", courses);
//   useEffect(() => {
//     const fetchData = async () => {
//       const page = Math.min(currentPage + 1, totalPages);
//       const result = await axios.get(`${API_URL}&page=${page}`);
//       setCourses(result?.data);
//       console.log(result);
//       setLoading(false);
//     };
//     fetchData();
//   }, [currentPage]);
//   return courses.map((item) => {
//     return (
//       <div className="lg:col-span-4 border border-solid border-[#acd6bc] p-[20px] rounded-lg my-[10px] hover:border-[#309255] mx-[15px]">
//         <div className="single-courses">
//           <div key={item.id}>
//             <div className="courses-images">
//               <a href="/after-enroll">
//                 <img
//                   className="rounded-lg w-full"
//                   src={item.imageUrl}
//                   alt="Courses"
//                 />
//               </a>
//             </div>
//             <div className="courses-content">
//               <div className="courses-author">
//                 <div className="flex text-center items-center pt-[25px]">
//                   <div className="author-thumb">
//                     <a href="#">
//                       <img
//                         className="rounded-full w-[50px] h-[50px]"
//                         src="./author-01.jpg"
//                         alt="Author"
//                       />
//                     </a>
//                   </div>
//                   <div className="pl-3">
//                     <a className="text-[#52565b] hover:text-[#309255]" href="#">
//                       Jason Williams
//                     </a>
//                     <a> || </a>
//                     <a className="text-[#309255]" href="#">
//                       Ohula Malsh
//                     </a>
//                   </div>
//                 </div>
//               </div>

//               <h4 className="mt-[13px] mb-2 text-[#52565b] text-[16px] hover:text-[#309255]">
//                 <a href="">
//                   {item.name}
//                   {/* Data Science and Machine Learning with Python - Hands On! */}
//                 </a>
//               </h4>

//               <div className="courses-rating">
//                 <p className="text-[#52565b] text-[14px]">38% Complete</p>

//                 <div className="rating-progress-bar mt-2">
//                   <ProgressBar
//                     completed={38}
//                     bgColor="#309255"
//                     height="15px"
//                     customLabel=""
//                   />
//                 </div>
//                 <div className="rating-meta">
//                   <span className="rating-star">
//                     <span className="rating-bar"></span>
//                   </span>
//                   <div className="flex justify-between">
//                     <a
//                       href="/after-enroll"
//                       className="text-[#52565b] text-[14px] text-right pt-2"
//                     >
//                       Continue
//                     </a>
//                     <button> Report </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   });
// };

export default CourseItem;
