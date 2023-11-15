"use client";
import Link from "next/link";
import "../../globals.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserAuth } from "@/app/context/AuthContext";
// import { User } from "firebase/auth";

export type User = {
  id: string | number;
  password: string;
  email: string;
  role: 1;
  fullName: string;
  phoneNumber: string;
  gender: number;
  bioDescription: string;
  profilePictureUrl: string;
  status: number;
};
export default function ProfileUser({ params }: any) {
  const idMentor = params.id;
  const [DataMentor, SetDataMentor] = useState<User>();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://learnconnectapitest.azurewebsites.net/api/mentor/${idMentor}`
        );
        SetDataMentor(response?.data.user);
        console.log("data mentor", response?.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    if (idMentor) {
      fetchUserData();
    }
  }, [idMentor]);
  const displayGender = (gender: number | undefined) => {
    if (gender === 1) {
      return "Male";
    } else if (gender === 2) {
      return "Female";
    } else if (gender === 3) {
      return "Other";
    } else {
      return "Not specified";
    }
  };

  return (
    <div className="container">
      {DataMentor && (
        <section className="bg-gradient-to-b">
          <div className="py-5">
            <div className="flex justify-center items-center">
              <div className="max-w-[1200px]">
                <div className="bg-[#fff] rounded-lg shadow-lg">
                  <div className="bg-[#309255] text-white flex flex-col lg:flex-row rounded-t p-4 lg:p-8">
                    <div className="lg:mr-4 lg:mt-0 flex flex-col items-center w-full lg:w-36">
                      <img
                        src={
                          DataMentor?.profilePictureUrl ||
                          "www.default.imageurl"
                        }
                        alt="Generic placeholder image"
                        className="w-36 h-36 rounded-full mt-4 mb-2"
                      />
                    </div>
                    <div className="mt-4 lg:mt-0 lg:ms-3">
                      <h5 className="text-lg">
                        Full Name: {DataMentor?.fullName}
                      </h5>
                      <p>Email: {DataMentor?.email}</p>
                      <p>Gender: {displayGender(DataMentor?.gender)}</p>
                      <p>Phone: {DataMentor?.phoneNumber}</p>
                    </div>
                  </div>
                  <div className="card-body p-4 text-black">
                    <div className="mb-5">
                      <p className="font-semibold text-lg mb-2">
                        Bio Description
                      </p>
                      <div className="p-4 bg-gray-200">
                        <p className="italic mb-1">
                          {DataMentor?.bioDescription}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                      <div className="mb-2">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                          alt="image 1"
                          className="w-full rounded-lg"
                        />
                      </div>
                      <div className="mb-2">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                          alt="image 1"
                          className="w-full rounded-lg"
                        />
                      </div>
                      <div className="mb-2">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                          alt="image 1"
                          className="w-full rounded-lg"
                        />
                      </div>
                      <div className="mb-2">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                          alt="image 1"
                          className="w-full rounded-lg"
                        />
                      </div>
                      <div className="mb-2">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                          alt="image 1"
                          className="w-full rounded-lg"
                        />
                      </div>
                      <div className="mb-2">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                          alt="image 1"
                          className="w-full rounded-lg"
                        />
                      </div>
                      <div className="mb-2">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                          alt="image 1"
                          className="w-full rounded-lg"
                        />
                      </div>
                      <div className="mb-2">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                          alt="image 1"
                          className="w-full rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
