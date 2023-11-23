// UploadVideo.js
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { initializeApp } from "firebase/app";
import { getStorage } from "@firebase/storage";
import { app } from "../../app/firebase";

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

const storage = getStorage(app);

const UploadFirebase = ({
  fileName,
  returnUrl,
}: {
  fileName: string;
  returnUrl: any;
}) => {
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  const handleUpload = (video) => {
    if (video) {
      // const storageRef = ref(storage, `videos/${(fileName)?fileName:video.name}`);
      const storageRef = ref(storage, `videos/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, video);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          console.error("uploadTask:", error);
        },
        () => {
          // Upload completed successfully, now get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            returnUrl(downloadURL);
          });
        }
      );
    }
  };

  return (
    <div>
      <label
        htmlFor="fileInput"
        className="ant-btn css-dev-only-do-not-override-pr0fja ant-btn-default"
      >
        <input
          type="file"
          id="fileInput"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <span>Upload</span>
      </label>
      {progress > 0 && (
        <progress value={progress} max="100" className="w-full" />
      )}
    </div>
  );
};

export default UploadFirebase;
