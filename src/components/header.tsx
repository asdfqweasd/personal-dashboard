"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { links, categories } from "@/src/lib/data";
import Link from "next/link";
import { useActiveSectionContext } from "../context/active-section-context";

export default function Header() {
  const { activeSection, setActiveSection, setCategory } =
    useActiveSectionContext();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  return (
    <header className="z-[999] relative">
      <motion.div
        className="fixed top-0 left-1/2 transform -translate-x-1/2 h-[4.5rem] w-full rounded-xl max-w-xs sm:max-w-none border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] sm:top-6 sm:h-[3.25rem] sm:w-[36rem] sm:rounded-full"
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
      ></motion.div>

      <nav className="flex fixed top-[0.5rem] left-1/2 transform -translate-x-1/2 h-12 py-2 sm:top-[1.7rem] sm:h-[initial] sm:py-0">
        <ul className="flex w-full sm:w-auto flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium text-gray-500 sm:flex-nowrap sm:gap-5">
          {links.map((link) => (
            <motion.li
              className="h-3/4 flex items-center justify-center relative"
              key={link.hash}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              onMouseEnter={() =>
                link.name === "News" && setIsDropdownVisible(true)
              }
              onMouseLeave={() => setIsDropdownVisible(false)}
            >
              <Link
                className={
                  "flex w-full items-center justify-center px-3 py-3 hover:text-gray-950 transition"
                }
                href={link.hash}
                onClick={() => {
                  setActiveSection(link.name);
                }}
              >
                {link.name}
                {link.name === activeSection && (
                  <motion.span
                    className="bg-gray-200 rounded-full absolute inset-0 -z-10 "
                    layoutId="activeSection"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  ></motion.span>
                )}
              </Link>
              {link.name === "News" && isDropdownVisible && (
                <div className="absolute left-0 top-full mt-2 bg-white shadow-md rounded-lg py-2 z-10 cursor-pointer">
                  {categories.map((category) => (
                    <a
                      key={category.value}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setCategory(category.value)}
                    >
                      {category.name}
                    </a>
                  ))}
                </div>
              )}
            </motion.li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
