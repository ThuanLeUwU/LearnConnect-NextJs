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
import { message } from "antd";
import { toast } from "sonner";

export type Course = {
  id: string | number;
  name: string;
  description: string;
  shortDescription: string;
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
  favoriteId: number;
  enrolled: boolean;
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
  enrolled,
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
  enrolled: boolean;
}) => {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const { userData, jwtToken } = UserAuth();
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const handleClick = () => {
    router.push(`/course-detail/${id}`);
  };

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
    if (userData) {
      const fetchFavoriteCourses = async () => {
        try {
          const response = await axios.get(
            `https://learnconnectapitest.azurewebsites.net/api/favorite-course/get-favorite-courses-by-user?userId=${userData?.id}&currentPage=1&pageSize=6`
          );
          setCourses(response.data.listFavoriteCourses);
        } catch (error) {
          console.error("Error fetching favorite courses: ", error);
        }
      };
      fetchFavoriteCourses();
    }
  }, [userData]);

  useEffect(() => {
    const isCourseLiked = courses.some(
      (course) => course.favorite.courseId === id
    );
    setIsLiked(isCourseLiked);
  }, [courses, id]);
  const handleLike = () => {
    setIsLiked(!isLiked);
    // console.log("Liked Course ID:", id);
    // console.log("user, id: ", userData?.id);

    if (isLiked) {
      axios
        .delete(
          `https://learnconnectapitest.azurewebsites.net/api/favorite-course/${favoriteId}`
        )
        .then((response) => {
          setTimeout(() => {
            toast.success("Removed successful");
          });
          // console.log("Delete request success: ", response.data);
        })
        .catch((error) => {
          console.error("Error making DELETE request: ", error);
        });
    } else {
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
          setTimeout(() => {
            toast.success("Added to favorites successful");
          });
          // console.log("Post request success: ", response.data);
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
          <button className="w-full" onClick={handleClick}>
            <img
              className="rounded-lg w-full h-[180px] object-cover"
              src={imageUrl}
              alt="Courses"
            />
          </button>
          <div
            onClick={handleLike}
            className="absolute top-2 right-2 cursor-pointer z-10"
          >
            {isLiked ? (
              <FaHeart className={`text-2xl text-red-500`} />
            ) : (
              <FaRegHeart className={`text-2xl text-[#000]`} />
            )}
          </div>
        </div>
      </div>
      <div
        className={`${CourseStyle.single_courses_content}`}
        onClick={handleClick}
      >
        <div className={`${CourseStyle.single_courses_author}`}>
          <div className="author">
            <div className="author-thumb">
              <a onClick={handleClick}></a>
            </div>
            <div className="author-name">
              <div className="min-h-[60px]">
                <button className="font-bold" onClick={handleClick}>
                  {name}
                </button>
                {/* <a className="font-bold" onClick={handleClick}>
                  {favoriteId}
                </a> */}
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
        <div
          className={`${CourseStyle.single_courses_price} flex items-center`}
        >
          {price === 0 ? (
            <div className="courses-price">
              <span className={`${CourseStyle.single_courses_price_sale}`}>
                Free
              </span>
            </div>
          ) : (
            <div className="courses-price flex">
              <span className={`${CourseStyle.single_courses_price_sale}`}>
                {price && price.toLocaleString()}
              </span>
              {price !== 0 && <div className="ml-auto">VND</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Courses;
