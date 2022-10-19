import React, { useState } from "react";
import {
  Button,
  Input,
  useToast,
  VStack,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../../context/auth";
import "../../style.css";
import { useHomeContext } from "../../../context/HomeContext";
const InformationForm = () => {
  const { isInformationOpen, setIsInformationOpen, setIsPendingOpen } =
    useHomeContext();
  const { user, token, login } = useAuth();
  const toast = useToast();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  //Hook
  const [file, setFile] = useState(null);
  //Formik Validation Schema
  const informationSchema = Yup.object().shape({
    name: Yup.string().required("real estate name is Required"),
    phone: Yup.string().required("company phone is Required"),
    email: Yup.string().email().required("company phone is Required"),
    comment: Yup.string().optional(),
    address: Yup.string().min(5).required("address is Required"),
  });
  const onSubmit = (values) => {
    createCompanySubmitHandler(values);
    // console.log(values)
  };
  const createCompanyMutation = useMutation(
    async (newData) =>
      await axios.post(`http://localhost:5000/api/company/create`, newData, {
        headers,
      }),
    {
      retry: false,
    }
  );
  const createCompanySubmitHandler = async (values) => {
    try {
      createCompanyMutation.mutate(
        {
          _id: user._id,
          userId: user._id,
          name: values.name,
          email: values.email,
          logo: "logo",
          address: values.address,
          phone: values.phone,
          comment: values.comment,
        },
        {
          onSuccess: (responseData) => {
            toast({
              title: "Success",
              status: "success",
              duration: 1800,
              isClosable: true,
            });
            login(token, responseData?.data?.user);
            setIsInformationOpen(false);
            setIsPendingOpen(true);
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
    <div className="">
      <div className="w-full">
        <h1 className="text-center  text-2xl w-full  text-white font-bold capitalize">
          real Estate form
        </h1>
        <Formik
          initialValues={{
            name: "",
            phone: "",
            email: "",
            comment: "",
            address: "",
          }}
          validationSchema={informationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form className="flex flex-col items-start space-y-2 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
                <div className="w-full flex flex-col items-start space-y-1">
                  <span className="font-medium text-sm text-white">
                    Real Estate Name
                  </span>
                  <Field
                    as={"input"}
                    name="name"
                    className={`rounded-sm w-full h-[42px] focus:outline-none  pl-3 text-white bg-[#404657]/10 ${
                      errors.name && touched.name
                        ? "border-2 border-red-600"
                        : "border-2 border-gray-200"
                    } `}
                  />
                  {errors.firstName && touched.firstName ? (
                    <p className="text-[13px] text-red-500">{errors.name}</p>
                  ) : null}
                </div>
                <div className="w-full flex flex-col items-start space-y-1">
                  <span className="font-medium text-sm ">Office Phone No</span>
                  <Field
                    name="phone"
                    as={"Input"}
                    className={`rounded-sm w-full h-[42px] focus:outline-none  pl-3 text-white bg-[#404657]/10 ${
                      errors.phone && touched.phone
                        ? "border-2 border-red-600"
                        : "border-2 border-gray-200"
                    } `}
                  />
                  {errors.lastName && touched.lastName ? (
                    <p className="text-[13px] text-red-500">{errors.phone}</p>
                  ) : null}
                </div>
              </div>
              {/* email */}
              <div className="w-full flex flex-col items-start space-y-1">
                <span className="font-medium text-white text-sm ">
                  Real Estate Email
                </span>
                <Field
                  as={"Input"}
                  name="email"
                  className={`rounded-sm w-full h-[42px] focus:outline-none pl-3 text-white bg-[#404657]/10 ${
                    errors.email && touched.email
                      ? "border-2 border-red-600"
                      : "border-2 border-gray-200"
                  } `}
                />
                {errors.firstName && touched.firstName ? (
                  <p className="text-[13px] text-red-500">{errors.firstName}</p>
                ) : null}
              </div>

              {/* logo */}
              <div className="w-full flex flex-col items-start space-y-1">
                <span className="font-medium text-white text-sm ">
                  Company Logo
                </span>
                <div
                  className="bg-transparent p-10 w-full  items-center 
                 text-center flex flex-col border-2 border-gray-200 border-dashed"
                >
                  <label className="w-full text-center flex flex-col items-center justify-center">
                    <p className="text-white">click to select image</p>
                    <p className="text-white">
                      supported image types png, jpg, jpeg
                    </p>
                    <input
                      name="file"
                      type="file"
                      style={{ display: "none" }}
                      onChange={(e) => setFile(e.target.files[0])}
                      accept="image/png ,image/jpg, image/jpeg"
                    />
                  </label>
                </div>
                {errors.lastName && touched.lastName ? (
                  <p className="text-[13px] text-red-500">{errors.lastName}</p>
                ) : null}
              </div>
              {/* address */}
              <div className="w-full flex flex-col items-start space-y-1">
                <span className="font-medium text-sm text-white">
                  address(in detail)
                </span>
                <Field
                  col={20}
                  as={"textarea"}
                  name="address"
                  className={`rounded-sm w-full h-28 focus:outline-none  pl-3 text-white bg-[#404657]/10 ${
                    errors.address && touched.address
                      ? "border-2 border-red-600"
                      : "border-2 border-gray-200"
                  } `}
                />
                {errors.firstName && touched.firstName ? (
                  <p className="text-[13px] text-red-500">{errors.firstName}</p>
                ) : null}
              </div>
              {/* comment */}
              <div className="w-full flex flex-col items-start space-y-1">
                <span className="font-medium text-sm ">Comment(any)</span>
                <Field
                  as={"textarea"}
                  name="comment"
                  className={`rounded-sm w-full pl-3 text-white min-h-28 h-28 focus:outline-none   bg-[#404657]/10 ${
                    errors.comment && touched.comment
                      ? "border-2 border-red-600"
                      : "border-2 border-gray-200"
                  } `}
                />
                {errors.comment && touched.comment ? (
                  <p className="text-[13px] text-red-500">{errors.comment}</p>
                ) : null}
              </div>
              <button
                type="submit"
                className="w-fit px-10 self-end p-2  rounded-md flex hover:opacity-80 items-center justify-center text-white font-medium
              bg-gradient-to-r from-[#216fed] to-[#3a7fee] capitalize"
              >
                {createCompanyMutation.isLoading ? "Sending..." : " Submit"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default InformationForm;
