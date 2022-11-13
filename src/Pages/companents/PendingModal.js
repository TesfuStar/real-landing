import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useAuth } from "../../context/auth";
import { useHomeContext } from "../../context/HomeContext";
const PendingModal = () => {
  const { isPendingOpen, setIsPendingOpen } = useHomeContext();
  const { user } = useAuth();
  function closeModal() {
    setIsPendingOpen(false);
  }

  function openModal() {
    setIsPendingOpen(true);
  }
  console.log(user)
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center"></div>

      <Transition appear show={isPendingOpen} as={Fragment}>
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
                <Dialog.Panel
                  className="w-full max-w-xl transform overflow-hidden 
              rounded-2xl bg-[#fff]/10 backdrop-blur-lg  py-6 px-2 md:px-6 text-left 
              align-middle  transition-all border border-white"
                >
                  <div
                    onClick={closeModal}
                    className="absolute right-3 top-2 border-2 rounded-md border-[#fff] p-1 cursor-pointer"
                  >
                    <FaTimes
                      size={15}
                      style={{
                        color: "#fff",
                      }}
                    />
                  </div>
                  {user?.status === "Pending" ? (
                    <div className="flex flex-col items-start space-y-2 py-5">
                      <h2 className='font-medium text-center text-white dark:text-white  text-lg'>Thank you for your submission, please wait while we are verify your company information.</h2>
      <h2 className=' text-center text-white dark:text-white  lg'>You will receive a text 
      message on {user.email} as soon as we review Your information.</h2>
                    </div>
                  ) : (
                    <div>
                      <h1 className="text-white text-7xl">Accepted state</h1>
                    </div>
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

export default PendingModal;
