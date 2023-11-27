import React, { SetStateAction, useEffect, useState } from "react";
import "../../app/./globals.css";
import { CourseItem } from "../pagination/useDataFetcher";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AiOutlineSearch } from "react-icons/ai";
interface SearchProps {
  searchQueryData: string | number | readonly string[] | undefined;
  setData: (data) => void;
}

const Search: React.FC<SearchProps> = ({
  searchQueryData,
  setData,
}: SearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();

  const handleClickSearch = () => {
    setData(searchQuery);
  };

  const handleSearchChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchQuery(String(e.target.value));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleClickSearch();
    }
  };

  return (
    <>
      <div className="border-2 border-[#309255] rounded-2xl flex mt-[30px] shadow-lg">
        <AiOutlineSearch className={`text-2xl my-auto ml-2 text-[#309255]`} />
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
          className="text-white font-bold py-2 px-8 bg-[#309255] rounded-tr-xl rounded-br-xl my-auto"
        >
          <AiOutlineSearch className={`text-2xl my-auto`} />
        </button>
      </div>
    </>
  );
};

export default Search;
