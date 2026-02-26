"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname(); // বর্তমান URL পাথ পেতে (যেমন: /en/photos/1)

  // পাথ থেকে বর্তমান ল্যাঙ্গুয়েজ বের করা (en অথবা bn)
  const currentLang = pathname.split("/")[1] || "en";
  const [showDropdown, setShowDropdown] = useState(false);

  const languages = [
    { code: "bn", label: "Bangla", flag: "/bd.png" }, // পাবলিক ফোল্ডারে ইমেজ থাকলে এভাবে লিখুন
    { code: "en", label: "English", flag: "/usa.png" },
  ];

  const handleLanguageChange = (lang) => {
    // বর্তমান পাথের প্রথম অংশ (lang) পরিবর্তন করে নতুন ল্যাঙ্গুয়েজে পাঠানো
    const segments = pathname.split("/");
    segments[1] = lang;
    router.push(segments.join("/"));
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      {/* বর্তমান ল্যাঙ্গুয়েজ দেখানোর বাটন */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 p-2 border rounded-md"
      >
        {currentLang === "bn" ? "Bangla" : "English"}
      </button>

      {showDropdown && (
        <ul className="absolute right-0 top-full mt-2 w-40 rounded-md bg-white p-2 z-10 shadow-lg border list-none">
          {languages.map((entry) => (
            <li
              key={entry.code}
              onClick={() => handleLanguageChange(entry.code)}
              className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-100 text-black"
            >
              <Image
                src={entry.flag}
                alt={entry.label}
                width={24}
                height={16}
                className="max-w-8"
              />
              {entry.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
