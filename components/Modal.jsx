"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image"; // Image ইমপোর্ট করতে ভুলবেন না
import { useRouter } from "next/navigation";

const Modal = ({ children }) => {
  const router = useRouter();
  const modalRef = useRef(null);

  useEffect(() => {
    // ২. মডালটি ওপেন করার সঠিক উপায়
    if (!modalRef.current?.open) {
      modalRef.current?.showModal();
    }
  }, []);

  function onHide() {
    router.back(); // মডাল বন্ধ করার জন্য
  }

  return createPortal(
    <dialog
      ref={modalRef}
      onClose={onHide}
      className="shadow-teal-700 shadow-md border border-teal-600 flex flex-col p-2 rounded-md"
    >
      <span onClick={onHide} className="flex justify-end cursor-pointer">
        <Image src="/xmark.svg" alt="Close Modal" width={30} height={30} />
      </span>
      {children}
    </dialog>,
    document.getElementById("modal-root-content"),
  );
};

export default Modal;
