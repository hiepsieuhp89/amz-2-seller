import BaseModal from "@/components/BaseModal/BaseModal";
import React from "react";
import {
    Table,
    Input,
    Select,
    Dropdown,
    Form,
    Button,
    DatePicker,
    Row,
    Col,
    Divider,
    FormProps,
    Empty,
    InputNumber,
} from "antd";
import Image from "next/image";
interface ActionProps {
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    title: string;
    isLoading?: boolean;
    handleActionSubmit: (e: any) => void;
    nameTitle?: string;
    contentQuestion?: string;
    nameButtonSubmit?: string;
    nameButtonClose?: string;
}

const ModalAction   = ({
    isModalOpen,
    setIsModalOpen,
    title,
    isLoading,
    handleActionSubmit,
    nameTitle,
    contentQuestion,
    nameButtonSubmit,
    nameButtonClose,
}: ActionProps) => {
    return (
        <BaseModal
            title={title}
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
        >
            <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: "full" }}>
                <div className="flex gap-2">
                    <p className="font-medium text-base">{nameTitle}</p>
                </div>
                <div className="px-6 pt-2 pb-6">{contentQuestion}</div>
                <div className="flex justify-end gap-2">             
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={handleActionSubmit}
                        className="!rounded-none"
                        danger
                    >
                        {nameButtonSubmit}
                    </Button>
                    <Button
                        type="default"
                        onClick={() => setIsModalOpen(false)}
                        className="!rounded-none"
                    >
                        {nameButtonClose}
                    </Button>
                </div>
            </Form.Item>
        </BaseModal>
    );
};
export default ModalAction;
