"use client";
import { UserAuth } from "@/app/context/AuthContext";
import { Modal, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await axios.get(
        `https://learnconnectapitest.azurewebsites.net/api/user/${id}`
      );
      setCurrentInfo(responseData?.data);
    };
    fetchData();
  }, []);

  const [form] = Form.useForm();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        labelCol={{ span: 5 }}
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
          name= "identify"
        >
          <Input />
        </Form.Item>
        <Form.Item>
          
        </Form.Item>
      </Form>
    </Modal>
  );
};
