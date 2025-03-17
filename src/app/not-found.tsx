"use client";
import { assets } from "@/const/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NotFound() {
  const router = useRouter();
  const [role, setRole] = useState(null);
  const [department, setDepartment] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const roleFromStorage = localStorage.getItem("role");
      let parsedRole;
      try {
        parsedRole = roleFromStorage
          ? JSON.parse(roleFromStorage)
          : roleFromStorage;
      } catch (error) {
        parsedRole = roleFromStorage;
      }
      setRole(parsedRole);
      const departFromStorage = localStorage.getItem("department");
      let parsedDepart;
      try {
        parsedDepart = departFromStorage
          ? JSON.parse(departFromStorage)
          : departFromStorage;
      } catch (error) {
        parsedDepart = departFromStorage;
      }
      setDepartment(parsedDepart);
    }
  }, []);
  const currentParams=typeof window !== "undefined"?window.location.origin:''

  const handleNavigate = () => {
    if (department === 'COMBAT') {
      router.push(`${currentParams}/combat/plan_week`)
    }
    if (department === 'TRAINING') {
      router.push(`${currentParams}/traning/plan_week`)
    }
    if (department === 'TECH') {
      router.push(`${currentParams}/tech/plan_week`)
    }
    if (department === 'CONTROL') {
      router.push(`${currentParams}/control/plan_week`)
    }
    if (role === 'GA'||role==='DH') {
      router.push(`${currentParams}/ga/plan_week`)
    }
    if (role === 'RA') {
      router.push(`${currentParams}/ra/plan_week`)
    }
    if (role === 'CS') {
      router.push(`${currentParams}/cs/manage_document`)
    }
    if (role === 'ADMIN') {
      router.push(`${currentParams}/admin/user`)
    }
  }

  return (
    <div>

      <div className="text-center mt-20">
        <div className="flex items-center justify-center mb-6">
          <Image
            src={assets.pageNotFound}
            width={500}
            height={500}
            alt="page not found"
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-600 mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-500 mb-6">
          Nội dung bạn tìm kiếm không có. Vui lòng quay lại!
        </p>
        <button
          className="bg-primary hover:bg-opacity-90 text-white px-6 py-2 rounded-lg"
          onClick={handleNavigate}
        >
          Quay lại
        </button>
      </div>

    </div>
  );
}
