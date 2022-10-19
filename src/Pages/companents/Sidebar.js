import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import {Link} from 'react-scroll'

const Sidebar = ({ toggle, isDrawerOpen }) => {
  return (
    <>
      <Drawer placement="right" onClose={toggle} isOpen={isDrawerOpen}>
        <DrawerOverlay />
        <DrawerContent style={{background:'rgba(255,255,255,0.8)',backdropFilter:'blur 25px'}} backdropBlur={'2xl'}>
          <DrawerCloseButton onClick={toggle} bg="white" />
          <DrawerHeader>
            <Link to="home" onClick={toggle}>
              <img src="afro.png" alt="" className="h-6" />
            </Link>
          </DrawerHeader>
          <DrawerBody>
            <div className="flex flex-col items-start  space-y-3  py-4 h-full">
              <Link
                href="/"
                className="font-medium  text-white"
                onClick={toggle}
              >
                Home
              </Link>
              <Link
                href="properties"
                className="font-medium text-lg text-white"
                onClick={toggle}
              >
                Products
              </Link>
              <Link
                href="contact"
                className="font-medium  text-white"
                onClick={toggle}
              >
                Contact
              </Link>

               <div className="pt-10">
               <button   className="bg-white text-main-color flex md:hidden font-semibold rounded-sm p-2">Contact</button>

               </div>
            </div>

            <DrawerFooter>
            </DrawerFooter>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
