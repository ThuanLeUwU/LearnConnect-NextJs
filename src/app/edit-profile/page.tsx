"use client";
import { useState } from "react";
import ".././globals.css";
import { UserAuth } from "../context/AuthContext";

export default function EditProfile() {
  const { user, token, id, userData, googleSignIn, logOut } = UserAuth();
  const [fullName, setFullName] = useState(userData?.fullName);
  const [gender, setGender] = useState(userData?.gender || "other");
  const [phoneNumber, setPhoneNumber] = useState(userData?.phoneNumber || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bioDescription, setBioDescription] = useState(
    userData?.bioDescription || ""
  );
  return (
    <div className="container">
      <div className="bg-[#fff]">
        <div className="container mx-auto max-w-screen-lg py-20">
          <div className="pt-6 px-10 pb-16 border border-solid border-opacity-20 border-[#30925533] rounded-lg">
            <form>
              <div className="mb-6">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-base font-medium text-[#000]"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  value={fullName}
                  className="bg-[#fff] border border-[#30925533] text-[#000] text-base rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-[#309255]"
                  placeholder="Your Name"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="gender"
                  className="block mb-2 text-base font-medium text-[#000]"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  value={gender}
                  className="bg-[#fff] border border-[#30925533] text-[#000] text-base rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-[#309255]"
                  required
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="phone"
                  className="block mb-2 text-base font-medium text-[#000]"
                >
                  Phone Number
                </label>
                <input
                  type="number"
                  id="phone"
                  value={phoneNumber}
                  className="bg-[#fff] border border-[#30925533] text-[#000] text-base rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-[#309255]"
                  placeholder="Your Phone Number"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block mb-2 text-base font-medium text-[#000]"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="bg-[#fff] border border-[#30925533] text-[#000] text-base rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-[#309255]"
                  placeholder="•••••••••"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="confirm_password"
                  className="block mb-2 text-base font-medium text-[#000]"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  id="confirm_password"
                  className="bg-[#fff] border border-[#30925533] text-[#000] text-base rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-[#309255]"
                  placeholder="•••••••••"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="bio_description"
                  className="block mb-2 text-base font-medium text-[#000]"
                >
                  Bio Description
                </label>
                <textarea
                  id="bio_description"
                  value={bioDescription}
                  className="bg-[#fff] border border-[#30925533] text-[#000] text-base rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-[#309255] h-[200px]"
                  placeholder="Your Bio Description"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-[#309255] text-[18px] px-[35px] py-[15px] mt-[15px] rounded-lg text-[#fff] hover:bg-[#000] transition-all duration-300 ease-in-out delay-0"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
