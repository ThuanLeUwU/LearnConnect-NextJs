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
  userData: User | null;
  googleSignIn: () => void;
  logOut: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  token: "",
  id: "",
  userData: null,
  googleSignIn: () => {},
  logOut: () => {},
});

export const AuthContextProvider: React.FC<AuthContextProps> = ({
  children,
}) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [token, setToken] = useState("");
  const [id, setId] = useState("");
  const [userData, setUserData] = useState<User | null>(null);
  const router = useRouter();
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    router.push("/");
  };

  const logOut = () => {
    signOut(auth);
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
            console.log("token is:", token);
            setToken(responseData?.data);
            const api_token = responseData?.data.data;
            var jwt = require("jsonwebtoken");
            var decoded = jwt.decode(api_token);
            setToken(api_token);
            const userId = decoded.Id;
            setId(userId);

            const fetchUser = async () => {
              const responseUser = await axios.get(
                `https://learnconnectapitest.azurewebsites.net/api/user/${userId}`
              );
              setUserData(responseUser?.data);
            };
            fetchUser();
          };
          fetchData();
        });
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <AuthContext.Provider
      value={{ user, token, id, userData, googleSignIn, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
