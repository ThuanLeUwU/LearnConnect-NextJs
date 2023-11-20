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
import { Select } from "antd";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ".././app/./globals.css";

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

interface Specialization {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
}
interface IProps {
  onCancel: () => void;
  visible: boolean;
  setVisible: (e: boolean) => void;
  isEdit?: boolean;

  // setSuccess: (e: boolean) => void;
}

export const RegisterForm = () => {
  const [show, setShow] = useState(false);
  const { id, userData } = UserAuth();
  const [currentInfo, setCurrentInfo] = useState<User>();

  const [identifyImage, setIdentifyImage] = useState<string>();
  const [identifyData, setIdentifyData] = useState();

  const [backImage, setBackImage] = useState<string>();
  const [BackData, setBackData] = useState();

  const [documentImage, setDocumentImage] = useState<string>();
  const [DocumentData, setDocumentData] = useState();

  const { Option } = Select;

  const [specialization, setSpecialization] = useState<Specialization[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await http.get(`/user/${id}`);
      setCurrentInfo(responseData?.data);
    };
    fetchData();
  }, []);

  const [form] = Form.useForm();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (info: any) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      setIdentifyData(info.file.originFileObj);
      getBase64(info.file.originFileObj, (url) => {
        setIdentifyImage(url);
      });
    }
  };
  const handleChangeBackImg = (info: any) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      setDocumentData(info.file.originFileObj);
      getBase64(info.file.originFileObj, (url) => {
        setDocumentImage(url);
      });
    }
  };

  const handleChangeDocumentData = (info: any) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      setBackData(info.file.originFileObj);
      getBase64(info.file.originFileObj, (url) => {
        setBackImage(url);
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
    if (!file) {
      message.warning("Please upload an image!");
      return false;
    }
    if (!isJpgOrPng) {
      toast.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      toast.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    const {
      specialization,
      description,
      BankNumber,
      BankName,
      CardFront,
      CardBack,
      DescriptionDocument,
    } = values;
    formData.append("specializationId", values.specialization || "");
    formData.append("description", values.description);
    formData.append("BankNumber", values.BankNumber);
    formData.append("BankName", values.BankName);
    formData.append("CardFront", CardFront);
    formData.append("CardBack", CardBack);
    formData.append("DescriptionDocument", DescriptionDocument);
    if (BackData) {
      formData.append("identityCardBackUrl", BackData);
    }

    if (identifyData) {
      formData.append("identityCardFrontUrl", identifyData);
    }

    if (DocumentData) {
      formData.append("verificationDocument", DocumentData);
    }
    formData.append(
      "identityCardBackDescription",
      "Description for identity card back"
    );
    formData.append(
      "identityCardFrontDescription",
      "Description for identity card front"
    );

    if (identifyData !== undefined) {
      formData.append("FontCardImage", identifyData);
    }
    if (BackData !== undefined) {
      formData.append("BackCardImage", BackData);
    }
    if (DocumentData !== undefined) {
      formData.append("BackCardImage", DocumentData);
    }
    try {
      const url = `https://learnconnectapitest.azurewebsites.net/api/user/become-a-mentor?userId=${id}&specializationId=${specialization}&description=${description}&accountNumber=${BankNumber}&bankName=${BankName}`;
      await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setTimeout(() => {
        toast.success("Form submitted successful");
      }, 0);
      // console.log("url", url);
    } catch (error) {
      setTimeout(() => {
        toast.error("Failed to submit the form. Please try again later.");
      }, 0);
      console.log("error", error);
    } finally {
      handleClose();
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://learnconnectapitest.azurewebsites.net/api/specialization"
        );
        setSpecialization(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="">
      <div className="container border border-[#309255] my-3 rounded-lg mt-3">
        <Form
          autoComplete="off"
          form={form}
          labelCol={{ span: 4, offset: 3 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={handleSubmit}
          className="mx-[30px] pt-3"
        >
          <h3>personal information</h3>
          <Form.Item
            label="Full Name"
            name="disable"
            className=""
            labelAlign="left"
          >
            {userData?.fullName}
          </Form.Item>

          <Form.Item label="Email" labelAlign="left">
            {userData?.email}
          </Form.Item>
          <Form.Item
            label="Specialization"
            name="specialization"
            rules={[
              { required: true, message: "Please select a specialization!" },
            ]}
            className="text-start"
            labelAlign="left"
          >
            <Select>
              {specialization.map((specialization) => (
                <Option key={specialization.id} value={specialization.id}>
                  {specialization.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Please input Description" }]}
            label="Description"
            name="description"
            className=""
            labelAlign="left"
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Please input Bank" }]}
            label="Bank"
            name="BankName"
            labelAlign="left"
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Please input Card Number" }]}
            label="Card Number"
            name="BankNumber"
            labelAlign="left"
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Please input CardFront" }]}
            label="ID Number"
            name="CardFront"
            labelAlign="left"
          >
            <Input placeholder="Input Identity Number " />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Please input CardFront" }]}
            label="ID Card Font"
            getValueFromEvent={normFile}
            labelAlign="left"
          >
            <Upload
              accept="image/png, image/jpeg"
              onChange={handleChange}
              beforeUpload={beforeUpload}
              action="https://learnconnectapitest.azurewebsites.net/api/Upload/image"
              listType="picture-card"
            >
              Upload
            </Upload>
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Please input CardBack" }]}
            label="CardBack"
            name="CardBack"
            labelAlign="left"
          >
            <Input placeholder="Particular trace or deformity" />
          </Form.Item>
          <Form.Item
            label="ID Card Back"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: "Please input CardFront" }]}
            labelAlign="left"
          >
            <Upload
              accept="image/png, image/jpeg"
              onChange={handleChangeBackImg}
              beforeUpload={beforeUpload}
              action="https://learnconnectapitest.azurewebsites.net/api/Upload/image"
              listType="picture-card"
            >
              Upload
            </Upload>
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Please input Document" }]}
            label="Document"
            name="DescriptionDocument"
            labelAlign="left"
          >
            <Input placeholder="Input Degree, Diploma, Certificate, Qualification" />
          </Form.Item>
          <Form.Item
            label="ID Card Back"
            name="CardBack"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: "Please input CardFront" }]}
            labelAlign="left"
          >
            <Upload
              accept="image/png, image/jpeg"
              onChange={handleChangeDocumentData}
              beforeUpload={beforeUpload}
              action="https://learnconnectapitest.azurewebsites.net/api/Upload/image"
              listType="picture-card"
            >
              Upload
            </Upload>
          </Form.Item>
          <button
            type="submit"
            className="text-white text-lg w-full mb-3 mt-2 bg-[#309255] rounded-lg py-2"
          >
            Send
          </button>
        </Form>
      </div>
    </div>
  );
};
