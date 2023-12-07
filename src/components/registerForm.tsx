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
  Tabs,
} from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { Select } from "antd";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ".././app/./globals.css";
import { useRouter } from "next/navigation";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";
import FormItem from "antd/es/form/FormItem";

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

  const [fileList, setFileList] = useState([]);
  const [fileList1, setFileList1] = useState([]);

  const [fileList2, setFileList2] = useState([]);

  const { TabPane } = Tabs;
  const [currentTab, setCurrentTab] = useState("1");

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
    setFileList(info.fileList);
  };
  const handleChangeBackImg = (info: any) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      setBackData(info.file.originFileObj);
      getBase64(info.file.originFileObj, (url) => {
        setBackImage(url);
      });
    }
    setFileList1(info.fileList);
  };

  const handleChangeDocumentData = (info: any) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      setDocumentData(info.file.originFileObj);
      getBase64(info.file.originFileObj, (url) => {
        setDocumentImage(url);
      });
    }
    setFileList2(info.fileList);
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
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      toast.error("Image must smaller than 5MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleTabChange = (key: string) => {
    setCurrentTab(key);
  };

  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    const {
      description,
      CardFront,
      IssueDate,
      BankNumber,
      BankName,
      major,
      specialization,
      reason,
    } = values;
    formData.append("identityCardFrontDescription", CardFront);
    formData.append("identityCardBackDescription", IssueDate);
    if (identifyData !== undefined) {
      formData.append("identityCardFrontUrl", identifyData);
    }
    if (BackData) {
      formData.append("identityCardBackUrl", BackData);
    }
    formData.append("major", major);
    formData.append("specializationId", specialization);
    // console.log("3213123", specialization);
    formData.append("reason", reason);
    formData.append("descriptionDocument", "null");
    if (DocumentData) {
      formData.append("verificationDocument", DocumentData);
    }
    try {
      const url = `https://learnconnectapitest.azurewebsites.net/api/mentor/become-a-mentor?userId=${id}&specializationId=${specialization}&description=${description}&reason=${reason}&accountNumber=${BankNumber}&bankName=${BankName}`;
      await axios
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          toast.success("Form submitted successful");
          form.resetFields();
          router.push(`/`);
        });
    } catch (error) {
      toast.error(error.response.data);
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
        // console.log("Bank Name", response.data);
      } catch (error) {
        console.error("Error fetching banks:", error);
      }
    };

    fetchBanks();
  }, []);

  const uploadButtonContent =
    fileList.length > 0 ? "Choose Other Image" : "Front of ID";

  const uploadButtonBackContent =
    fileList1.length > 0 ? "Choose Other Image" : "Back of ID";

  const uploadButtonDocumentContent =
    fileList2.length > 0 ? "Choose Other Image" : "Document";

  return (
    <div className="">
      <div className="container border border-[#309255] my-3 rounded-lg mt-3">
        <Form
          autoComplete="off"
          form={form}
          labelCol={{ span: 4, offset: 3 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          // onFinish={handleSubmit}
          className="mx-[30px] pt-3"
        >
          <Tabs
            activeKey={currentTab}
            onChange={handleTabChange}
            className="min-h-[700px]"
          >
            <TabPane tab="Identity Verification" key="1">
              <Form
                autoComplete="off"
                form={form}
                labelCol={{ span: 4, offset: 3 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                // onFinish={handleSubmit}
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
                  rules={[
                    { required: true, message: "Please input Description" },
                  ]}
                  label="Introduction"
                  name="description"
                  className=""
                  labelAlign="left"
                >
                  <TextArea
                    placeholder="Input Introduction"
                    autoSize={{ minRows: 5, maxRows: 6 }}
                  />
                </Form.Item>
                <Form.Item
                  rules={[
                    { required: true, message: "Please input Identify Number" },
                    {
                      pattern: /^[0-9]{12,12}$/,
                      message: "Identity Number must be exactly 12 digits",
                    },
                  ]}
                  label="Identity Number"
                  name="CardFront"
                  labelAlign="left"
                >
                  <Input type="number" placeholder="Input Identity Number" />
                </Form.Item>

                <Form.Item
                  rules={[
                    { required: true, message: "Please input Issue Date" },
                  ]}
                  label="Issue Date"
                  name="IssueDate"
                  labelAlign="left"
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    disabledDate={(current) =>
                      current && current > moment().endOf("day")
                    }
                  />
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please input image front ID card",
                    },
                  ]}
                  label="Image front of ID Card"
                  getValueFromEvent={normFile}
                  labelAlign="left"
                  name="FontCardImage"
                  className="w-full"
                >
                  <Upload
                    accept="image/png, image/jpeg"
                    onChange={handleChange}
                    beforeUpload={beforeUpload}
                    action="https://learnconnectapitest.azurewebsites.net/api/Upload/image"
                    listType="picture-card"
                    maxCount={1}
                  >
                    {uploadButtonContent}
                  </Upload>
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please input image back ID card",
                    },
                  ]}
                  label="Image back of ID Card"
                  getValueFromEvent={normFile}
                  labelAlign="left"
                  name="CardBack"
                >
                  <Upload
                    accept="image/png, image/jpeg"
                    onChange={handleChangeBackImg}
                    beforeUpload={beforeUpload}
                    action="https://learnconnectapitest.azurewebsites.net/api/Upload/image"
                    listType="picture-card"
                    maxCount={1}
                  >
                    {uploadButtonBackContent}
                  </Upload>
                </Form.Item>
              </Form>
            </TabPane>
            <TabPane tab="Payment Information" key="2">
              <Form
                autoComplete="off"
                form={form}
                labelCol={{ span: 4, offset: 3 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                // onFinish={handleSubmit}
                className="mx-[30px] pt-3"
              >
                <Form.Item
                  name="BankName"
                  label="Email Address(PayPal)"
                  rules={[
                    {
                      required: true,
                      message: "Please Input Email Address(PayPal)",
                    },
                  ]}
                  labelAlign="left"
                >
                  {/* <Select placeholder="Select a bank">
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
                </Select> */}
                  <Input
                    type="email"
                    placeholder="Input Email Address(PayPal)"
                  />
                </Form.Item>
                <Form.Item
                  rules={[
                    { required: true, message: "Please input PayPal ID" },
                    {
                      pattern: /^[0-9]{13,16}$/,
                      message:
                        "PayPal ID must be a numeric value between 13 and 16 digits",
                    },
                  ]}
                  label="PayPal ID"
                  name="BankNumber"
                  labelAlign="left"
                >
                  <Input type="number" placeholder="Input PayPal ID" />
                </Form.Item>
              </Form>
            </TabPane>
            <TabPane tab="Choose Your Specialization" key="3">
              <Form
                autoComplete="off"
                form={form}
                labelCol={{ span: 4, offset: 3 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                // onFinish={handleSubmit}
                className="mx-[30px] pt-3"
              >
                <Form.Item
                  label="Major"
                  name="major"
                  rules={[
                    { required: true, message: "Please select a major!" },
                  ]}
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
                <Form.Item
                  label="Specialization"
                  name="specialization"
                  rules={[
                    {
                      required: true,
                      message: "Please select a specialization!",
                    },
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
                  rules={[
                    { required: true, message: "Please input Experience" },
                  ]}
                  label="Experience"
                  name="reason"
                  className=""
                  labelAlign="left"
                >
                  <TextArea
                    placeholder="Input your Experience"
                    autoSize={{ minRows: 5, maxRows: 6 }}
                  />
                </Form.Item>
                <Form.Item
                  label="Image of ID Document"
                  name="alo"
                  getValueFromEvent={normFile}
                  rules={[
                    {
                      required: true,
                      message: "Please input Image of ID Document",
                    },
                  ]}
                  labelAlign="left"
                >
                  <Upload
                    accept="image/png, image/jpeg"
                    onChange={handleChangeDocumentData}
                    beforeUpload={beforeUpload}
                    action="https://learnconnectapitest.azurewebsites.net/api/Upload/image"
                    listType="picture-card"
                    maxCount={1}
                  >
                    {uploadButtonDocumentContent}
                  </Upload>
                </Form.Item>
              </Form>
            </TabPane>
          </Tabs>

          <div className="flex justify-center py-2">
            {currentTab !== "1" && (
              <Button
                onClick={() =>
                  handleTabChange((parseInt(currentTab) - 1).toString())
                }
                style={{
                  border: "2px solid #E0E0E0",
                  color: "black",
                }}
                className="bg-white min-w-[60px] text-black border  hover:bg-gray-200 hover:text-black transition duration-300 px-2 py-1 mx-5"
              >
                Previous
              </Button>
            )}
            {currentTab !== "3" && (
              <Button
                onClick={() =>
                  handleTabChange((parseInt(currentTab) + 1).toString())
                }
                style={{
                  border: "2px solid #4caf50 ",
                  color: "#fff",
                }}
                className="hover:bg-[#67b46a] border border-[#4caf50] bg-[#4caf50] text-white transition duration-300 px-2 py-1 mx-5"
              >
                Next
              </Button>
            )}
            {currentTab === "3" && (
              <FormItem>
                {/* <Button
                  onClick={handleCancel}
                  style={{
                    border: "2px solid #E0E0E0",
                    color: "black",
                  }}
                  className="bg-white min-w-[60px] text-black border  hover:bg-gray-200 hover:text-black transition duration-300 px-2 py-1 mx-5"
                >
                  Cancel
                </Button> */}
                {/* <button
                  type="submit"
                  className="text-white text-lg w-1/3 mb-3 mt-2 bg-[#309255] rounded-lg py-2 mx-5 hover:bg-[#309256d6]"
                >
                  Send
                </button> */}
                <Button
                  onClick={() => {
                    const formValues = form.getFieldsValue();
                    const requiredFields = ["CardFront", "IssueDate"];
                    const isFormValid = requiredFields.every(
                      (field) =>
                        formValues[field] !== undefined &&
                        formValues[field] !== null &&
                        formValues[field] !== ""
                    );

                    if (isFormValid) {
                      handleSubmit(formValues);
                    } else {
                      toast.info("Please fill in all required fields.");
                    }
                  }}
                  // htmlType="submit"
                  style={{
                    border: "2px solid #4caf50",
                    color: "#fff",
                  }}
                  className="hover:bg-[#67b46a] border border-[#4caf50] bg-[#4caf50] text-white transition duration-300 px-2 py-1 mx-5"
                >
                  Submit
                </Button>
              </FormItem>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};
