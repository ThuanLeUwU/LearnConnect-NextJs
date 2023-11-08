"use client";
import { http } from "@/api/http";
import { UserAuth } from "@/app/context/AuthContext";
import {
  Modal,
  Form,
  Input,
  Space,
  Button,
  InputNumber,
  Upload,
  message,
} from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export type User = {
  id: string | number;
  password: string;
  email: string;
  role: number;
  fullName: string;
  dob: string | number | null;
  phoneNumber: string;
  gender: number;
  registrationDate: string | null;
  lastLoginDate: string | null;
  bioDescription: string;
  profilePictureUrl: string;
};
interface IProps {
  onCancel: () => void;
  visible: boolean;
  setVisible: (e: boolean) => void;
  isEdit?: boolean;

  // setSuccess: (e: boolean) => void;
}

export const RegisterForm = ({ onCancel, visible, isEdit }: IProps) => {
  const [show, setShow] = useState(false);
  const { id, user } = UserAuth();
  // console.log("id", id)
  const [currentInfo, setCurrentInfo] = useState<User>();
  // console.log(currentInfo)
  const [identifyImage, setIdentifyImage] = useState<string>();
  const [identifyData, setIdentifyData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await http.get(`/user/${id}`);
      setCurrentInfo(responseData?.data);
    };
    fetchData();
  }, []);

  const [form] = Form.useForm();
  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (info: any) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.

      setIdentifyData(info.file.originFileObj);
      getBase64(info.file.originFileObj, (url) => {
        setIdentifyImage(url);
      });
    }
  };

  const getBase64 = (img: any, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      toast.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      toast.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleSubmit = () => {
    handleClose();
  };

  return (
    <Modal
      className="w-2/3 min-h-[300px]"
      title="Register Form"
      destroyOnClose
      open={visible}
      onCancel={onCancel}
      footer={false}
    >
      <Form
        autoComplete="off"
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 15 }}
        layout="horizontal"
        className="mt-5"
        onFinish={handleSubmit}
      >
        <Form.Item label="Name" name="disable">
          {user?.displayName}
        </Form.Item>
        <Form.Item label="Email">{user?.email}</Form.Item>
        {/* <Form.Item label="Phone">{currentInfo?.phoneNumber}</Form.Item> */}
        <Form.Item
          rules={[{ required: true, message: "Please input Identify Card!" }]}
          label="Identify Card"
          name="identify"
        >
          <Input />
        </Form.Item>
        <Form.Item label="ID Card (Image)">
          <Upload
            accept="image/png, image/jpeg"
            onChange={handleChange}
            beforeUpload={beforeUpload}
            // headers={{ Authorization: authorization }}
            action="https://learnconnectapitest.azurewebsites.net/api/image"
            listType="picture-card"
          >
            Upload
          </Upload>
        </Form.Item>
        <Space className="justify-end w-full">
          <Form.Item className="mb-0">
            <Space>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{ color: "black" }}
              >
                Send
              </Button>
            </Space>
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  );
};
