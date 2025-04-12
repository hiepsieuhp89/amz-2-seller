'use client';

import Captcha from '@/components/Captcha';
import { useUser } from '@/context/useUserContext';
import { setCookies } from '@/helper';
import { useRegister } from '@/hooks/authentication';
import { IRegister } from '@/interface/request/authentication';
import { Button, Divider, Form, Input, message, Checkbox, Modal } from 'antd';
import { FormProps } from 'antd/lib';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type FieldType = {
  username: string;
  email: string;
  phone: string;
  password: string;
  fullName: string;
  invitationCode: string;
  confirmPassword: string;
  shopName: string;
  shopAddress: string;
  agreement: boolean;
};

const SignUpForm = () => {
  const router = useRouter();
  const { mutateAsync, isPending } = useRegister();
  const { loginUser } = useUser()
  const [messageApi, contextHolder] = message.useMessage();
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [formValues, setFormValues] = useState<FieldType | null>(null);
  const [isTermsModalVisible, setIsTermsModalVisible] = useState(false);

  const handleCaptchaSuccess = async () => {
    setShowCaptcha(false);
    if (formValues) {
      try {
        const payload: IRegister = {
          username: formValues.username,
          email: formValues.email,
          phone: formValues.phone,
          password: formValues.password,
          fullName: formValues.fullName,
          invitationCode: formValues.invitationCode,
          shopName: formValues.shopName,
          shopAddress: formValues.shopAddress
        };
        const response = await mutateAsync(payload);
        loginUser(response?.data?.user, response?.data?.accessToken);
        messageApi.success('Đăng ký tài khoản thành công!');
        setCookies(response?.data?.accessToken);
        router.push('/seller/dashboard');
      } catch (error: any) {
        messageApi.error(error?.response?.data?.message || 'Có lỗi xảy ra khi đăng ký');
      }
    }
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values: FieldType) => {
    setFormValues(values);
    setShowCaptcha(true);
  };

  const showTermsModal = () => {
    setIsTermsModalVisible(true);
  };

  const handleTermsModalClose = () => {
    setIsTermsModalVisible(false);
  };

  return (
    <>
      {contextHolder}
      {!showCaptcha ? (
        <h1 className='text-[28px] font-medium'>
          Tạo tài khoản seller
        </h1>
      ) : (
        <Captcha
          onSuccess={handleCaptchaSuccess}
          onError={(message: string) => messageApi.error(message)}
          onBack={() => setShowCaptcha(false)}
        />
      )}
      <Form
        name="register_form"
        onFinish={onFinish}
        layout='vertical'
      >
        <Form.Item
          label={<strong>Tên tài khoản</strong>}
          name="username"
          className='!mb-4'
          rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={<strong>Email</strong>}
          className='!mb-3'
          name="email"
          rules={[
            { required: true, message: 'Vui lòng nhập email!' },
            { type: 'email', message: 'Vui lòng nhập email hợp lệ!' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={<strong>Số điện thoại</strong>}
          className='!mb-3'
          name="phone"
          rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={<strong>Họ và tên</strong>}
          className='!mb-3'
          name="fullName"
          rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={<strong>Mật khẩu</strong>}
          className='!mb-4'
          name="password"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
        >
          <Input.Password
            type="password"
            placeholder="Mật khẩu"
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label={<strong>Xác nhận mật khẩu</strong>}
          dependencies={['password']}
          className='!mb-4'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mật khẩu',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Mật khẩu mới bạn đã nhập không khớp!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label={<strong>Mã mời</strong>}
          name="invitationCode"
          className='!mb-4'
          rules={[{ required: true, message: 'Vui lòng nhập mã mời!' }]}
        >
          <Input />
        </Form.Item>
        <Divider className='!mb-3' />
        <Form.Item
          label={<strong>Tên cửa hàng</strong>}
          name="shopName"
          className='!mb-4'
          rules={[{ required: true, message: 'Vui lòng nhập tên cửa hàng!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<strong>Địa chỉ cửa hàng</strong>}
          name="shopAddress"
          className='!mb-4'
          rules={[{ required: true, message: 'Vui lòng địa chỉ cửa hàng!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="agreement"
          valuePropName="checked"
          className='!mb-4'
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('Vui lòng đồng ý với điều khoản và điều kiện')),
            },
          ]}
        >
          <Checkbox>
            Tôi đã đọc và đồng ý với <a onClick={showTermsModal}>điều khoản và điều kiện</a>
          </Checkbox>
        </Form.Item>
        <Form.Item className='!mb-2'>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button w-full  !font-medium !h-[32px]"
            loading={isPending}
          >
            Tạo tài khoản
          </Button>
        </Form.Item>
        <div className="flex justify-center items-center pb-4 ">
          <span className="border-t border-gray-300 w-1/6 mr-1"></span>
          <span className="text-[#767676] text-[11px]">Bạn đã có tài khoản Amazon Seller?</span>
          <span className="border-t border-gray-300 w-1/6 ml-1"></span>
        </div>

        <Button className='login_register !w-full !h-[28px]' onClick={() => router.push('/sign-in')}>
          Đăng nhập
        </Button>

      </Form>

      <Modal
        title={<div className="flex items-center"><img src="/images/icon.png" alt="Amazon Logo" className="h-6 mr-2" style={{objectFit: 'contain'}} />Điều khoản và Điều kiện</div>}
        open={isTermsModalVisible}
        onCancel={handleTermsModalClose}
        footer={[
          <Button key="close" type="primary" onClick={handleTermsModalClose}>
            Đóng
          </Button>
        ]}
        width={800}
      >
        <div className="terms-content" style={{ maxHeight: '500px', overflow: 'auto', padding: '0 10px' }}>
          <div className="mb-4 pb-2 border-b border-gray-200">
            <h3 className="text-xl font-bold mb-1">Điều khoản sử dụng dịch vụ Amazon Seller</h3>
            <p className="text-gray-500 text-sm">Cập nhật lần cuối: 15/11/2023</p>
          </div>
          
          <div className="mb-4">
            <h4 className="text-lg font-semibold text-[#232f3e] mb-2">1. Giới thiệu</h4>
            <p className="mb-2">Chào mừng bạn đến với Amazon Seller. Các điều khoản này là thỏa thuận giữa bạn và Amazon ("chúng tôi", "của chúng tôi"). Bằng cách đăng ký và sử dụng dịch vụ của chúng tôi, bạn đồng ý tuân thủ và chịu ràng buộc bởi các điều khoản và điều kiện được nêu trong thỏa thuận này.</p>
            <p className="mb-2">Thỏa thuận này áp dụng cho việc sử dụng trang web Amazon.vn và tất cả các dịch vụ liên quan đến việc bán hàng trên nền tảng Amazon.</p>
          </div>
          
          <div className="mb-4">
            <h4 className="text-lg font-semibold text-[#232f3e] mb-2">2. Tài khoản người bán</h4>
            <p className="mb-2">Khi tạo tài khoản người bán, bạn phải:</p>
            <ul className="list-disc pl-6 mb-2">
              <li>Cung cấp thông tin chính xác, đầy đủ và cập nhật</li>
              <li>Duy trì tính bảo mật của thông tin đăng nhập tài khoản</li>
              <li>Chịu trách nhiệm về tất cả hoạt động diễn ra dưới tài khoản của bạn</li>
              <li>Thông báo ngay cho Amazon nếu bạn phát hiện bất kỳ hoạt động trái phép nào</li>
            </ul>
            <p>Mỗi người bán chỉ được phép duy trì một tài khoản, trừ khi được Amazon cho phép rõ ràng.</p>
          </div>
          
          <div className="mb-4">
            <h4 className="text-lg font-semibold text-[#232f3e] mb-2">3. Sản phẩm và danh sách</h4>
            <p className="mb-2">Bạn chỉ được phép bán những sản phẩm:</p>
            <ul className="list-disc pl-6 mb-2">
              <li>Hợp pháp theo luật pháp Việt Nam và các quy định quốc tế</li>
              <li>Không vi phạm quyền sở hữu trí tuệ hoặc bản quyền</li>
              <li>Tuân thủ các chính sách sản phẩm của Amazon</li>
              <li>Có nguồn gốc xuất xứ rõ ràng và có thể xác minh</li>
            </ul>
            <p className="mb-2">Amazon có quyền từ chối, xóa hoặc điều chỉnh bất kỳ danh sách nào không tuân thủ chính sách của chúng tôi hoặc gây nguy hiểm cho trải nghiệm mua sắm của khách hàng.</p>
            <p>Việc đăng tải hình ảnh và nội dung sản phẩm phải tuân thủ các hướng dẫn của Amazon và không được chứa thông tin sai lệch.</p>
          </div>
          
          <div className="mb-4">
            <h4 className="text-lg font-semibold text-[#232f3e] mb-2">4. Phí và thanh toán</h4>
            <p className="mb-2">Các khoản phí áp dụng cho việc sử dụng dịch vụ của chúng tôi bao gồm:</p>
            <ul className="list-disc pl-6 mb-2">
              <li>Phí đăng ký tài khoản: 0 VNĐ</li>
              <li>Phí dịch vụ bán hàng: 5-15% tùy vào danh mục sản phẩm</li>
              <li>Phí lưu kho FBA (nếu sử dụng): Theo biểu phí hiện hành</li>
              <li>Phí quảng cáo (tùy chọn): Theo chiến dịch</li>
            </ul>
            <p className="mb-2">Thanh toán cho người bán được thực hiện theo chu kỳ 14 ngày sau khi trừ các khoản phí áp dụng. Chúng tôi có quyền giữ lại các khoản thanh toán trong trường hợp có tranh chấp hoặc vi phạm chính sách.</p>
            <p>Biểu phí đầy đủ có thể được tìm thấy trong Trung tâm Người bán sau khi đăng nhập.</p>
          </div>
          
          <div className="mb-4">
            <h4 className="text-lg font-semibold text-[#232f3e] mb-2">5. Quyền riêng tư và bảo mật dữ liệu</h4>
            <p className="mb-2">Việc thu thập và sử dụng thông tin cá nhân của bạn tuân theo Chính sách quyền riêng tư của Amazon. Bằng việc sử dụng dịch vụ của chúng tôi, bạn đồng ý rằng Amazon có thể:</p>
            <ul className="list-disc pl-6 mb-2">
              <li>Thu thập, lưu trữ và xử lý thông tin cá nhân và dữ liệu kinh doanh</li>
              <li>Sử dụng thông tin để cải thiện dịch vụ và trải nghiệm người dùng</li>
              <li>Chia sẻ thông tin với các đối tác tin cậy và cơ quan chức năng khi cần thiết</li>
              <li>Bảo vệ dữ liệu theo các tiêu chuẩn bảo mật cao nhất</li>
            </ul>
            <p>Bạn có trách nhiệm bảo vệ thông tin của khách hàng mà bạn tiếp cận được thông qua nền tảng và tuân thủ các quy định về bảo vệ dữ liệu hiện hành.</p>
          </div>
          
          <div className="mb-4">
            <h4 className="text-lg font-semibold text-[#232f3e] mb-2">6. Quyền sở hữu trí tuệ</h4>
            <p className="mb-2">Tất cả nội dung trên nền tảng Amazon, bao gồm văn bản, đồ họa, logo, biểu tượng, hình ảnh, âm thanh, video và phần mềm, đều thuộc sở hữu của Amazon hoặc các bên cấp phép và được bảo vệ bởi luật sở hữu trí tuệ.</p>
            <p className="mb-2">Bạn được cấp quyền hạn chế, không độc quyền để sử dụng nền tảng cho mục đích bán hàng. Việc sử dụng không được phép bao gồm:</p>
            <ul className="list-disc pl-6 mb-2">
              <li>Sao chép, sửa đổi hoặc tạo các sản phẩm phái sinh</li>
              <li>Sử dụng nội dung cho mục đích thương mại ngoài việc bán hàng trên Amazon</li>
              <li>Xóa bất kỳ thông báo bản quyền hoặc thương hiệu nào</li>
              <li>Đảo ngược, dịch ngược hoặc cố gắng trích xuất mã nguồn</li>
            </ul>
          </div>
          
          <div className="mb-4">
            <h4 className="text-lg font-semibold text-[#232f3e] mb-2">7. Đình chỉ và chấm dứt</h4>
            <p className="mb-2">Amazon có thể đình chỉ hoặc chấm dứt quyền truy cập của bạn vào dịch vụ người bán ngay lập tức và không cần thông báo trong các trường hợp sau:</p>
            <ul className="list-disc pl-6 mb-2">
              <li>Vi phạm các điều khoản và điều kiện này</li>
              <li>Cung cấp thông tin sai lệch hoặc gian lận</li>
              <li>Liên tục nhận đánh giá tiêu cực từ khách hàng</li>
              <li>Bán sản phẩm bị cấm hoặc hàng giả</li>
              <li>Tham gia vào các hoạt động có thể gây hại cho Amazon hoặc khách hàng</li>
            </ul>
            <p>Sau khi chấm dứt, bạn sẽ không còn quyền truy cập vào tài khoản người bán và các dịch vụ liên quan. Amazon sẽ xử lý bất kỳ khoản thanh toán còn lại sau khi trừ các khoản phí, bồi thường và tiền phạt hiện hành.</p>
          </div>
          
          <div className="mb-4">
            <h4 className="text-lg font-semibold text-[#232f3e] mb-2">8. Thay đổi điều khoản</h4>
            <p className="mb-2">Amazon có thể sửa đổi các điều khoản này vào bất kỳ lúc nào bằng cách:</p>
            <ul className="list-disc pl-6 mb-2">
              <li>Đăng các điều khoản đã sửa đổi trên Trung tâm Người bán</li>
              <li>Gửi thông báo qua email đã đăng ký của bạn</li>
              <li>Thông báo trong bảng điều khiển tài khoản người bán</li>
            </ul>
            <p>Việc bạn tiếp tục sử dụng dịch vụ sau khi đăng các thay đổi đó đồng nghĩa với việc bạn chấp nhận các điều khoản đã sửa đổi. Nếu không đồng ý với các điều khoản mới, bạn phải ngừng sử dụng dịch vụ.</p>
          </div>
          
          <div className="mb-4">
            <h4 className="text-lg font-semibold text-[#232f3e] mb-2">9. Luật áp dụng và giải quyết tranh chấp</h4>
            <p className="mb-2">Thỏa thuận này được điều chỉnh và giải thích theo luật pháp Việt Nam. Bất kỳ tranh chấp nào phát sinh từ hoặc liên quan đến thỏa thuận này sẽ được giải quyết thông qua thương lượng thiện chí.</p>
            <p className="mb-2">Nếu không thể giải quyết thông qua thương lượng, tranh chấp sẽ được đưa ra Trung tâm Trọng tài Quốc tế Việt Nam (VIAC) để giải quyết theo quy tắc của trung tâm. Phán quyết trọng tài sẽ là quyết định cuối cùng và ràng buộc đối với cả hai bên.</p>
          </div>
          
          <div className="mb-4">
            <h4 className="text-lg font-semibold text-[#232f3e] mb-2">10. Thông tin liên hệ</h4>
            <p className="mb-2">Nếu bạn có bất kỳ câu hỏi nào về các điều khoản này, vui lòng liên hệ với chúng tôi qua:</p>
            <ul className="list-disc pl-6 mb-2">
              <li>Email: seller-support@amazon.vn</li>
              <li>Điện thoại: 1800-88-88-20</li>
              <li>Trung tâm Hỗ trợ Người bán trên trang web Amazon Seller</li>
            </ul>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200 text-sm text-gray-500">
            <p>© 1996-2023, Amazon.com, Inc. hoặc các công ty liên kết. Đã đăng ký Bản quyền.</p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SignUpForm;