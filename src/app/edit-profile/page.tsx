"use client";
import { useState } from "react";
import ".././globals.css";
import { UserAuth } from "../context/AuthContext";

export default function EditProfile() {
  const { user, googleSignIn, logOut } = UserAuth();

  const [selectedFile, setSelectedFile] = useState(null);
  // const handleImageChange = (e: { target: { files: any[] } }) => {
  //   const file = e.target.files[0];
  //   setSelectedFile(file);
  //   // Update user object with the new photo
  //   const updatedUser = { ...user, photoURL: URL.createObjectURL(file) };
  //   console.log("userid", user?.uid);
  //   console.log("user", user);
  //   // Further actions with updatedUser if required
  // };
  return (
    <div className="container">
      <div className="bg-[#fff]">
        <div className="container mx-auto max-w-screen-lg py-20">
          <div className="pt-6 px-10 pb-16 border border-solid border-opacity-20 border-[#30925533] rounded-lg">
            <form>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-base font-medium text-[#000]"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    className="bg-[#fff] border border-[#30925533] text-[#000] text-base rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-[#309255]"
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="last_name"
                    className="block mb-2 text-base font-medium text-[#000]"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    className="bg-[#fff] border border-[#30925533] text-[#000] text-base rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-[#309255]"
                    placeholder="Doe"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="company"
                    className="block mb-2 text-base font-medium text-[#000]"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="bg-[#fff] border border-[#30925533] text-[#000] text-base rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-[#309255]"
                    placeholder="Flowbite"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-base font-medium text-[#000]"
                  >
                    Phone number
                  </label>
                  <input
                    type="number"
                    id="phone"
                    className="bg-[#fff] border border-[#30925533] text-[#000] text-base rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-[#309255]"
                    placeholder="012345678"
                    required
                  />
                </div>
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
              <div>
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-base font-medium text-[#000]"
                >
                  First name
                </label>
                <input
                  type="text"
                  id="first_name"
                  className="bg-[#fff] border border-[#30925533] text-[#000] text-base rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-[#309255]"
                  placeholder="John"
                  required
                />
              </div>
              {/* <div className="">
                <img
                  src={user?.photoURL || "www.default.imageurl"}
                  alt="Generic placeholder image"
                  className="w-36 h-36 rounded-full mt-4 mb-2"
                />
                <div>
                  <label
                    htmlFor="profile_image"
                    className="block mb-2 text-base font-medium text-[#000]"
                  >
                    Profile Image
                  </label>
                  <input
                    type="file"
                    id="profile_image"
                    onChange={handleImageChange}
                    className="text-base"
                  />
                  {selectedFile && (
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Selected"
                      className="w-36 h-36 rounded-full mt-4 mb-2"
                    />
                  )}
                </div>
              </div> */}
              <button
                type="submit"
                className="bg-[#309255] text-[18px] px-[35px] py-[15px] rounded-lg text-[#fff] hover:bg-[#000] transition-all duration-300 ease-in-out delay-0"
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
