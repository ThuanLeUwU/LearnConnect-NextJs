"use client";
import { Modal, Form } from "antd";
import { useForm } from "antd/es/form/Form";
// import { useRouter } from "next/router";
import { useState } from "react";
import { useRouter } from "next/navigation";


interface IProps {
  onCancel: () => void;
  visible: boolean;
  setVisible: (e: boolean) => void;
  isEdit?: boolean;

  // setSuccess: (e: boolean) => void;
}

export const Payment = ({ onCancel, visible, isEdit }: IProps) => {
  const [show, setShow] = useState(false);

  const [form] = Form.useForm();
//   const router = useRouter();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
        handleClose();
        // router.push('/my-course')
  }

  return (
    <Modal
      className="w-2/3 min-h-[300px]"
      // title={isEdit ? 'Edit PRoduct' : 'Create Product'}
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

      </Form>
    </Modal>
  );
};
