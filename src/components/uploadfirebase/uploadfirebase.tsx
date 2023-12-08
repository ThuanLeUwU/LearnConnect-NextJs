// UploadVideo.js
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { initializeApp } from "firebase/app";
import { getStorage } from "@firebase/storage";
import { app } from "../../app/firebase";
import { toast } from "sonner";

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
    const selectedFile = e.target.files[0];

    // Check if a file is selected
    if (selectedFile) {
      // Check if the file size is within the allowed limit (300MB)
      const maxSizeInBytes = 200 * 1024 * 1024; // 300MB

      if (selectedFile.size <= maxSizeInBytes) {
        // File size is within the limit, proceed with the upload
        handleUpload(selectedFile);
      } else {
        // File size exceeds the limit, handle accordingly (display an error, etc.)
        toast.error("File size exceeds the limit (200MB).");
        // You may want to reset the file input or show an error message to the user
        // For now, I'm just resetting the input value to clear the selected file
        e.target.value = null;
      }
    }
    // if (e.target.files[0]) {
    //   handleUpload(e.target.files[0]);
    // }
  };

  const handleUpload = (video) => {
    if (video) {
      // const storageRef = ref(storage, `videos/${(fileName)?fileName:video.name}`);
      const storageRef = ref(storage, `lectures/${fileName}`);
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
            // console.log("File available at", downloadURL);
            returnUrl(downloadURL);
            setProgress(0);
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
