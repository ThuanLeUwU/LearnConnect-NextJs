"use client";
import {
  ChangeEvent,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import ".././globals.css";
import { UserAuth, UserRole } from "../context/AuthContext";
import axios from "axios";
import { Breadcrumb, Input, Modal, Select, message } from "antd";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { http } from "@/api/http";

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
  const { role } = UserAuth();
  useEffect(() => {
    if (role === 0) {
      router.push(`/user-manage`);
    }
    if (role === 1) {
      router.push(`/staff-page`);
    }
    // if (role === 2) {
    //   router.push(`/instructorcourses`);
    // }
    // if (role === 3) {
    //   router.push(`/`);
    // }
    // if (role === -1) {
    //   router.push(`/`);
    // }
  });
  const { id, userData, refetchUser, jwtToken } = UserAuth();
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  console.log("UserData", userData);
  const [fullName, setFullName] = useState(userData?.fullName);
  const [gender, setGender] = useState(userData?.gender || 0);
  const [phoneNumber, setPhoneNumber] = useState(userData?.phoneNumber || "");
  const [password, setPassword] = useState(userData?.password || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [roleUser, setRoleUser] = useState(userData?.role || 3);
  const [status, setStatus] = useState(userData?.status || 0);
  const [bioDescription, setBioDescription] = useState(
    userData?.bioDescription || ""
  );
  const [profilePictureUrl, setProfilePictureUrl] = useState(
    userData?.profilePictureUrl || ""
  );
  const [paypalId, setPaypalId] = useState("");
  const [paypalAddress, setPaypalAddress] = useState("");
  const [paypalId1, setPaypalId1] = useState("");
  const [paypalAddress1, setPaypalAddress1] = useState("");
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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await http.get(
          `https://learnconnectapi.azurewebsites.net/api/mentor/get-info/${userData?.id}`
        );
        setPaypalId1(response.data.mentor.paypalId);
        setPaypalAddress1(response.data.mentor.paypalAddress);
        console.log("PaypalId", response.data.mentor.paypalId);
        console.log("PaypalId", response.data.mentor.paypalAddress);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleGenderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setGender(parseInt(e.target.value));
  };

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handlePayPalIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPaypalId(e.target.value);
    console.log("e.target.value", e.target.value);
  };

  const handlePayPalAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPaypalAddress(e.target.value);
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
      setPaypalId(parsedData.paypalId);
      setPaypalAddress(parsedData.paypalAddress);
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
      paypalId,
      paypalAddress,
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
    paypalId,
    paypalAddress,
  ]);

  useEffect(() => {
    return () => {
      localStorage.removeItem("editProfileData");
    };
  }, []);

  // const handleSubmit = (e: FormEvent) => {
  //   e.preventDefault();
  //   if (!fullName || !phoneNumber || !bioDescription) {
  //     toast.error("Please Fill In All Required Fields.");
  //     return;
  //   }
  //   if (phoneNumber.length !== 10) {
  //     toast.error("Phone Number Must Be 10 Digits.");
  //     return;
  //   }
  //   const updatedUserData = {
  //     id: id,
  //     password: password,
  //     email: email,
  //     role: roleUser,
  //     fullName: fullName,
  //     phoneNumber: phoneNumber,
  //     gender: gender || 3,
  //     bioDescription: bioDescription,
  //     profilePictureUrl: profilePictureUrl,
  //     status: status,
  //     paypalId: paypalId,
  //     paypalAddress: paypalAddress,
  //   };
  //   console.log("usder data:", updatedUserData);
  //   axios
  //     .put(
  //       `https://learnconnectapi.azurewebsites.net/api/user/${id}`,
  //       updatedUserData
  //     )
  //     .then((response) => {
  //       refetchUser();
  //       setTimeout(() => {
  //         toast.success("Edit Successfully!!!");
  //       });
  //       if (userData?.role === 2) {
  //         router.push(`/profile-mentor/${id}`);
  //       } else {
  //         router.push(`/profile`);
  //       }
  //     })
  //     .catch((error) => {
  //       setTimeout(() => {
  //         toast.error("Edit Unsuccessfully!!!");
  //       });
  //       if (userData?.role === 2) {
  //         router.push(`/profile-mentor/${id}`);
  //       } else {
  //         router.push(`/profile`);
  //       }
  //       if (error.response) {
  //         console.error("Server responded with an error:", error.response.data);
  //         console.error("Status code:", error.response.status);
  //         console.error("Request config:", error.response.config);
  //       } else if (error.request) {
  //         console.error(
  //           "Request was made but no response was received:",
  //           error.request
  //         );
  //       } else {
  //         console.error("Error setting up the request:", error.message);
  //       }
  //       console.error("Error updating profile:", error);
  //     });
  // };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !phoneNumber || !bioDescription) {
      toast.error("Please Fill In All Required Fields.");
      return;
    }
    if (phoneNumber.length !== 10) {
      toast.error("Phone Number Must Be 10 Digits.");
      return;
    }
    const formData = new FormData();
    formData.append("gender", gender.toString());
    formData.append("phoneNumber", phoneNumber.toString());
    formData.append("biography", bioDescription);
    formData.append("paypalId", paypalId.toString() || paypalId1.toString());
    formData.append("paypalAddress", paypalAddress || paypalAddress1);

    axios
      .put(
        `https://learnconnectapi.azurewebsites.net/api/user/update-info-user?id=${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        refetchUser();
        setTimeout(() => {
          toast.success("Edit Successfully!!!");
        });
        if (userData?.role === 2) {
          router.push(`/profile-mentor/${id}`);
        } else {
          router.push(`/profile`);
        }
      })
      .catch((error) => {
        setTimeout(() => {
          toast.error("Edit Unsuccessfully!!!");
          // toast.error(error.response.data);
        });
        if (userData?.role === 2) {
          router.push(`/profile-mentor/${id}`);
        } else {
          router.push(`/profile`);
        }
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
  const breadcrumbsHome = () => {
    switch (role) {
      case UserRole.Student:
        router.push("/");
        break;
      case UserRole.Mentor:
        router.push("/instructorcourses");
        break;
      case UserRole.Staff:
        router.push("/staff-page");
        break;
      case UserRole.Admin:
        router.push("/user-manage");
        break;
      default:
        break;
    }
  };
  const breadcrumbsProfile = () => {
    if (userData?.role === 2) {
      router.push(`/profile-mentor/${id}`);
    } else {
      router.push(`/profile`);
    }
  };

  return (
    <>
      <div className="bg-[#e7f8ee]">
        <div
          className="bg-no-repeat bg-auto flex flex-row justify-between"
          style={{
            backgroundImage: "url('/images/shape-23.png')",
          }}
        >
          <div>
            <Breadcrumb className="font-semibold text-3xl py-5 px-64 flex-auto">
              <Breadcrumb.Item>
                <button onClick={breadcrumbsHome}>Home</button>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <button onClick={breadcrumbsProfile}>Profile</button>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <span>Edit</span>
              </Breadcrumb.Item>
            </Breadcrumb>{" "}
          </div>
          <div
            className="w-2/5 bg-auto bg-no-repeat bg-right-top flex-1"
            style={{
              backgroundImage: "url('/images/shape-24.png')",
            }}
          />
        </div>
      </div>
      <div className="container">
        <div className="bg-[#fff]">
          <div className="container mx-auto max-w-screen-lg py-20">
            <div className="pt-6 px-10 pb-16 border border-solid border-opacity-20 border-[#30925533] rounded-lg shadow-lg">
              <form onSubmit={handleSubmit}>
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
                    Biography
                  </label>
                  <textarea
                    id="bio_description"
                    value={bioDescription}
                    onChange={handleBioDescriptionChange}
                    className="bg-[#fff] border border-[#30925533] text-[#000] text-base rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-[#309255] h-[200px]"
                    placeholder="Your Biography"
                    required
                  />
                </div>
                {userData?.role === 2 && (
                  <>
                    <div className="mb-6">
                      <label
                        htmlFor="paypalId"
                        className="block mb-2 text-base font-medium text-[#000]"
                      >
                        PayPal ID
                      </label>
                      <input
                        type="number"
                        id="paypalId"
                        defaultValue={paypalId1}
                        onChange={handlePayPalIdChange}
                        className="bg-[#fff] border border-[#30925533] text-[#000] text-base rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-[#309255]"
                        placeholder="Your Paypal ID"
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="paypalAddress"
                        className="block mb-2 text-base font-medium text-[#000]"
                      >
                        Paypal Address:
                      </label>
                      <input
                        id="paypalAddress"
                        defaultValue={paypalAddress1}
                        onChange={handlePayPalAddressChange}
                        className="bg-[#fff] border border-[#30925533] text-[#000] text-base rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-[#309255]"
                        placeholder="Your Email Paypal Address"
                        required
                      />
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="bg-[#309255] text-[18px] px-[35px] py-[15px] mt-[15px] rounded-lg text-[#fff] hover:bg-[#000] transition-all duration-300 ease-in-out delay-0"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
