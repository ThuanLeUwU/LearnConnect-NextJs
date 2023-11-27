// UploadVideo.js

import { useEffect, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { initializeApp } from "firebase/app";
import { getStorage } from "@firebase/storage";
import { app } from "../../app/firebase";
import { Breadcrumb } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";

// const firebaseConfig = {
//     apiKey: "AIzaSyCEfLC8QnGWe2r0qAVTNatJqDK7ezZcICk",
//     authDomain: "learnconnect-6f324.firebaseapp.com",
//     projectId: "learnconnect-6f324",
//     storageBucket: "learnconnect-6f324.appspot.com",
//     messagingSenderId: "915054679433",
//     appId: "1:915054679433:web:0a7daa005ff6b176eabd58",
//     // measurementId: "G-69KWPWKQV6",
// };
// const app = initializeApp(firebaseConfig);

const BreadcrumbNavigation = () => {
  return <></>;
};

export default BreadcrumbNavigation;
