import React from "react";
import { Spin } from "antd";

interface LoadingProps {
  text?: string;
}

const Loading: React.FC<LoadingProps> = ({ text = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center h-screen text-5xl">
      <Spin size="large" />
      <p className="ml-2">{text}</p>
    </div>
  );
};

export default Loading;
