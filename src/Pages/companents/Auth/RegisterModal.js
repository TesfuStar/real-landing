import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import {FaTimes} from 'react-icons/fa'
import { useHomeContext } from "../../../context/HomeContext";
const RegisterModal = () => {
  const [isSignIn, setIsSignIn] = useState(true);
   const {isOpen, setIsOpen} =useHomeContext()
  function closeModal() {
    setIsOpen(false);
    setIsSignIn(true)
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center"></div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={openModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-white blur-2xl bg-opacity-5" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-2 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden 
                rounded-2xl bg-[#fff]/10 backdrop-blur-lg  py-6 px-2
                 md:px-6 text-left align-middle border border-white transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg text-center pb-3 font-medium leading-6 text-gray-200"
                  >
                    {isSignIn ? "Log In" : "Sign Up"}
                  </Dialog.Title>
                  <div
                    onClick={closeModal}
                    className="absolute right-3 top-2 border-2 rounded-md border-[#fff] p-1 cursor-pointer"
                  >
                    <FaTimes
                      size={15}
                      style={{
                        color:  "#fff",
                      }}
                    />
                  </div>
                  {isSignIn ? (
                    <LoginForm
                      setIsSignIn={setIsSignIn}
                      closeModal={closeModal}
                    />
                  ) : (
                    <RegisterForm setIsSignIn={setIsSignIn} closeModal={closeModal} />
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default RegisterModal;
