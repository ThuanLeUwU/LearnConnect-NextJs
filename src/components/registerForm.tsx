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
  DatePicker,
} from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { Select } from "antd";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ".././app/./globals.css";
import { useRouter } from "next/navigation";

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

interface Major {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
}

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

interface Bank {
  id: number;
  shortName: string;
  code: string;
  name: string;
  logo: string;
}

export const RegisterForm = () => {
  const router = useRouter();
  const { role } = UserAuth();
  useEffect(() => {
    if (role === 0) {
      router.push(`/user-manage`);
    }
    if (role === 1) {
      router.push(`/staff-page`);
    }
    if (role === 2) {
      router.push(`/instructorcourses`);
    }
    // if (role === 3) {
    //   router.push(`/`);
    // }
    // if (role === -1) {
    //   router.push(`/`);
    // }
  });
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
  const [major, setMajor] = useState<Major[]>([]);
  const [selectedMajor, setSelectedMajor] = useState<number | null>(null);

  const [banks, setBanks] = useState<Bank[]>([]);

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
      major,
      specialization,
      description,
      BankNumber,
      BankName,
      CardFront,
      CardBack,
      IssueDate,
      DescriptionDocument,
      reason,
    } = values;
    formData.append("major", values.major || "");
    formData.append("specializationId", values.specialization || "");
    formData.append("description", values.description);
    formData.append("IssueDate", values.IssueDate);
    formData.append("BankNumber", values.BankNumber);
    formData.append("BankName", values.BankName);
    formData.append("reason", values.reason);
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
    formData.append("identityCardBackDescription", values.IssueDate);
    formData.append("identityCardFrontDescription", CardFront);

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
      const url = `https://learnconnectapitest.azurewebsites.net/api/mentor/become-a-mentor?userId=${id}&specializationId=${specialization}&description=${description}&reason=${reason}&accountNumber=${BankNumber}&bankName=${BankName}`;
      await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setTimeout(() => {
        toast.success("Form submitted successful");
        form.resetFields();
        router.push(`/`);
      }, 0);
      // console.log("url", url);
    } catch (error) {
      setTimeout(() => {
        toast.error(error.response.data);
      }, 0);
      console.log("error", error);
    } finally {
      handleClose();
    }
  };

  useEffect(() => {
    const fetchMajor = async () => {
      try {
        const response = await axios.get(
          "https://learnconnectapitest.azurewebsites.net/api/major"
        );
        setMajor(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchMajor();
  }, []);

  const handleCancel = () => {
    form.resetFields();
    router.back();
  };

  useEffect(() => {
    if (selectedMajor !== null) {
      const fetchSpecializations = async () => {
        try {
          const response = await axios.get(
            `https://learnconnectapitest.azurewebsites.net/api/specialization/by-major/${selectedMajor}`
          );
          setSpecialization(response.data);
        } catch (error) {
          console.error("Error fetching specializations:", error);
        }
      };

      fetchSpecializations();
    }
  }, [selectedMajor]);
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axios.get("https://api.vietqr.io/v2/banks");
        setBanks(response.data.data);
        console.log("Bank Name", response.data);
      } catch (error) {
        console.error("Error fetching banks:", error);
      }
    };

    fetchBanks();
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
            rules={[{ required: true, message: "Please input Description" }]}
            label="Introduction"
            name="description"
            className=""
            labelAlign="left"
          >
            <Input placeholder="Input Introduction " />
          </Form.Item>

          <Form.Item
            name="BankName"
            label="Bank Name"
            rules={[{ required: true, message: "Please select a bank" }]}
            labelAlign="left"
          >
            <Select placeholder="Select a bank">
              {banks.map((bank) => (
                <Select.Option key={bank.id} value={bank.shortName}>
                  <div className="flex items-center">
                    <img
                      src={bank.logo}
                      alt="logoBank"
                      className="w-[80px] h-[30px]"
                    />{" "}
                    {bank.name}({bank.code})
                  </div>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            rules={[{ required: true, message: "Please input Account Number" }]}
            label="Account Number"
            name="BankNumber"
            labelAlign="left"
          >
            <Input type="number" placeholder="Input Account Number" />
          </Form.Item>

          <Form.Item
            rules={[
              { required: true, message: "Please input Identify Number" },
            ]}
            label="Identity Number"
            name="CardFront"
            labelAlign="left"
          >
            <Input placeholder="Input Identity Number " />
          </Form.Item>

          <Form.Item
            rules={[{ required: true, message: "Please input Issue Date" }]}
            label="Issue Date"
            name="IssueDate"
            labelAlign="left"
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            rules={[{ required: true, message: "Please input image ID card" }]}
            label="Image of ID Card"
            getValueFromEvent={normFile}
            labelAlign="left"
          >
            <Space>
              <Upload
                accept="image/png, image/jpeg"
                onChange={handleChange}
                beforeUpload={beforeUpload}
                action="https://learnconnectapitest.azurewebsites.net/api/Upload/image"
                listType="picture-card"
                maxCount={1}
              >
                Font of ID
              </Upload>
              <Upload
                accept="image/png, image/jpeg"
                onChange={handleChangeBackImg}
                beforeUpload={beforeUpload}
                action="https://learnconnectapitest.azurewebsites.net/api/Upload/image"
                listType="picture-card"
                maxCount={1}
              >
                Back of ID
              </Upload>
            </Space>
          </Form.Item>

          <Form.Item
            label="Major"
            name="major"
            rules={[{ required: true, message: "Please select a major!" }]}
            className="text-start"
            labelAlign="left"
          >
            <Select
              onChange={(value) => setSelectedMajor(value)}
              placeholder="Select major"
            >
              {major.map((major) => (
                <Option key={major.id} value={major.id}>
                  {major.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Specialization selection */}
          <Form.Item
            label="Specialization"
            name="specialization"
            rules={[
              { required: true, message: "Please select a specialization!" },
            ]}
            className="text-start"
            labelAlign="left"
          >
            <Select placeholder="Select specialization">
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
            name="reason"
            className=""
            labelAlign="left"
          >
            <Input placeholder="Input description" />
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
            label="Image of ID Document"
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
              Document
            </Upload>
          </Form.Item>
          <div className="flex justify-center">
            <button
              onClick={handleCancel}
              className="text-lg w-1/3 mb-3 mt-2 rounded-lg py-2 border border-[#309255] mx-5 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-white text-lg w-1/3 mb-3 mt-2 bg-[#309255] rounded-lg py-2 mx-5 hover:bg-[#309256d6]"
            >
              Send
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};
