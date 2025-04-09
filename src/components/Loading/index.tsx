import { Spin } from 'antd';

const Loading = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center min-w-screen bg-white min-h-screen">
      <Spin size="small" />
    </div>
  );
};
export default Loading;
