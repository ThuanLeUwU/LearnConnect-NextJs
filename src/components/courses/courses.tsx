"use client";
import React, { useEffect, useState } from "react";
import "../../app/./globals.css";
import { useRouter } from "next/navigation";
import CourseStyle from "./styles/style.module.scss";
import Rating from "@mui/material/Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { UserAuth } from "@/app/context/AuthContext";
import axios from "axios";
import useDataFavoritesFetcher, {
  CourseItem,
} from "../pagination/useDataFavoritesFetcher";

export type Course = {
  id: string | number;
  name: string;
  description: string;
  shortDescription: string;
  // difficultyLevel: string;
  totalEnrollment: number;
  imageUrl: string;
  price: number;
  rating: number;
  categoryId: number | string;
  contentLength: number;
  lectureCount: number;
  averageRating: number;
  mentorName: string;
  mentorId: number;
  mentorProfilePictureUrl: string;
  totalRatingCount: number;
};

export type Lectures = {
  map(arg0: (item: any, index: any) => React.JSX.Element): React.ReactNode;
  id: string | number;
  title: string;
  content: string;
  contentUrl: string;
  contentType: number;
  rejectReason: null;
  status: number;
  courseId: number;
};

const Courses = ({
  imageUrl,
  name,
  description,
  id,
  price,
  categoryName,
  totalEnrollment,
  contentLength,
  lectureCount,
  averageRating,
  mentorId,
  mentorProfilePictureUrl,
  totalRatingCount,
  favoriteId,
}: {
  imageUrl: string;
  name: string;
  description: string;
  id: string | number;
  price: string | number;
  categoryName: string;
  totalEnrollment: string | number;
  contentLength: string | number;
  lectureCount: string | number;
  averageRating: number;
  mentorId: number;
  mentorProfilePictureUrl: string;
  totalRatingCount: number;
  favoriteId: string | number;
}) => {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const { userData } = UserAuth();
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const handleClick = () => {
    router.push(`/course-detail/${id}`);
  };
  useEffect(() => {
    const fetchFavoriteCourses = async () => {
      try {
        const response = await axios.get(
          `https://learnconnectapitest.azurewebsites.net/api/favorite-course/get-favorite-courses-by-user?userId=${userData?.id}&currentPage=1&pageSize=6`
        );
        setCourses(response.data.listFavoriteCourses); // Assuming the response data contains a list of favorite courses
      } catch (error) {
        console.error("Error fetching favorite courses: ", error);
      }
    };
    fetchFavoriteCourses();
  }, [userData?.id]);

  useEffect(() => {
    const isCourseLiked = courses.some(
      (course) => course.favorite.courseId === id
    );
    setIsLiked(isCourseLiked);
  }, [courses, id]);
  const handleLike = () => {
    setIsLiked(!isLiked);
    console.log("Liked Course ID:", id);
    console.log("user, id: ", userData?.id);
    if (isLiked) {
      axios
        .delete(
          `https://learnconnectapitest.azurewebsites.net/api/favorite-course/${favoriteId}`
        )
        .then((response) => {
          console.log("Delete request success: ", response.data);
        })
        .catch((error) => {
          console.error("Error making DELETE request: ", error);
        });
    } else {
      // Call the POST API endpoint
      axios
        .post(
          "https://learnconnectapitest.azurewebsites.net/api/favorite-course",
          {
            id: 0,
            courseId: id,
            userId: userData?.id,
          }
        )
        .then((response) => {
          console.log("Post request success: ", response.data);
        })
        .catch((error) => {
          console.error("Error making POST request: ", error);
        });
    }
  };
  return (
    <div className={`${CourseStyle.single_courses}`}>
      <div className={`${CourseStyle.single_courses_image}`}>
        <div className="relative">
          <a onClick={handleClick}>
            <img
              className="rounded-lg w-full h-[180px] object-cover"
              src={imageUrl}
              alt="Courses"
            />
          </a>
          <div
            onClick={handleLike}
            className="absolute top-2 right-2 cursor-pointer z-50"
          >
            {isLiked ? (
              <FaHeart className={`text-2xl text-red-500`} />
            ) : (
              <FaRegHeart className={`text-2xl text-[#000]`} />
            )}
          </div>
        </div>
      </div>
      <div className={`${CourseStyle.single_courses_content}`}>
        <div className={`${CourseStyle.single_courses_author}`}>
          <div className="author">
            <div className="author-thumb">
              <a onClick={handleClick}></a>
            </div>
            <div className="author-name">
              <div className="min-h-[60px]">
                <a className="font-bold" onClick={handleClick}>
                  {name}
                </a>
                <a className="font-bold" onClick={handleClick}>
                  {favoriteId}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={`${CourseStyle.single_courses_timeline}`}>
          <span>
            {" "}
            {totalEnrollment && totalEnrollment.toLocaleString()} Students
            Joined
          </span>
          <span>
            {" "}
            <i className="icofont-read-book"></i> {contentLength} Lectures{" "}
          </span>
        </div>
        <div className={`${CourseStyle.single_courses_timeline}`}>
          <span>
            <Rating
              name="half-rating-read"
              defaultValue={averageRating}
              precision={0.1}
              readOnly
            />
          </span>
          <span className="font-extralight">{totalRatingCount} Rating</span>
        </div>
        <div className={`${CourseStyle.single_courses_price}`}>
          <div className="courses-price">
            <span className={`${CourseStyle.single_courses_price_sale}`}>
              {/* {item.sale} */}
            </span>
            {/* <span className="old-parice">{formattedPrice}</span> */}
            <span> {price && price.toLocaleString()}</span>
          </div>
          <div className="courses-review">VND</div>
        </div>
      </div>
    </div>
  );
};
export default Courses;
