import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../../context/auth";
import "../../style.css";
import { useHomeContext } from "../../../context/HomeContext";
import app from "../../../utils/firebase";
import { FaRegImages } from "react-icons/fa";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { ThreeDots } from "react-loader-spinner";
const InformationForm = ({ isLoading, setIsLoading }) => {
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
    if(!file){
      toast({
        title: "please upload your logo",
        status: "info",
        duration: 1800,
        isClosable: true,
      });
      return ;
    }
    setIsLoading(true);
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          createCompanySubmitHandler({ image: downloadURL, values: values });
          setIsLoading(false);
        });
      }
    );
  };

  const createCompanyMutation = useMutation(
    async (newData) =>
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}company/create`, newData, {
        headers,
      }),
    {
      retry: false,
    }
  );
  const createCompanySubmitHandler = async (data) => {
    try {
      createCompanyMutation.mutate(
        {
          _id: user._id,
          userId: user._id,
          name: data.values.name,
          email: data.values.email,
          logo: data?.image,
          address: data.values.address,
          phone: data.values.phone,
          comment: data.values.comment,
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
                    className={`rounded-md w-full h-[42px] focus:outline-none  pl-3 text-white bg-[#404657]/10 ${
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
                  <span className="font-medium text-sm text-white">
                    Office Phone No
                  </span>
                  <Field
                    name="phone"
                    as={"Input"}
                    className={`rounded-md w-full h-[42px] focus:outline-none  pl-3 text-white bg-[#404657]/10 ${
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
                  className={`rounded-md w-full h-[42px] focus:outline-none pl-3 text-white bg-[#404657]/10 ${
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
                 text-center flex flex-col border-2 border-white border-dashed rounded-md"
                >
                  <label className="w-full text-center flex flex-col items-center justify-center">
                    <p className="text-white">click to select image</p>
                    <FaRegImages size={70} className="text-dark-gray" />
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
                  className={`rounded-md w-full h-28 focus:outline-none  pl-3 text-white bg-[#404657]/10 ${
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
                <span className="font-medium text-sm text-white">
                  Comment(any)
                </span>
                <Field
                  as={"textarea"}
                  name="comment"
                  className={`rounded-md w-full pl-3 text-white min-h-28 h-28 focus:outline-none   bg-[#404657]/10 ${
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
                className="w-fit px-14 self-center p-[6px]  rounded-md flex hover:opacity-80 items-center justify-center text-white font-medium
              bg-white/20 capitalize border border-white"
              >
                {createCompanyMutation.isLoading ? (
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
                  " Submit"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default InformationForm;
