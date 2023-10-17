import axios from "axios";
import { useState, useEffect } from "react";
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
const useCourseDataFetcher = () => {
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const API_URL = "https://learnconnectapitest.azurewebsites.net/api/course/2";
  console.log("course fetchdata", courses);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${API_URL}`);
      setCourses(result?.data);
      console.log("result", result);
    };
    fetchData();
  }, []);
  return {
    courses,
  };
};

export default useCourseDataFetcher;
