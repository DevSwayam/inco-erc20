import React from "react";
import {Link} from "react-router-dom";
import inco_logo from "../assets/images/inco_logo.jpeg";

export default function Footer() {
  return (
    <footer>
      <div className="py-12 md:py-5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Top area: Blocks */}
          <div className="grid md:grid-cols-12 gap-8 lg:gap-20 mb-8 md:mb-12">
            {/* 1st block */}
            <div className="md:col-span-4 lg:col-span-5">
              <div className="mb-2">
                {/* Logo */}
                <Link to="/" className="inline-block" aria-label="Cruip">
                  <img
                    src={inco_logo}
                    alt="Inco Logo"
                    width={32} // Set the appropriate width
                    height={32} // Set the appropriate height
                  />
                </Link>
              </div>
              <div className="text-gray-400">Inco is 💙</div>
            </div>

            {/* 2nd, 3rd and 4th blocks */}
            <div className="md:col-span-8 lg:col-span-7 grid sm:grid-cols-3 gap-8"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
