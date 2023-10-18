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

interface AuthContextValue {
  user: User | null;
  token: string;
  googleSignIn: () => void;
  logOut: () => void;
}
// const api_token =
//   "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjMiLCJlbWFpbCI6InRoaWVucG5zZTE1MDEzN0BmcHQuZWR1LnZuIiwicm9sZSI6IjMiLCJUb2tlbklkIjoiMDQ2NTg2ZWItMjVlYi00YzNjLWJiNzMtN2MzYjhlMjdiODQ1IiwibmJmIjoxNjk3NTM3NTI2LCJleHAiOjE2OTc1Mzc2NDYsImlhdCI6MTY5NzUzNzUyNn0.16dXKmveE3pTuUk-VhUaoZSFiR0RRQDWsb3dwQ-njRUbWsF7ZPv-9fxFvJMmB4stMgxFZFLt3o5FgfVvNFDw8g";
// var jwt = require("jsonwebtoken");
// var decoded = jwt.decode(api_token);
// console.log("decoded", decoded);

// let token = user && user.accessToken ? user.accessToken : null; //cho nay` eo loi do thg db ts
// const [userToken, setUserToken] = useState<User>();
// useEffect(() => {
//   const fetchData = async () => {
//     const responseData = await axios.get(
//       `https://learnconnectapitest.azurewebsites.net/api/user/login?accessToken=${token}`
//     );
//     setUserToken(responseData?.data);
//   };
//   console.log("token ne", token);
//   console.log("user ne", userToken);
//   fetchData();
// }, []);

const AuthContext = createContext<AuthContextValue>({
  user: null,
  token: "",
  googleSignIn: () => {},
  logOut: () => {},
});

// const getToken = (googleToken: User | null) => {
//   // let token = user && user.accessToken ? user.accessToken : null; //cho nay` eo loi do thg db ts

//   // const [userToken, setUserToken] = useState<any>();
//   // useEffect(() => {
//   const fetchData = async () => {
//     const responseData = await axios.get(
//       `https://learnconnectapitest.azurewebsites.net/api/user/login?accessToken=${googleToken}`
//     );
//     const api_token = responseData?.data;
//     var jwt = require("jsonwebtoken");
//     var decoded = jwt.decode(api_token);
//     console.log("decoded", decoded);
//     // setUserToken(decoded);
//   };
//   // console.log("token ne", token);
//   fetchData();
//   // console.log("user ne", userToken);
//   // }, []);
//   return <></>;
// };

export const AuthContextProvider: React.FC<AuthContextProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState("");
  const router = useRouter();
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    router.push("/");
  };

  // const googleCheckLogin = async () => {
  //   try {
  //     const token =   auth.currentUser;
  //     console.log("token", token);
  //     const responsive = await axios.get(
  //       `https://learnconnectapitest.azurewebsites.net/api/user/login?accessToken=`
  //     );

  //   } catch {}
  // };

  const logOut = () => {
    signOut(auth);
  };

  // const getToken = () => {
  //   // let token = user && user.accessToken ? user.accessToken : null; //cho nay` eo loi do thg db ts
  //   // console.log("token nef", token);
  //   const [userToken, setUserToken] = useState<User>();
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const responseData = await axios.post(
  //         `https://learnconnectapitest.azurewebsites.net/api/user/login?accessToken=${token}`
  //       );
  //       setUserToken(responseData?.data);
  //       console.log("userToken", userToken);
  //       const api_token = userToken.data;
  //       console.log("api_token", api_token);
  //       var jwt = require("jsonwebtoken");
  //       var decoded = jwt.decode(api_token);
  //       console.log("decoded", decoded);
  //     };
  //     console.log("token ne", token);
  //     fetchData();
  //     return () => decoded;
  //   }, []);
  //   console.log("token ne", token);
  //   console.log("userToken", userToken);
  // };

  // let token = user && user.accessToken ? user.accessToken : null; //cho nay` eo loi do thg db ts
  // const [userToken, setUserToken] = useState<User>();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const responseData = await axios.get(
  //       `https://learnconnectapitest.azurewebsites.net/api/user/login?accessToken=${token}`
  //     );
  //     setUserToken(responseData?.data);
  //   };
  //   console.log("token ne", token);
  //   console.log("user ne", userToken);
  //   fetchData();
  // }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // const getdata = getToken(currentUser);
      setUser(currentUser);
      // googleCheckLogin;
      // router.push('/');

      console.log("user123", user);
    });

    return () => unsubscribe();
  }, [router, user]);

  return (
    <AuthContext.Provider value={{ user, token, googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
