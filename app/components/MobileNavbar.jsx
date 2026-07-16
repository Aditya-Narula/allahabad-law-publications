"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileNavbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Publications", href: "/publications" },
    { name: "Search", href: "/search" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Hamburger Button */}

      <button
        onClick={() => setOpen(true)}
        className="md:hidden p-2 rounded-lg hover:bg-gray-100"
      >
        ☰
      </button>

      {/* Overlay */}

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile Drawer */}

      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-6 border-b">

          <h2 className="font-bold text-xl">
            Menu
          </h2>

          <button
            onClick={() => setOpen(false)}
            className="text-2xl"
          >
            ×
          </button>

        </div>

        <nav className="flex flex-col">

          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="px-6 py-4 border-b hover:bg-amber-50 hover:text-amber-700 font-medium"
            >
              {item.name}
            </Link>
          ))}

        </nav>

      </div>
    </>
  );
}