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
    domains: ['media.wired.com','www.simplilearn.com'], // Thêm tên miền hoặc hostname vào đây
  },
}
