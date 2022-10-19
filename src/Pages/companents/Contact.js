import React, { useState } from "react";
import { motion } from "framer-motion";
import { InView } from "react-intersection-observer";
import "../style.css";
import { Input, Textarea } from "@chakra-ui/react";
import WEB from "../../assets/beu.webp";
const Contact = () => {
  return (
    <div id="contact" className="w-full min-h-full py-20">
      <div
        className="max-w-6xl mx-auto p-5 grid grid-cols-1  w-full
       md:grid-cols-2 gap-3 items-center"
      >
        <div className="flex flex-col items-start space-y-3">
          <div className="flex items-center space-x-2">
            <div className="bg-main-bg  w-12 h-1" />
            <h1 className="text-white text-lg">Contact Us</h1>
          </div>
          <h1 className=" z-20 textHeader text-3xl md:text-5xl font-bold">
            Have You A Company ? Let’s get in touch
          </h1>

          {/* form */}
          <div className="z-40 w-full flex flex-col items-start space-y-3">
            <div  className="z-40 w-full flex flex-col items-start space-y-1">
              <p className="font-medium text-gray-300">Name</p>
              <Input variant={"flushed"} type="text" color={'gray.300'}/>
            </div>
            <div  className="w-full flex flex-col items-start space-y-1">
              <p className="font-medium text-gray-300">Email</p>
              <Input variant={"flushed"} type="email" color={'gray.300'}/>
            </div>
            <div  className="w-full flex flex-col items-start space-y-1">
              <p className="font-medium text-gray-300">Phone</p>
              <Input variant={"flushed"} type="tel" color={'gray.300'}/>
            </div>
            <div  className="w-full flex flex-col items-start space-y-1">
              <p className="font-medium text-gray-300">Message</p>
              <Textarea  variant={"flushed"} color={'gray.300'}></Textarea>
            </div>
            <button 
             className="border-2 border-white rounded-sm p-1 px-10 font-semibold hover:font-semibold text-white
             hover:bg-white text-lg cursor-pointer duration-500 hover:text-main-color "
            >Submit</button>
          </div>
        </div>

        {/* second grid */}
        <div>
        <img
            src={WEB}
            alt="Picture of the app"
            width="500px"
            height="500px"
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
