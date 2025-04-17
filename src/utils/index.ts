import _, { toNumber } from "lodash";
import { KeyboardEvent } from "react";
import dayjs from "dayjs";
import { numericRegex } from "@/regex";
import moment from "moment";
export const camelizeConvert = (obj: any) => {
  return _.transform(obj, (acc: any, value, key: any, target) => {
    const camelKey = _.isArray(target) ? key : _.camelCase(key);
    acc[camelKey] = _.isObject(value) ? camelizeConvert(value) : value;
  });
};

export const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
  const key = e.key;

  if (
    !numericRegex.test(key) &&
    key !== "Backspace" &&
    key !== "Delete" &&
    key !== "ArrowLeft" &&
    key !== "ArrowRight"
  ) {
    e.preventDefault();
  }
};

export function convertToCustomDateFormat(dateString: string): string {
  if (!dateString) {
    return "";
  }

  return dayjs(dateString).format("DD/MM/YYYY");
}

const getCurrentWeekRange = (): { startOfWeek: string; endOfWeek: string } => {
  const startOfWeek = moment().startOf("isoWeek").format("DD/MM/YYYY");
  const endOfWeek = moment().endOf("isoWeek").format("DD/MM/YYYY");
  return { startOfWeek, endOfWeek };
};

export const { startOfWeek, endOfWeek } = getCurrentWeekRange();
export const errorMessage = {
  dontAllSpaces: "Vui lòng không nhập toàn khoảng trắng",
  validateNumberData:'Validation error: Invalid military numbers data. Check total, absents, and presents.',
  noData:"Không có dữ liệu",
  dontSpaceError: "Không được chứa khoảng trắng và kí tự đặc biệt",
  validatePw:'Mật khẩu ít nhất 6 ký tự, bao gồm chữ in hoa, số và ký tự đặc biệt'
};

export const convertAbsentsToNumber = (absents: any): { [key: string]: number } => {
  if (!absents) return {};

  const convertedAbsents: { [key: string]: number } = {};
  for (const key in absents) {
    if (absents.hasOwnProperty(key)) {
      convertedAbsents[key] = Number(absents[key]) || 0; 
    }
  }

  return convertedAbsents;
};


export const characterLimit = 400;
export const view={
  detailPlan:'Xem chi tiết kế hoạch',
  editPlan:'Chỉnh sửa kế hoạch'
}

export const getStartWeek = (weekNumber: any): { startOfWeek: string, endOfWeek: string } => {
  if (!weekNumber ) {
    return { startOfWeek: '', endOfWeek: '' };
  }
  const startOfWeek = moment().week(weekNumber).startOf("isoWeek").format("DD/MM/YYYY");
  const endOfWeek = moment().week(weekNumber).endOf("isoWeek").format("DD/MM/YYYY");
  return { startOfWeek, endOfWeek };
};

export const currentWeek=moment().isoWeek()

export function convertDate(dateString: string): string {
  const date = new Date(dateString);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const day = date.getDate();
  const month = date.getMonth() + 1; 
  const year = date.getFullYear();
  return `${hours}:${minutes < 10 ? '0' + minutes : minutes}, ${day < 10 ? '0' + day : day} tháng ${month < 10 ? '0' + month : month} năm ${year}`;
}


export function getMonth(dateString: string): string {
  const date = new Date(dateString);
  const month = date.getMonth() + 1; 
  return `Tháng ${month < 10 ? '0' + month : month}`;
}

export function convertDateFormat(dateString: string): string {
  const date = new Date(dateString);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const day = date.getDate();
  const month = date.getMonth() + 1; 
  const year = date.getFullYear();
  return `${hours}:${minutes < 10 ? '0' + minutes : minutes} | ${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
}

export const onKeyPressEnter = (e:any) => {
  const key = e.key;
  if (   
    key === "Enter"
  ) {
    e.preventDefault();
  }
};

export const filterSort=(optionA:any,optionB:any)=>{
  const labelA=(optionA?.label??'').toLowerCase();
  const labelB=(optionB?.label??'').toLowerCase();
  return labelA.localeCompare(labelB);
}

export const formatNumber = (number: number | undefined | null): string => {
  if (number === undefined || number === null) {
    return '0';
  }
  
  // Kiểm tra xem number có phải là một số hợp lệ không
  const numValue = Number(number);
  if (isNaN(numValue)) {
    return '0';
  }
  
  // Format with 2 decimal places for non-integers
  let formatted = Number.isInteger(numValue) 
    ? numValue.toString() 
    : numValue.toFixed(2);
  
  // Split by decimal point
  const parts = formatted.split('.');
  
  // Add thousand separators to the integer part
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  // Join with period as decimal separator if there's a decimal part
  return parts.length > 1 ? parts.join('.') : parts[0];
};

/**
 * Formats a date string into various formats
 * @param dateString - The date string to format
 * @param format - The format type: 
 *   'date' - DD/MM/YYYY
 *   'datetime' - HH:mm DD/MM/YYYY (24-hour)
 *   'time' - HH:mm (24-hour)
 *   'datetime-full' - HH:mm DD/MM/YYYY (24-hour)
 *   'date-text' - DD MMMM YYYY
 *   'date-short' - DD-MM-YYYY
 * @param locale - Locale for formatting (default: 'vi-VN')
 * @returns Formatted date string
 */
export const formatDate = (dateString: string, format: 'date' | 'datetime' | 'time' | 'datetime-full' | 'date-text' | 'date-short' = 'date', locale: string = 'vi-VN'): string => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return '';
    }
    
    switch (format) {
      case 'date':
        return date.toLocaleDateString(locale, {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
      
      case 'datetime':
        return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')} ${date.toLocaleDateString(locale, {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })}`;
      
      case 'time':
        return date.toLocaleTimeString(locale, {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        });
      
      case 'datetime-full':
        return date.toLocaleString(locale, {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        });
      
      case 'date-text':
        return date.toLocaleDateString(locale, {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        });
      
      case 'date-short':
        return date.toLocaleDateString(locale, {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }).replace(/\//g, '-');
      
      default:
        return date.toLocaleDateString(locale);
    }
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};