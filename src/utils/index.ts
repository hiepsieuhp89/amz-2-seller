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

export const formatNumber = (value: number | string): string => {
  if (value === null || value === undefined || value === '') return '';
  
  const num = typeof value === 'string' ? parseFloat(value) : value;
  
  // Check if it's a whole number or has decimal places
  if (Number.isInteger(num)) {
    // For whole numbers, add thousands separators with no decimal places
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else {
    // For decimal numbers, format with up to 2 decimal places
    const formatted = num.toFixed(2);
    
    // Remove trailing zeros after decimal point
    const trimmed = formatted.replace(/\.?0+$/, '');
    
    // Add thousands separators
    return trimmed.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
};