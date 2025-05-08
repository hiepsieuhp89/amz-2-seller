'use client';

import { useUser } from '@/context/useUserContext';
import { useUpdateUser } from '@/hooks/authentication';
import { useWindowSize } from '@/hooks/useWindowSize';
import type { MenuProps } from 'antd';
import { Drawer, Dropdown, Form, Input, Modal, message } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaBars, FaGlobe, FaHeadset, FaLock } from 'react-icons/fa';
import { useLayout } from '../LayoutProvider';

declare global {
  interface Window {
    openChat?: () => void
  }
}

export default function LayoutHeaderCommon() {
  const router = useRouter();
  const [language, setLanguage] = useState('vi'); // Default language: Vietnamese
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [form] = Form.useForm();
  const { width } = useWindowSize();
  const isMobile = width ? width < 768 : false;
  const { toggleSidebar, isSidebarOpen } = useLayout();
  const { user, profile, logoutUser } = useUser();
  const { mutate: updateUser, isPending } = useUpdateUser();

  const languages = [
    { code: 'vi', name: 'Tiếng Việt' },
    { code: 'en', name: 'English' },
    { code: 'cn', name: '中文' },
  ];

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    // Here you would implement your language change logic
    // For example: i18n.changeLanguage(langCode)
  };

  const openCustomerSupport = () => {
    // Implement customer support functionality, e.g., open chat or show contact info
    if (window.openChat) {
      window.openChat();
    } else {
      console.error('Chat function not available');
    }
  };

  const handleClickLogout = () => {
    setMobileMenuOpen(false);
    logoutUser();
  };

  const handleChangePassword = (values: { oldFedexPassword: string; fedexPassword: string }) => {
    if (!profile?.data?.fedexPassword) {
      // If user doesn't have a withdrawal password yet, allow setting it without verification
      updateUser(
        { fedexPassword: values.fedexPassword },
        {
          onSuccess: () => {
            message.success("Đặt mật khẩu giao dịch thành công");
            setIsPasswordModalOpen(false);
            form.resetFields();
          },
          onError: (error) => {
            message.error(error.message || "Đặt mật khẩu thất bại");
          },
        }
      );
      return;
    }

    if (values.oldFedexPassword !== profile?.data?.fedexPassword) {
      message.error("Mật khẩu giao dịch cũ không chính xác");
      return;
    }

    updateUser(
      { fedexPassword: values.fedexPassword },
      {
        onSuccess: () => {
          message.success("Đổi mật khẩu giao dịch thành công");
          setIsPasswordModalOpen(false);
          form.resetFields();
        },
        onError: (error) => {
          message.error(error.message || "Đổi mật khẩu thất bại");
        },
      }
    );
  };

  const handleOpenPasswordModal = () => {
    setIsPasswordModalOpen(true);
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  const languageItems: MenuProps['items'] = languages.map((lang) => ({
    key: lang.code,
    label: (
      <div className="flex items-center gap-2 py-1">
        <span>{lang.name}</span>
      </div>
    ),
    onClick: () => handleLanguageChange(lang.code),
    className: language === lang.code ? 'bg-gray-100' : '',
  }));

  const profileItems: MenuProps['items'] = [
    {
      key: "1",
      label: "Đổi mật khẩu giao dịch",
      onClick: handleOpenPasswordModal,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "Đăng xuất",
      onClick: handleClickLogout,
    },
  ];

  useEffect(() => {
    const handleRoleChange = (event: StorageEvent) => {
      if (event.key === 'role') {
        if (event.newValue === 'GA') {
          router.push('ga/plan_week')
        }
        if (event.newValue === 'CS') {
          router.push('/cs/manage_document')
        }
        if (event.newValue === 'ADMIN') {
          router.push('/admin/user')
        }
      }
    };
    
    const handleDepartmentChange = (event: StorageEvent) => {
      if (event.key === 'department') {
        if (event.newValue === 'COMBAT') {
          router.push('combat/plan_week')
        }
        if (event.newValue === 'TRAINING') {
          router.push('traning/plan_week')
        }
        if (event.newValue === 'TECH') {
          router.push('tech/plan_week')
        }
        if (event.newValue === 'CONTROL') {
          router.push('control/plan_week')
        }
      }
    };

    window.addEventListener('storage', handleRoleChange);
    window.addEventListener('storage', handleDepartmentChange);

    return () => {
      window.removeEventListener('storage', handleRoleChange);
      window.removeEventListener('storage', handleDepartmentChange);
    };
  }, [router]);

  const MobileMenu = () => (
    <Drawer
      title="Menu"
      placement="right"
      onClose={() => setMobileMenuOpen(false)}
      open={mobileMenuOpen}
      headerStyle={{ background: '#4D148C', color: 'white' }}
      bodyStyle={{ padding: 0 }}
      width={300}
    >
      <div className="flex flex-col p-4">
        {/* Shop Info Section */}
        <div className="bg-purple-100 p-4 rounded-lg mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="font-semibold text-purple-900">{profile?.data?.shopName || "Cửa hàng chưa có tên"}</div>
            {profile?.data?.shopStatus === "ACTIVE" && (
              <div className="h-5 w-5 relative">
                <Image
                  draggable={false}
                  quality={100}
                  height={50}
                  width={50}
                  className="object-cover"
                  src={"/images/tick-icon.png"} 
                  alt="verified" 
                />
              </div>
            )}
          </div>
          <div className="text-sm text-gray-600 mb-2">{profile?.data?.email}</div>
          <div className="text-xs bg-purple-200 p-2 rounded flex justify-between items-center">
            <span>Trạng thái: </span>
            <span className="font-medium">{profile?.data?.shopStatus === "ACTIVE" ? "Đã xác thực" : "Chưa xác thực"}</span>
          </div>
        </div>
        
        <button 
          onClick={openCustomerSupport}
          className="flex items-center gap-3 text-gray-800 hover:text-purple-800 py-3 border-b border-gray-200"
        >
          <FaHeadset size={18} />
          <span>Liên hệ CSKH</span>
        </button>
        
        {/* Password Change Option */}
        <button 
          onClick={handleOpenPasswordModal}
          className="flex items-center gap-3 text-gray-800 hover:text-purple-800 py-3 border-b border-gray-200"
        >
          <FaLock size={18} />
          <span>{profile?.data?.fedexPassword ? "Đổi mật khẩu giao dịch" : "Tạo mật khẩu giao dịch"}</span>
        </button>
        
        <div className="py-3 border-b border-gray-200">
          <div className="mb-2 text-gray-600 text-sm">Ngôn ngữ</div>
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`flex items-center gap-2 py-2 pl-2 w-full text-left rounded ${
                language === lang.code ? 'bg-purple-100 text-purple-800' : 'text-gray-800'
              }`}
            >
              <span>{lang.name}</span>
              {language === lang.code && <span className="ml-auto">✓</span>}
            </button>
          ))}
        </div>
        
        <button 
          onClick={handleClickLogout}
          className="flex items-center gap-3 text-red-600 hover:text-red-800 py-3 mt-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z" clipRule="evenodd" />
          </svg>
          <span>Đăng xuất</span>
        </button>
      </div>
    </Drawer>
  );

  // Handle sidebar toggle on mobile - no longer needed as we removed the sidebar
  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <header className="bg-[#4D148C] text-white px-2 sm:px-4 py-3 flex justify-between items-center fixed top-0 left-0 w-full z-10 shadow-md">
        <div className="flex items-center">
          <div className={`relative h-8 ml-1 sm:ml-4 top-1/2`}>
            <Image
              quality={100}
              draggable={false}
              src="/images/fedex.png"
              alt="logo"
              width={100}
              height={100}
              className='h-full w-full object-contain'
            />
          </div>
        </div>
        
        {!isMobile ? (
          <div className="flex items-center">
            <div className="ml-8 flex items-center gap-4 pr-6">
              {/* Customer Support Icon */}
              <button 
                onClick={openCustomerSupport}
                className="text-white hover:text-gray-200 transition-colors"
                title="Liên hệ CSKH"
              >
                <FaHeadset size={22} />
              </button>
              
              {/* Language Switcher */}
              <Dropdown 
                menu={{ items: languageItems }} 
                placement="bottomRight" 
                trigger={['click']}
                onOpenChange={(open) => setDropdownOpen(open)}
                open={dropdownOpen}
                overlayClassName="w-48"
              >
                <button 
                  className="flex items-center gap-2 hover:text-gray-200 transition-colors"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <FaGlobe size={18} />
                  <span className="text-xs">{language.toUpperCase()}</span>
                </button>
              </Dropdown>
              
              {/* Desktop dropdown with profile options */}
              <Dropdown 
                menu={{ items: profileItems }} 
                placement="bottomRight" 
                trigger={['click']}
              >
                <div className="flex items-center gap-2 cursor-pointer">
                  <div className="w-9 h-9 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                    <span className="text-xl font-bold">
                      {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
                    </span>
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-sm font-medium">{user?.username}</div>
                    <div className="text-xs opacity-80">{user?.role === "admin" ? "Admin" : "Seller"}</div>
                  </div>
                </div>
              </Dropdown>
            </div>
          </div>
        ) : (
          <div className="flex items-center">
            <button
              onClick={handleMobileMenuToggle}
              className="p-2 hover:bg-purple-700 rounded-full transition-colors"
              aria-label="Open menu"
            >
              <FaBars size={20} />
            </button>
            <MobileMenu />
          </div>
        )}
      </header>

      {/* Password Change Modal */}
      <Modal
        title={profile?.data?.fedexPassword ? "Đổi mật khẩu giao dịch" : "Đặt mật khẩu giao dịch"}
        open={isPasswordModalOpen}
        onCancel={() => setIsPasswordModalOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleChangePassword}
          layout="vertical"
        >
          {profile?.data?.fedexPassword && (
            <Form.Item
              label="Mật khẩu giao dịch hiện tại"
              name="oldFedexPassword"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu giao dịch hiện tại" },
              ]}
            >
              <Input.Password />
            </Form.Item>
          )}

          <Form.Item
            label="Mật khẩu giao dịch mới"
            name="fedexPassword"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu giao dịch mới" },
              { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || !profile?.data?.fedexPassword || getFieldValue('oldFedexPassword') !== value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Mật khẩu mới không được trùng với mật khẩu cũ'))
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
              disabled={isPending}
            >
              {isPending ? "Đang xử lý..." : "Xác nhận"}
            </button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
