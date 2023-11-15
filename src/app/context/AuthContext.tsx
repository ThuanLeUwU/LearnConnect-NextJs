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
import { message } from "antd";
import { toast } from "sonner";
import { http } from "@/api/http";
import axios from "axios";

interface AuthContextProps {
  children: ReactNode;
}

export type User = {
  id: string | number;
  password: string;
  email: string;
  role: UserRole;
  fullName: string;
  phoneNumber: string;
  gender: number;
  bioDescription: string;
  profilePictureUrl: string;
  status: number;
};

export enum UserRole {
  Admin = 0,
  Staff = 1,
  Mentor = 2,
  Student = 3,
}

interface AuthContextValue {
  user: FirebaseUser | null;
  jwtToken: string;
  id: string;
  role: number;
  userData: User | null;
  googleSignIn: () => void;
  logOut: () => void;
  setUserLogin: (user, token) => void;
  refetchUser: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  jwtToken: "",
  id: "",
  role: -1,
  userData: null,
  googleSignIn: () => {},
  logOut: () => {},
  setUserLogin: (user, token) => {},
  refetchUser: () => {},
});

export const AuthContextProvider: React.FC<AuthContextProps> = ({
  children,
}) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [jwtToken, setJwtToken] = useState("");
  const [id, setId] = useState("");
  const [role, setRole] = useState(-1);
  const [userData, setUserData] = useState<User | null>(null);
  const router = useRouter();

  const resetUserData = () => {
    setUser(null);
    setJwtToken("");
    setId("");
    setUserData(null);
    setRole(-1);
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);

    setTimeout(() => {
      toast.success("Login successful");
    });
  };

  const logOut = () => {
    signOut(auth);
    setUser(null);
    localStorage.removeItem("token");
    setJwtToken("");
    setId("");
    setUserData(null);
    setRole(-1);
  };
  const setUserLogin = (user, token) => {
    setUser(null);
    localStorage.setItem("token", token);
    setJwtToken(token);
    setId(user?.id);
    setUserData(user);
    setRole(user?.role);
  };

  const refetchUser = async () => {
    if (id) {
      const responseUser = await http.get(`/user/${id}`);
      setUserData(responseUser?.data);
    }
  };

  // useEffect(() => {
  //   const inactivityTimeout = setTimeout(() => {
  //     resetUserData();
  //   }, 30 * 60 * 100);

  //   const resetTimeout = () => {
  //     clearTimeout(inactivityTimeout);
  //   };

  //   window.addEventListener("mousemove", resetTimeout);
  //   window.addEventListener("keydown", resetTimeout);

  //   return () => {
  //     window.removeEventListener("mousemove", resetTimeout);
  //     window.removeEventListener("keydown", resetTimeout);
  //     clearTimeout(inactivityTimeout);
  //   };
  // }, [user, jwtToken, id, role, userData]);

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
            // setJwtToken(responseData?.data);
            localStorage.setItem("token", responseData?.data.data);
            const api_token = responseData?.data.data;
            var jwt = require("jsonwebtoken");
            var decoded = jwt.decode(api_token);
            setJwtToken(api_token);
            const userId = decoded.Id;
            const userRole = decoded.role;
            setId(userId);
            setRole(parseInt(userRole));
            console.log("user role", parseInt(userRole));
            const fetchUser = async (userId: string) => {
              const responseUser = await http.get(`/user/${userId}`);
              setUserData(responseUser?.data);
            };
            fetchUser(userId);
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
        setUserLogin,
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
