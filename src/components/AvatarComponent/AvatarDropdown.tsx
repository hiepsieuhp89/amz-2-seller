import { MenuProps, Dropdown, Form, Button } from "antd";
import React, { useEffect, useState } from "react";
import cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const AvatarDropdown = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isLogout, setIsLogout] = useState<boolean>(false);

  const [username, setUsername] = useState(null);

  const [form] = Form.useForm();



  const [role, setRole] = useState(null);
  const [department, setDepartment] = useState(null);

  const logout = () => {
    queryClient.clear();
    cookies.remove("accessToken");
    cookies.remove("refreshToken");
    localStorage.clear();
    localStorage.setItem("logout-event", "logout" + Math.random());
    router.push("/sign-in");
  };

  useEffect(() => {
    const handleStorageChange = (event: any) => {
      if (event.key === "logout-event") {
        router.push("/sign-in");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleClickLogout = () => {
    queryClient.clear();
    cookies.remove("accessToken");
    localStorage.clear();
    router.push("/sign-in");
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <a className="cursor-pointer" >
          Thông tin tài khoản
        </a>
      ),
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: (
        <a className="cursor-pointer" >
          Đổi mật khẩu
        </a>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: (
        <a
          className="cursor-pointer !text-red-error font-semibold"
          onClick={handleClickLogout}
        >
          Đăng xuất
        </a>
      ),
      key: "2",
    },
  ];

  return (
    <>
      <Dropdown
        menu={{
          items,
        }}
        trigger={["click"]}
        placement="bottomRight"
      >
        <div className="flex items-center gap-1 cursor-pointer">
          <Image
            src={'/imgs/avatarDefault.png'}
            width={45}
            height={45}
            className="rounded-full w-[45px] h-[45px] object-cover cursor-pointer"
            alt="avatar"
          />
          <span>{username}</span>
          <FontAwesomeIcon icon={faAngleDown} />
        </div>
      </Dropdown>

    </>
  );
};

export default AvatarDropdown;
