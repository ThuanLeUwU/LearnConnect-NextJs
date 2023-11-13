"use client";
import {
  ChangeEvent,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import ".././globals.css";
import { UserAuth } from "../context/AuthContext";
import axios from "axios";
import { Modal, message } from "antd";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
export default function EditProfile() {
  const router = useRouter();
  const { id, userData, refetchUser, jwtToken } = UserAuth();
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  const [fullName, setFullName] = useState(userData?.fullName);
  const [gender, setGender] = useState(userData?.gender || 0);
  const [phoneNumber, setPhoneNumber] = useState(userData?.phoneNumber || "");
  const [password, setPassword] = useState(userData?.password || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [role, setRole] = useState(userData?.role || 3);
  const [status, setStatus] = useState(userData?.status || 0);
  const [bioDescription, setBioDescription] = useState(
    userData?.bioDescription || ""
  );
  const [profilePictureUrl, setProfilePictureUrl] = useState(
    userData?.profilePictureUrl || ""
  );
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

  const showSuccessModal = () => {
    setIsSuccessModalVisible(true);
  };

  const showErrorModal = () => {
    setIsErrorModalVisible(true);
  };

  const handleOk = () => {
    setIsSuccessModalVisible(false);
    setIsErrorModalVisible(false);
    router.prefetch("/profile");
    router.push("/profile");
  };
  // const handleFullNameChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setFullName(e.target.value);
  // };

  const handleGenderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setGender(parseInt(e.target.value));
  };

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleBioDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBioDescription(e.target.value);
  };
  useEffect(() => {
    const savedData = localStorage.getItem("editProfileData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setEmail(parsedData.email);
      setPassword(parsedData.password);
      setProfilePictureUrl(parsedData.profilePictureUrl);
      setFullName(parsedData.fullName);
      setGender(parsedData.gender);
      setPhoneNumber(parsedData.phoneNumber);
      setBioDescription(parsedData.bioDescription);
    }
  }, []);

  useEffect(() => {
    const dataToSave = {
      email,
      password,
      profilePictureUrl,
      fullName,
      gender,
      phoneNumber,
      bioDescription,
    };
    localStorage.setItem("editProfileData", JSON.stringify(dataToSave));
  }, [
    email,
    password,
    profilePictureUrl,
    fullName,
    gender,
    phoneNumber,
    bioDescription,
  ]);

  useEffect(() => {
    return () => {
      localStorage.removeItem("editProfileData");
    };
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !phoneNumber || !bioDescription) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (phoneNumber.length !== 10) {
      toast.error("Phone number must be 10 digits.");
      return;
    }
    const updatedUserData = {
      id: id,
      password: password,
      email: email,
      role: role,
      fullName: fullName,
      phoneNumber: phoneNumber,
      gender: gender,
      bioDescription: bioDescription,
      profilePictureUrl: profilePictureUrl,
      status: status,
    };
    // console.log("usder data:", updatedUserData);
    axios
      .put(
        `https://learnconnectapitest.azurewebsites.net/api/user/${id}`,
        updatedUserData
      )
      .then((response) => {
        refetchUser();
        setTimeout(() => {
          toast.success("Edit successful");
        });
        router.push("/profile");
      })
      .catch((error) => {
        setTimeout(() => {
          toast.error("Edit not successful");
        });
        router.push("/profile");
        if (error.response) {
          console.error("Server responded with an error:", error.response.data);
          console.error("Status code:", error.response.status);
          console.error("Request config:", error.response.config);
        } else if (error.request) {
          console.error(
            "Request was made but no response was received:",
            error.request
          );
        } else {
          console.error("Error setting up the request:", error.message);
        }
        console.error("Error updating profile:", error);
      });
  };

  return (
    <div className="container">
      <div className="bg-[#fff]">
        <div className="container mx-auto max-w-screen-lg py-20">
          <div className="pt-6 px-10 pb-16 border border-solid border-opacity-20 border-[#30925533] rounded-lg">
            <form onSubmit={handleSubmit}>
              {/* <div className="mb-6">
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
                  onChange={handleFullNameChange}
                  className="bg-[#fff] border border-[#30925533] text-[#000] text-base rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-[#309255]"
                  placeholder="Your Name"
                  required
                />
              </div> */}
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
                  onChange={handleGenderChange}
                  className="bg-[#fff] border border-[#30925533] text-[#000] text-base rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-[#309255]"
                  required
                >
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                  <option value="3">Other</option>
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
                  onChange={handlePhoneNumberChange}
                  className="bg-[#fff] border border-[#30925533] text-[#000] text-base rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-[#309255]"
                  placeholder="Your Phone Number"
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
                  onChange={handleBioDescriptionChange}
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
          {/* <Modal
            title="Success"
            visible={isSuccessModalVisible}
            onOk={handleOk}
            onCancel={handleOk}
          >
            <p>Profile updated successfully!</p>
          </Modal>
          <Modal
            title="Error"
            visible={isErrorModalVisible}
            onOk={handleOk}
            onCancel={handleOk}
          >
            <p>Failed to update profile. Please try again.</p>
          </Modal> */}
        </div>
      </div>
    </div>
  );
}
