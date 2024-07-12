"use client"
import { JSX, SVGProps, useEffect, useState } from "react"
import LoginModal from "@/components/component/LoginModal"
import MainContent from "@/components/component/AdminContent"

export default function Component() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    if (window !== undefined) {
      setIsModalOpen(localStorage.getItem('admin_token') === null);
    }
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {!isModalOpen && <MainContent openModal={openModal} />}
      {isModalOpen && <LoginModal onClose={closeModal} />}
    </>
  );
}

function SearchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}