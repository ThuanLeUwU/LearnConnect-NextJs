"use client";
import Courses, { Course } from "@/components/courses/courses";
import ".././globals.css";
import useDataFetcher, {
  CourseItem,
} from "@/components/pagination/useDataFetcher";
import Paginate from "@/components/pagination/pagination";
import Search from "@/components/search/search";
import { Empty, Rate, Select, Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import { http } from "@/api/http";
import { Category } from "../instructorcourses/page";
import { useRouter } from "next/navigation";
import { UserAuth } from "../context/AuthContext";
// import { CourseItem } from "@/components/pagination/useDataFavoritesFetcher";
export type Filter = {
  minPrice: number;
  maxPrice: number;
  specialized: number;
};

export default function ListCourse() {
  const router = useRouter();
  const { id, user, role } = UserAuth();
  useEffect(() => {
    if (role === 0) {
      router.push(`/user-manage`);
    }
    if (role === 1) {
      router.push(`/staff-page`);
    }
    if (role === 2) {
      router.push(`/instructorcourses`);
    }
    // if (role === 3) {
    //   router.push(`/`);
    // }
    // if (role === -1) {
    //   router.push(`/`);
    // }
  });

  const [selectedFilter, setSelectedFilter] = useState<number[]>([]);
  const [minPrice, setMinPrice] = useState<number>(-1);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [rate, setRate] = useState<number>(0);
  console.log("rate", rate);
  const [specialized, setSpecialized] = useState<Category[]>([]);
  const [filterBySpecialized, setFilterBySpecialized] = useState<number>(-1);

  // console.log("spe", specialized[0].id);

  const [refresh, setRefresh] = useState(false);
  const {
    loading,
    courses,
    totalPages,
    currentPage,
    setCurrentPage,
    // onPriceChange,
    removeFilter,
    setReload,
  } = useDataFetcher(minPrice, maxPrice, filterBySpecialized, refresh, rate);
  // useDataFetcher();

  // const {filtercourses} = useFilterCourses();

  // const [courses, setCourse] =useState();
  const [selected, setSelected] = useState(false);
  const [courseFilter, setCourseFilter] = useState<CourseItem[]>([]);
  // console.log("FilterPrice", price);
  useEffect(() => {
    try {
      http
        .get("https://learnconnectapitest.azurewebsites.net/api/specialization")
        .then((response) => {
          setSpecialized(response.data);
        });
    } catch (err) {
      console.error(err);
    }
  }, []);

  const { Option } = Select;
  const handleFilterMinPrice = (selectedPrice: any) => {
    setMinPrice(selectedPrice);
    setSelected(true);
  };
  const handleFilterSpecialized = (selected: any) => {
    setFilterBySpecialized(selected);
    setSelected(true);
    // setRefresh(false);
  };

  const handleFilterMaxPrice = (selected: any) => {};
  const handleRateChange = (newValue: number) => {
    setRate(newValue);
  };
  const minPriceOption = [
    {
      price: "Free",
      value: 0,
    },
    { price: "Under 200000", value: 1 },
    { price: "200000 - 1000000", value: 200001 },
    { price: "Above 1000000", value: 1000001 },
  ];

  const minRateOption = [
    {
      price: "1",
      value: 1,
    },
    { price: "Under 200000", value: 1 },
    { price: "200000 - 1000000", value: 200001 },
    { price: "Above 1000000", value: 1000001 },
  ];

  // const selectMinPriceRef = useRef<Select>(null);
  const removeFilterClick = () => {
    setFilterBySpecialized(-1);
    setMinPrice(-1);
    setRate(0);
    setReload(true);
    // if (selectMinPriceRef.current) {
    //   selectMinPriceRef.current.state.value = null;
    // }

    // removeFilter();
    // setCurrentPage(1);
    // window.location.reload();
    // router.push("/courses");
  };

  // const maxPrice = [{}];

  return (
    <div className="container">
      <Search searchQueryData={""} />
      <div className="bg-[#e5f4eb] rounded-[10px] px-10 mt-5 shadow-lg">
        <div className="flex justify-between p-5 items-center text-center ">
          <span>Price: </span>
          <Select
            defaultValue=""
            onChange={handleFilterMinPrice}
            style={{ width: 200 }}
            value={minPrice === -1 ? <></> : minPrice}
            // ref={selectMinPriceRef}
          >
            {minPriceOption.map((option, index) => (
              // <div key={index}>hahaha {option.date}</div>
              <Option key={option.value} value={option.value}>
                {option.price}
              </Option>
            ))}
          </Select>
          <span>Specialize: </span>
          <Select
            defaultValue=""
            onChange={handleFilterSpecialized}
            style={{ width: 300 }}
            value={filterBySpecialized === -1 ? <></> : filterBySpecialized}
          >
            {specialized.map((option, index) => (
              // <div key={index}>hahaha {option.date}</div>
              <Option key={option.id} value={option.id}>
                {option.name}
              </Option>
            ))}
          </Select>

          <Rate onChange={handleRateChange} value={rate} />
          <button
            onClick={removeFilterClick}
            className="border-2 rounded-lg px-2 bg-[#309255] text-slate-100"
          >
            Reset
          </button>
        </div>
      </div>
      {loading ? (
        <div className="text-center text-5xl mt-5">
          <Spin size="large" />
        </div>
      ) : (
        <div className="min-h-[60vh]">
          {courses.length === 0 ? (
            <div className="text-center text-2xl mt-8 items-center justify-center">
              <Empty description={false} />
              No course with your filter!!!
            </div>
          ) : (
            <>
              <div className="grid cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 py-[30px] gap-5">
                {courses.map((item) => {
                  return (
                    <Courses
                      enrolled={false}
                      totalRatingCount={0}
                      favorite={item.isFavorite}
                      mentorProfilePictureUrl={""}
                      mentorId={0}
                      lectureCount={""}
                      categoryName={""}
                      key={item.id}
                      {...item}
                    />
                  );
                })}
              </div>
              {/* {!selected ? (
                <div className="grid cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 py-[30px] gap-5">
                  {courses.map((item) => {
                    return (
                      <Courses
                        enrolled={false}
                        totalRatingCount={0}
                        favorite={item.isFavorite}
                        mentorProfilePictureUrl={""}
                        mentorId={0}
                        lectureCount={""}
                        categoryName={""}
                        key={item.id}
                        {...item}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="grid cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 py-[30px] gap-5">
                  {courseFilter.map((item) => (
                    <Courses
                      enrolled={false}
                      totalRatingCount={0}
                      favorite={item.isFavorite}
                      mentorProfilePictureUrl={""}
                      mentorId={0}
                      lectureCount={""}
                      categoryName={""}
                      key={item.id}
                      {...item}
                    />
                  ))}
                </div>
              )} */}
            </>
          )}
        </div>
      )}
      {courses.length > 0 && (
        <Paginate
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}
