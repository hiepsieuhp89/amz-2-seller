import React from "react";
import { Tooltip } from "antd"; // Thư viện Tooltip từ Ant Design (hoặc sử dụng tooltip khác nếu muốn)

interface InfoRowProps {
  label: string;
  value: any;
  className?: string;
  allUser?:any
}

export const InfoRowWithArray<InfoRowProps> = ({
  label,
  value,
  className = "",
  allUser
}) => {

  const fullNameAllUsers=allUser?.map((item:any) => item.fullname)?.join(', ');
  const values = value?.map((item: any) => item?.fullname);
  const displayValues = values?.length > 3 ? values.slice(0, 3) : values;
  const checkToolTip=value?.[0].fullname
  return (
    <div className={`flex gap-2 p-4 ${className}`}>
      <span>{label}:</span>
      <Tooltip
        title={checkToolTip==='all'?fullNameAllUsers:values?.join(', ')}
        color="#ffffff"
        overlayInnerStyle={{ color: "#000000", borderRadius: 0 }}
      >
        {displayValues?.map((item: any, index: number)=>{
          if (index < 3) { 
            return (
              <span className="font-medium cursor-pointer" key={index}>
                {item === 'all' ? 'Tất cả' : item}
                {index < Math.min(3, value?.length) - 1 && ", "}
              </span>
            );
          } else if (index === 3) { 
            return <span key={index}>... </span>;
          }
          
        })}
  

      </Tooltip>
    </div>
  );
};
