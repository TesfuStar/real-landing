import React from "react";
import { Link } from "react-scroll";
import { IoLogoTwitter } from "react-icons/io";
import { GrFacebookOption, GrYoutube, GrLinkedinOption } from "react-icons/gr";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
const Footer = () => {
  return (
    <div className="z-30 p-5 bg-blue-bg">
      <div className="max-w-6xl  mx-auto py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
        <div className="flex flex-col items-start space-y-3">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMoqix_7TTPTZ-g9NjLpruildmCXSlMGsqGQ&usqp=CA"
            alt=""
            className="h-16 z-30"
          />
          <p className="z-30 text-sm max-w-xs text-white">
            Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor
            ut labore et dolore magna aliqua. Quis facilisis.
          </p>
          <div className="z-30 flex items-center space-x-2">
            <div className="bg-[#626262] hover:bg-blue-bg cursor-pointer transition-all ease-out duration-500 p-2 rounded-full">
              <GrFacebookOption className="text-gray-300" />
            </div>
            <div className="bg-[#626262] hover:bg-blue-bg cursor-pointer transition-all ease-out duration-500 p-2 rounded-full">
              <IoLogoTwitter className="text-gray-300" />
            </div>
            <div className="bg-[#626262] hover:bg-blue-bg cursor-pointer transition-all ease-out duration-500 p-2 rounded-full">
              <GrYoutube className="text-gray-300" />
            </div>
            <div className="bg-[#626262] hover:bg-blue-bg cursor-pointer transition-all ease-out duration-500 p-2 rounded-full">
              <GrLinkedinOption className="text-gray-300" />
            </div>
          </div>
        </div>

        {/* quick links */}
        <div className="z-30 flex flex-col items-start space-y-3">
          <div className="flex flex-col items-start space-y-1">
            <h1 className="text-xl text-white font-medium">QUICK LINKS</h1>
            <div className="w-16 h-[2px] bg-main-bg" />
          </div>
          <div className="flex flex-col items-start space-y-2">
            <div
              className="flex items-center cursor-pointer space-x-1 
               text-gray-100 hover:text-gray-400 transition-all ease-in-out duration-500"
            >
              <BiChevronRight size={18} />
              <Link
                to="home"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
                className="text-sm font-medium text-gray-300 hover:text-[#216fed]"
              >
                Home
              </Link>
            </div>
            <div
              className="flex items-center cursor-pointer space-x-1 
               text-gray-100 hover:text-gray-400 transition-all ease-in-out duration-500"
            >
              <BiChevronRight size={18} />
              <Link
                to="properties"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
                className="text-sm font-medium text-gray-300 hover:text-[#216fed]"
              >
                Products
              </Link>
            </div>

            <div
              className="flex items-center cursor-pointer space-x-1 
               text-gray-100 hover:text-gray-400 transition-all ease-in-out duration-500"
            >
              <BiChevronRight size={18} />
              <Link
                to="contact"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
                className="text-sm font-medium text-gray-300 hover:text-[#216fed]"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* contact info */}
        <div className="z-30 flex flex-col items-start space-y-3">
          <div className="flex flex-col items-start space-y-1">
            <h1 className="text-xl text-white font-medium">CONTACT INFO</h1>
            <div className="w-16 h-[2px] bg-main-bg" />
          </div>
          <div>
            <div className="flex flex-col items-start space-y-2 ">
              {/* email */}
              <div className="flex items-start justify-start space-x-2">
                <div>
                  <MdEmail size={20} className="text-gray-100" />
                </div>
                <div className="flex flex-col items-start text-start">
                  <p className="font-medium text-gray-300">Email</p>
                  <p className="text-sm text-white">admin@gmail.com</p>
                </div>
              </div>
              {/* phone */}
              <div className="flex items-start space-x-2">
                <BsTelephoneFill size={22} className="text-gray-100" />
                <div className="flex flex-col items-start ">
                  <p className="font-medium text-gray-300">Phone</p>
                  <p className="text-sm text-white">+251944719460</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="z-30 flex items-center justify-center w-full md:items-start 
       md:justify-between flex-wrap border-t border-gray-300 py-2">
        <p className="text-[13px] text-center  text-white">
          copyright <span className="text-white">© Ethomes</span> | All right
          reserved
        </p>
        <p className="text-[13px] text-white">
          2022 <span className="text-white">© ET technologies</span>| All Rights
          Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
