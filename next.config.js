/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

module.exports = nextConfig;

module.exports = {
  images: {
    domains: ["media.wired.com", "www.simplilearn.com"], // Thêm tên miền hoặc hostname vào đây
  },
};

module.exports = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;

    return config;
  },
};
// const { withServiceWorker } = require("@microsoft/next-service-worker");

// module.exports = withServiceWorker({
//   serviceWorker: {
//     src: "./public/firebase-messaging-sw.js", // Đường dẫn tới tệp firebase-messaging-sw.js
//   },
// });
