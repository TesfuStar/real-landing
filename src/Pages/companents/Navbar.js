import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { FaBars } from "react-icons/fa";
import { useHomeContext } from "../../context/HomeContext";
import Sidebar from "./Sidebar";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../../context/auth";
const Navbar = () => {
  const {
    isOpen,
    setIsOpen,
    setIsInformationOpen,
    setIsPendingOpen,
    isPendingOpen,
  } = useHomeContext();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { user, token, logout } = useAuth();
  const toggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  const profileData = useQuery(
    ["profileDataApi"],
    async () =>
      await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}user/profile/app/${user._id}`,
        {
          headers,
        }
      ),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!token,
      onSuccess: (res) => {},
    }
  );
  const handleClick = () => {
    if(user){
      if (profileData?.data?.data?.profile?.status == null) {
        setIsInformationOpen(true);
        return;
      }
      if (user?.hasCompany) {
        window.open("https://realstate-dashboard.vercel.app/");
        return;
      }
      if (profileData?.data?.data?.profile?.status === "Pending") {
        setIsPendingOpen(true);
        return;
      }
      if (profileData?.data?.data?.profile?.status === "Accepted") {
        window.open('https://realstate-dashboard.vercel.app','_self')
        return;
      }
      return
    }

    setIsOpen(true);
  };
  useEffect(() => {
    const hideMenu = () => {
      if (window.innerWidth > 640 && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    };
    window.addEventListener("resize", hideMenu);
    return () => {
      window.removeEventListener("resize", hideMenu);
    };
  });
  return (
    <>
      <header className="bg-[#fff]/60 p-5 fixed w-full backdrop-blur-2xl z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between ">
          <div>
            <h1 className="font-bold text-black">LOGO</h1>
          </div>
          <div className="flex items-center space-x-5">
            <div className="hidden md:flex items-center space-x-5">
              <Link
                to="home"
                spy={true}
                smooth={true}
                offset={-100}
                duration={800}
                delay={200}
                className="text-slate-800 font-medium hover:text-[#216fed] cursor-pointer text-lg"
              >
                Home
              </Link>
              <Link
                to="properties"
                spy={true}
                smooth={true}
                offset={50}
                duration={800}
                delay={200}
                className="text-slate-800 font-medium hover:text-[#216fed] cursor-pointer text-lg"
              >
                Products
              </Link>
              <Link
                to="contact"
                spy={true}
                smooth={true}
                offset={50}
                duration={800}
                delay={200}
                className="text-slate-800 font-medium hover:text-[#216fed] cursor-pointer text-lg"
              >
                contact
              </Link>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleClick}
                className="border border-slate-800 rounded-sm p-1 text-lg px-6 font-semibold text-slate-800
                    hover:bg-white/20  cursor-pointer duration-500  hover:font-medium"
              >
                Join Us
              </button>
              {user && token && (
                <button
                  onClick={logout}
                  className="hidden md:flex border text-lg border-white bg-slate-800
                   rounded-sm p-1 px-5 font-bold text-white
                    hover:bg-white/20 cursor-pointer duration-500 hover:text-slate-800 hover:font-bold"
                >
                  Log Out
                </button>
              )}
            </div>
            <FaBars
              className="text-white flex md:hidden"
              size={20}
              onClick={() => setIsDrawerOpen(true)}
            />
          </div>
        </div>
      </header>
      <Sidebar isDrawerOpen={isDrawerOpen} toggle={toggle} />
    </>
  );
};

export default Navbar;
