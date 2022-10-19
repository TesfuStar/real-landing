import React, { useState } from "react";
import useValidPhone from "../../../hooks/useValidPhone";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../../../context/auth";
import { ThreeDots } from "react-loader-spinner";
import { useHomeContext } from "../../../context/HomeContext";
const LoginForm = ({ setIsSignIn, closeModal }) => {
  const { setIsInformationOpen,setIsPendingOpen } = useHomeContext()
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone, PhoneError] = useValidPhone();
  const [password, setPassword] = useState("");
  const toast = useToast();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      LoginHandler();
    }
  };
  const LoginHandler = () => {
    if (!phone) {
      toast({
        title: "please enter phone number.",
        status: "info",
        duration: 1800,
        isClosable: true,
      });
      return;
    }
    if (!password) {
      toast({
        title: "please enter password.",
        status: "info",
        duration: 1800,
        isClosable: true,
      });
      return;
    }
    LoginSubmitHandler();
  };
  const loginMutation = useMutation(
    async (newData) =>
      await axios.post( `${process.env.REACT_APP_BACKEND_URL}auth/signin`, newData, {
        headers,
      }),
    {
      retry: false,
    }
  );
  const LoginSubmitHandler = async (values) => {
    try {
      loginMutation.mutate(
        { phone: "251".concat(phone), password },
        {
          onSuccess: (responseData) => {
            toast({
              title: "Success",
              status: "success",
              duration: 1800,
              isClosable: true,
            });
            login(responseData?.data?.token, responseData?.data?.result);
            closeModal();
            if (responseData?.data?.result?.status == null && responseData?.data?.result?.companyId == null) {
              setIsInformationOpen(true)
              return;
            }
            if (responseData?.data?.result?.hasCompany) {
              window.open('https://realstate-dashboard.vercel.app/')
              return;
            }  if (responseData?.data?.result?.status == "Pending") {
              setIsPendingOpen(true)
              return;
            }
          },
          onError: (err) => {
            console.log(err);
            toast({
              title: "error",
              description: err?.response?.data?.message,
              status: "error",
              duration: 1800,
              isClosable: true,
            });
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center space-y-2  w-full">
        <div className="w-full flex flex-col items-start space-y-1">
          <div className="flex items-center     border-2 rounded-md border-gray-300 w-full">
            <span className="border-r-2 border-gray-300 text-white  font-medium rounded-l-md h-full flex flex-grow text-center px-2 items-center justify-center ">
              +251
            </span>
            <input
              type="number"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="900-00-00"
              name="phoneNo"
              className="input w-full flex-grow h-[42px] pl-2 text-white  bg-transparent border-none focus:border-none focus:ring-0    focus:outline-none"
            />
          </div>
          <p className="text-red-600 text-[10px]">{PhoneError}</p>
        </div>
        {/* password */}
        <div className="w-full flex flex-col items-start space-y-1">
          <div className="flex items-center     border-2 rounded-md border-gray-300 w-full">
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="password"
              name="phoneNo"
              className="w-full flex-grow h-[42px] pl-2  text-white bg-transparent border-none focus:border-none focus:ring-0  
        focus:outline-none"
              onKeyDown={handleSubmit}
            />
            <button
              onClick={handleShowPassword}
              className="h-full flex flex-grow text-center 
        px-2 items-center justify-center "
            >
              {showPassword ? (
                <AiFillEye size={23} className="text-gray-400" />
              ) : (
                <AiFillEyeInvisible size={23} className="text-gray-400" />
              )}
            </button>
          </div>
        </div>
        <button
          disabled={loginMutation.isLoading}
          onClick={LoginHandler}
          className="w-full p-2 rounded-md flex items-center justify-center text-white font-medium
              bg-gradient-to-r from-[#216fed] to-[#3a7fee] capitalize"
        >
          {loginMutation.isLoading ? (
            <ThreeDots
              height="25"
              width="50"
              radius="9"
              color="#fff"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          ) : (
            "Sign in"
          )}
        </button>
        <p className="font-medium text-gray-300">
          Don't have account ?
          <span
            onClick={() => setIsSignIn(false)}
            className="text-[#216fed] cursor-pointer hover:opacity-80"
          >
            {" "}
            SIGN UP
          </span>
        </p>{" "}
      </div>
    </>
  );
};

export default LoginForm;
