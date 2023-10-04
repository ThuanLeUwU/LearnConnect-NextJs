"use client";
import { Modal, Form } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";

interface IProps {
  onCancel: () => void;
  visible: boolean;
  setVisible: (e: boolean) => void;
  isEdit?: boolean;

  // setSuccess: (e: boolean) => void;
}

export const CreateCourse = ({ onCancel, visible, isEdit }: IProps) => {
  const [show, setShow] = useState(false);

  const [form] = Form.useForm();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
        handleClose();
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
