"use client";
import React, {
  useContext,
  createContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  User as FirebaseUser,
} from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";
import axios from "axios";
import { message } from "antd";
import { toast } from "sonner";

interface AuthContextProps {
  children: ReactNode;
}

export type User = {
  id: string | number;
  password: string;
  email: string;
  role: 0;
  fullName: string;
  phoneNumber: string;
  gender: 0;
  bioDescription: string;
  profilePictureUrl: string;
  status: number;
};

interface AuthContextValue {
  user: FirebaseUser | null;
  jwtToken: string;
  id: string;
  role: number;
  userData: User | null;
  googleSignIn: () => void;
  logOut: () => void;
  refetchUser: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  jwtToken: "",
  id: "",
  role: 0,
  userData: null,
  googleSignIn: () => {},
  logOut: () => {},
  refetchUser: () => {},
});

export const AuthContextProvider: React.FC<AuthContextProps> = ({
  children,
}) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [jwtToken, setJwtToken] = useState("");
  const [id, setId] = useState("");
  const [role, setRole] = useState(0);
  // console.log("info", id)
  const [userData, setUserData] = useState<User | null>(null);
  const router = useRouter();
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    if (role === 3) {
      console.log("course log", role);
      router.push("/courses");
    } else {
      console.log("user log", role);
      router.push("/user-manage");
    }
    // if (userRole === "3") {
    //   // console.log("course log", userRole);
    //   router.push("/courses");
    // } else if (userRole === "2") {
    //   // console.log("user log", userRole);
    //   router.push("/instructorcourses");
    // } else if (userRole === "1") {
    //   console.log("user log", userRole);
    //   router.push("/user-manage");
    // }

    setTimeout(() => {
      toast.success("Login successful");
    });
  };

  const logOut = () => {
    signOut(auth);
    setUser(null);
    setJwtToken("");
    setId("");
    setUserData(null);
    setRole(0);
  };

  const refetchUser = async () => {
    if (id) {
      const responseUser = await axios.get(
        `https://learnconnectapitest.azurewebsites.net/api/user/${id}`
      );
      setUserData(responseUser?.data);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("token", currentUser?.getIdToken());

      if (currentUser) {
        currentUser.getIdToken().then((token) => {
          const fetchData = async () => {
            const responseData = await axios.post(
              `https://learnconnectapitest.azurewebsites.net/api/user/login`,
              token,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            setJwtToken(responseData?.data);
            const api_token = responseData?.data.data;
            var jwt = require("jsonwebtoken");
            var decoded = jwt.decode(api_token);
            setJwtToken(api_token);
            const userId = decoded.Id;
            const userRole = decoded.role;

            // if (userRole === "3") {
            //   // console.log("course log", userRole);
            //   router.push("/courses");
            // } else if (userRole === "2") {
            //   // console.log("user log", userRole);
            //   router.push("/instructorcourses");
            // } else if (userRole === "1") {
            //   console.log("user log", userRole);
            //   router.push("/user-manage");
            // }

            setId(userId);
            setRole(parseInt(userRole));
            console.log("user role", parseInt(userRole));
            const fetchUser = async (userId: string) => {
              const responseUser = await axios.get(
                `https://learnconnectapitest.azurewebsites.net/api/user/${userId}`
              );
              setUserData(responseUser?.data);
            };
            fetchUser(userId);
            // if (userRole === "3") {
            //   // console.log("course log", userRole);
            //   router.push("/courses");
            // } else if (userRole === "2") {
            //   // console.log("user log", userRole);
            //   router.push("/instructorcourses");
            // } else if (userRole === "1") {
            //   console.log("user log", userRole);
            //   router.push("/user-manage");
            // }
          };

          fetchData();
        });
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        jwtToken,
        id,
        role,
        userData,
        googleSignIn,
        logOut,
        refetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
