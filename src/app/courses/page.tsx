"use client";
import Courses, { Course } from "@/components/courses/courses";
import ".././globals.css";
import useDataFetcher, {
  CourseItem,
} from "@/components/pagination/useDataFetcher";
import Paginate from "@/components/pagination/pagination";
import Search from "@/components/search/search";
import { Breadcrumb, Empty, Rate, Select, Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import { http } from "@/api/http";
import { Category } from "../instructorcourses/page";
import { useRouter } from "next/navigation";
import { UserAuth } from "../context/AuthContext";
import { RedoOutlined } from "@ant-design/icons";
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
  const [minPrice, setMinPrice] = useState<any>("");
  const [maxPrice, setMaxPrice] = useState<any>("");
  const [rate, setRate] = useState<any>("");
  console.log("rate", rate);
  const [specialized, setSpecialized] = useState<Category[]>([]);
  const [filterBySpecialized, setFilterBySpecialized] = useState<any>("");
  const [priceOption, setPriceOption] = useState("");
  // console.log("spe", specialized[0].id);

  const [refresh, setRefresh] = useState(false);
  const {
    loading,
    courses,
    totalPages,
    currentPage,
    setCurrentPage,
    // onPriceChange,
    // removeFilter,
    setReload,
    setSearchQuery,
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
    // setMinPrice(selectedPrice);
    setSelected(true);
    if (selectedPrice === 1) {
      setMinPrice("");
      setMaxPrice(0);
      setPriceOption("Free");
    } else if (selectedPrice === 2) {
      setPriceOption("1 - 200,000 VNĐ");
      setMaxPrice(200000);
      setMinPrice(1);
    } else if (selectedPrice === 3) {
      setPriceOption("200,001 - 1,000,000 VNĐ");
      setMaxPrice(1000000);
      setMinPrice(200001);
    } else {
      setPriceOption("Above 1,000,000 VNĐ");
      setMinPrice(1000000);
      setMaxPrice("");
    }
  };
  const handleFilterSpecialized = (selected: any) => {
    setFilterBySpecialized(selected);
    setSelected(true);
    // setRefresh(false);
  };

  const handleFilterMaxPrice = (selected: any) => {};
  const handleRateChange = (newValue: any) => {
    setRate(newValue);
    setSelected(true);
  };
  const minPriceOption = [
    {
      price: "Free",
      value: 1,
    },
    { price: "1 - 200,000 VNĐ", value: 2 },
    { price: "200,001 - 1,000,000 VNĐ", value: 3 },
    { price: "Above 1,000,000 VNĐ", value: 4 },
  ];

  const minRateOption = [
    { rate: "⭐", value: 1 },
    { rate: "⭐⭐", value: 2 },
    { rate: "⭐⭐⭐", value: 3 },
    { rate: "⭐⭐⭐⭐", value: 4 },
    { rate: "⭐⭐⭐⭐⭐", value: 5 },
  ];

  // const selectMinPriceRef = useRef<Select>(null);
  const removeFilterClick = () => {
    setFilterBySpecialized("");
    setMinPrice("");
    setRate("");
    setReload(true);
    setPriceOption("");
    setMaxPrice("");
    // if (selectMinPriceRef.current) {
    //   selectMinPriceRef.current.state.value = null;
    // }

    // removeFilter();
    // setCurrentPage(1);
    // window.location.reload();
    // router.push("/courses");
  };

  const resetPrice = () => {
    setMinPrice("");
    // setReload(true);
  };

  const resetSpe = () => {
    setFilterBySpecialized("");
    // setReload(true);
  };

  const resetRate = () => {
    setRate("");
    // setReload(true);
  };

  // const maxPrice = [{}];
  const breadcrumbNavigation = () => {
    router.push("/courses");
  };

  return (
    <div className="w-full ">
      <Breadcrumb className="font-semibold text-2xl py-5 bg-[#e7f8ee] px-24">
        <Breadcrumb.Item>
          <button onClick={breadcrumbNavigation}>Courses</button>
        </Breadcrumb.Item>
        {/* <Breadcrumb.Item>React</Breadcrumb.Item> */}
      </Breadcrumb>
      <div className=" mx-20">
        <Search
          searchQueryData={""}
          setData={(data) => {
            setSearchQuery(data);
          }}
        />
        <div className="bg-[#e5f4eb] rounded-[10px] pl-10 pr-2 mt-5 shadow-lg">
          <div className="flex justify-between p-5 items-center text-center ">
            <span>Price: </span>
            <Select
              defaultValue=""
              onChange={handleFilterMinPrice}
              style={{ width: 200 }}
              value={priceOption}
              // ref={selectMinPriceRef}
            >
              {minPriceOption.map((option, index) => (
                // <div key={index}>hahaha {option.date}</div>
                <Option key={option.value} value={option.value}>
                  {option.price}
                </Option>
              ))}
            </Select>
            {/* <button
            onClick={resetPrice}
            className="border-2 rounded-lg px-2 bg-[#fff] text-[#000]"
          >
            <RedoOutlined />
          </button> */}
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
            {/* <button
            onClick={resetSpe}
            className="border-2 rounded-lg px-2 bg-[#fff] text-[#000]"
          >
            <RedoOutlined />
          </button> */}
            <span>Rating: </span>
            <Select
              defaultValue=""
              onChange={handleRateChange}
              style={{ width: 200 }}
              value={rate === null ? <></> : rate}
            >
              {minRateOption.map((option, index) => (
                // <div key={index}>hahaha {option.date}</div>
                <Option key={option.value} value={option.value}>
                  {option.rate}
                </Option>
              ))}
            </Select>
            {/* <button
            onClick={resetRate}
            className="border-2 rounded-lg px-2 bg-[#fff] text-[#000]"
          >
            <RedoOutlined />
          </button> */}

            {/* <Rate onChange={handleRateChange} value={rate} /> */}
            <button
              onClick={removeFilterClick}
              className="border-2 rounded-lg px-2 bg-[#fff] text-[#000]"
            >
              <RedoOutlined />
            </button>
          </div>
        </div>
        {loading ? (
          <div className="text-center text-5xl mt-5">
            <Spin size="large" />
          </div>
        ) : (
          <div className="min-h-[60vh]">
            {courses?.length === 0 ? (
              <div className="text-center text-2xl mt-8 items-center justify-center">
                <Empty description={false} />
                No course with your filter!!!
              </div>
            ) : (
              <>
                <div className="grid cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 py-[30px] gap-5">
                  {courses?.map((item) => {
                    return (
                      <Courses
                        setIsFavorites={() => {}}
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
              </>
            )}
          </div>
        )}
        {courses?.length > 0 && (
          <Paginate
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}
