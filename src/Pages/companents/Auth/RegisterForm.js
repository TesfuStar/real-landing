import React, { useState } from "react";
import {
  Button,
  HStack,
  Input,
  VStack,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../../../context/auth";
import useValidPhone from "../../../hooks/useValidPhone";
import { ThreeDots } from "react-loader-spinner";
import { useHomeContext } from "../../../context/HomeContext";
const RegisterForm = ({ setIsSignIn, closeModal }) => {
  const { setIsInformationOpen } = useHomeContext()
  const { login } = useAuth();
  const [phone, setPhone] = useValidPhone();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const toast = useToast();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);
  const handleShowConfirmPassword = () =>
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      RegisterHandler();
    }
  };
  const RegisterHandler = () => {
    if (
      !phone ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast({
        title: "please fill the fields.",
        status: "info",
        duration: 1800,
        isClosable: true,
      });
      return;
    }
    if (formData.password.length < 6) {
      toast({
        title: "password should be at least 6 character",
        status: "info",
        duration: 1800,
        isClosable: true,
      });
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "password does not match",
        status: "info",
        duration: 1800,
        isClosable: true,
      });
      return;
    }
    registerMutationSubmitHandler();
  };
  const registerMutation = useMutation(
    async (newData) =>
      await axios.post( `${process.env.REACT_APP_BACKEND_URL}auth/signup`, newData, {
        headers,
      }),
    {
      retry: false,
    }
  );
  const registerMutationSubmitHandler = () => {
    try {
      registerMutation.mutate(
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: "251".concat(phone),
          password: formData.password,
        },
        {
          onSuccess: (responseData) => {
            login(responseData?.data?.token, responseData?.data?.result);
            toast({
              title: "Success",
              status: "success",
              duration: 1800,
              isClosable: true,
            });
            closeModal();
            setIsInformationOpen(true)
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
      <VStack>
        <div className="flex items-center     border rounded-md border-slate-800 w-full">
          <span className="border-r-2 border-slate-800 text-slate-800  font-medium rounded-l-md h-full flex flex-grow text-center px-2 items-center justify-center ">
            +251
          </span>
          <input
            type="number"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="900-00-00"
            name="phoneNo"
            className="input w-full flex-grow h-[42px] pl-2 text-slate-800  bg-transparent border-none focus:border-none focus:ring-0    focus:outline-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="last Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="input w-full flex-grow h-[42px] pl-2 text-slate-800 
              border rounded-md border-slate-800   bg-transparent  focus:ring-0    focus:outline-none"
          />
          <input
            type="text"
            placeholder="last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="input w-full flex-grow h-[42px] pl-2 text-slate-800 
              border rounded-md border-slate-800   bg-transparent   focus:ring-0    focus:outline-none"
          />
        </div>

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="input w-full flex-grow h-[42px] pl-2 text-slate-800 
              border rounded-md border-slate-800   bg-transparent   focus:ring-0    focus:outline-none"
        />
        <div className="flex items-center     border rounded-md border-slate-800 w-full">
            <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              className="w-full flex-grow h-[42px] pl-2  text-slate-800 bg-transparent border-none focus:border-none focus:ring-0  
        focus:outline-none"
              onKeyDown={handleSubmit}
            />
            <button
              onClick={handleShowPassword}
              className="h-full flex flex-grow text-center 
        px-2 items-center justify-center "
            >
              {showPassword ? (
                <AiFillEye size={23} className="text-slate-800" />
              ) : (
                <AiFillEyeInvisible size={23} className="text-slate-800" />
              )}
            </button>
          </div>
          {/* confirm */}
          <div className="flex items-center     border rounded-md border-slate-800 w-full">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="confirm password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full flex-grow h-[42px] pl-2  text-slate-800 bg-transparent border-none focus:border-none focus:ring-0  
        focus:outline-none"
              onKeyDown={handleSubmit}
            />
            <button
              onClick={handleShowConfirmPassword}
              className="h-full flex flex-grow text-center 
        px-2 items-center justify-center "
            >
              {showConfirmPassword ? (
                <AiFillEye size={23} className="text-slate-800" />
              ) : (
                <AiFillEyeInvisible size={23} className="text-slate-800" />
              )}
            </button>
          </div>
        <button
        disabled={registerMutation.isLoading }
          onClick={RegisterHandler}
          className="w-full p-2 rounded-md flex hover:opacity-80 items-center 
             justify-center text-white font-medium
             bg-blue-bg backdrop-blur-md hover:bg-blue-bg/80 border border-white capitalize"
        >
          {registerMutation.isLoading ? (
            <ThreeDots
              height="24"
              width="50"
              radius="9"
              color="#fff"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          ) : (
            "Sign Up"
          )}
        </button>
        <p className="capitalize font-medium text-slate-800">
          Already have account ?
          <span
            onClick={() => setIsSignIn(true)}
            className="text-main-color 
               cursor-pointer hover:opacity-80"
          >
            {" "}
            SIGN IN
          </span>
        </p>
      </VStack>
    </>
  );
};

export default RegisterForm;
