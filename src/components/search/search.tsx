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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleClickSearch();
    }
  };

  return (
    <>
      <div className="p-4 border-2 border-[#e7f8ee] rounded-lg flex mt-[30px]">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
          className="border-none outline-none w-full p-2"
          required
        />
        <button
          onClick={handleClickSearch}
          className="bg-[#309255] text-white font-bold py-2 px-4 rounded-lg"
        >
          Search
        </button>
      </div>
    </>
  );
};

export default Search;
