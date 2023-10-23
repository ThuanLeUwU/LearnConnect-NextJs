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
  User,
} from "firebase/auth";

import { auth } from "../firebase";
import { useRouter } from "next/navigation";
import axios from "axios";

interface AuthContextProps {
  children: ReactNode;
}

// export type User = {
//   id: string | number;
//   password: string;
//   email: string;
//   role: 0;
//   fullName: string;
//   phoneNumber: string;
//   gender: 0;
//   bioDescription: string;
//   profilePictureUrl: string;
//   status: number;
// };
interface AuthContextValue {
  user: User | null;
  token: string;
  id: string;
  googleSignIn: () => void;
  logOut: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  token: "",
  id: "",
  googleSignIn: () => {},
  logOut: () => {},
});

export const AuthContextProvider: React.FC<AuthContextProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState("");
  const [id, setId] = useState("");
  const router = useRouter();
  const [userToken, setUserToken] = useState<User>();
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
      if (currentUser) {
        currentUser.getIdToken().then((token) => {
          const fetchData = async () => {
            const responseData = await axios.post(
              `https://learnconnectapitest.azurewebsites.net/api/user/login?accessToken=${token}`
            );
            setUserToken(responseData?.data);
            const api_token = responseData?.data.data;
            var jwt = require("jsonwebtoken");
            var decoded = jwt.decode(api_token);
            setToken(api_token);
            const id = decoded.Id;
            setId(id);
          };
          fetchData();
        });
      }
    });

    return () => unsubscribe();
  }, [router, user]);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const responseUser = await axios.get(
  //       `https://learnconnectapitest.azurewebsites.net/api/user/${id}`
  //     );
  //     setUser(responseUser?.data);
  //     console.log("user is :", responseUser);
  //   };
  //   fetchUser();
  // }, []);

  return (
    <AuthContext.Provider value={{ user, token, id, googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
