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
  token: string;
  id: string;
  role: string | number;
  userData: User | null;
  googleSignIn: () => void;
  logOut: () => void;
  refetchUser: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  token: "",
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
  const [token, setToken] = useState("");
  const [id, setId] = useState("");
  const [role, setRole] = useState(0);
  // console.log("info", id)
  const [userData, setUserData] = useState<User | null>(null);
  const router = useRouter();
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    if (role === 3) {
      router.push("/courses");
    } else {
      router.push("/user-manage");
    }

    setTimeout(() => {
      message.success("Login successful");
    });
  };

  const logOut = () => {
    signOut(auth);
    // setRole(0);
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
            setToken(responseData?.data);
            const api_token = responseData?.data.data;
            var jwt = require("jsonwebtoken");
            var decoded = jwt.decode(api_token);
            setToken(api_token);
            const userId = decoded.Id;
            const userRole = decoded.role;
            setId(userId);
            setRole(userRole);
            const fetchUser = async (userId: string) => {
              const responseUser = await axios.get(
                `https://learnconnectapitest.azurewebsites.net/api/user/${userId}`
              );
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
        token,
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
