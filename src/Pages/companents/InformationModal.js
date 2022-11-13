import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useHomeContext } from "../../context/HomeContext";
import InformationForm from "./Auth/InformationForm";
import { ThreeDots } from "react-loader-spinner";
const InformationModal = () => {
    const {isInformationOpen, setIsInformationOpen} = useHomeContext()
    const [isLoading, setIsLoading] = useState(false);
  function closeModal() {
    setIsInformationOpen(false);
  }

  function openModal() {
    setIsInformationOpen(true);
  }
  function close(){

  }
  return (
    <>
      <Transition appear show={isInformationOpen} as={Fragment}>
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
            <div className="fixed inset-0 bg-black blur-xl bg-opacity-25" />
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
              rounded-2xl bg-[#fff] backdrop-blur-lg  py-6 px-2 md:px-6 text-left 
              align-middle transition-all border border-white"
                >
            
                  <div
                    onClick={closeModal}
                    className="absolute right-3 top-2 border-2 rounded-md border-[#000] p-1 cursor-pointer"
                  >
                    <FaTimes
                      size={15}
                     className="text-main-color"
                    />
                  </div>
                  <InformationForm isLoading={isLoading} setIsLoading={setIsLoading} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
     
    </>
  );
};

export default InformationModal;
