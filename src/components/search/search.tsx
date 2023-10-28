"use client";
import React, { SetStateAction, useEffect, useState } from "react";
import "../../app/./globals.css";
import { CourseItem } from "../pagination/useDataFetcher";
import axios from "axios";
import { useRouter } from "next/navigation";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleClickSearch = () => {
    router.push(`/courses/search/${searchQuery}`);
  };
  const handleSearchChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchQuery(e.target.value);
  };

  //   const handleSearch = async () => {
  //     const API_URL =
  //       "https://learnconnectapitest.azurewebsites.net/api/course/search?searchQuery=";
  //     try {
  //       const result = await axios.get(`${API_URL}${searchQuery}`);
  //       setCourses(result?.data);
  //       console.log("search course", result?.data);
  //       console.log("courses", courses);
  //     } catch (error) {
  //       console.error("Error fetching data: ", error);
  //     }
  //   };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      //   handleSearch();
      handleClickSearch();
    }
  };
  return (
    <>
      <div className="p-4 border-2 border-[#e7f8ee] rounded-lg mt-[30px]">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
          className="border-none outline-none w-full p-2"
        />
      </div>
    </>
  );
};

export default Search;
