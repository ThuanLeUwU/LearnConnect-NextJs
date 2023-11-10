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
  const [currentInfo, setCurrentInfo] = useState<User>();

  const [identifyImage, setIdentifyImage] = useState<string>();
  const [identifyData, setIdentifyData] = useState();

  const [backImage, setBackImage] = useState<string>();
  const [BackData, setBackData] = useState();

  const [documentImage, setDocumentImage] = useState<string>();
  const [DocumentData, setDocumentData] = useState();

  const { Option } = Select;

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
      category,
      description,
      BankNumber,
      BankName,
      CardFront,
      CardBack,
      DescriptionDocument,
    } = values;
    formData.append("Category", values.category || "1");
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
      const url = `https://learnconnectapitest.azurewebsites.net/api/user/become-a-mentor?userId=${id}&categoryId=${category}&description=${description}&accountNumber=${BankNumber}&bankName=${BankName}`;
      await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setTimeout(() => {
        toast.success("Form submitted successful");
      }, 0);
      console.log("url", url);
    } catch (error) {
      setTimeout(() => {
        toast.error("Failed to submit the form. Please try again later.");
      }, 0);
      console.log("error", error);
    } finally {
      handleClose();
    }
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
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please select a category!" }]}
        >
          <Select>
            <Option value="1">SE</Option>
            <Option value="2">AI</Option>
            <Option value="3">IA</Option>
          </Select>
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Please input Description" }]}
          label="Description"
          name="description"
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Please input BankNumber" }]}
          label="BankNumber"
          name="BankNumber"
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Please input BankName" }]}
          label="BankName"
          name="BankName"
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Please input CardFront" }]}
          label="CardFront"
          name="CardFront"
        >
          <Input />
        </Form.Item>
        {/* <Form.Item label="ID Card Font">
          <Upload
            accept="image/png, image/jpeg"
            onChange={handleChange}
            beforeUpload={beforeUpload}
            action="https://learnconnectapitest.azurewebsites.net/api/image"
            listType="picture-card"
          >
            Upload
          </Upload>
        </Form.Item> */}
        <Form.Item
          rules={[{ required: true, message: "Please input CardFront" }]}
          label="ID Card Font"
          getValueFromEvent={normFile}
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
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="ID Card Back"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "Please input CardFront" }]}
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
          rules={[
            { required: true, message: "Please input Description Document" },
          ]}
          label="DescriptionDocument"
          name="DescriptionDocument"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="ID Card Back"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "Please input CardFront" }]}
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
