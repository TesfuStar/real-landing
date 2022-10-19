import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef as reactRef } from "react";
import  "../style.css";
import { Input, Textarea } from "@chakra-ui/react";
import WEB from "../../assets/beu.webp";
const Properties = () => {
  const opacityVariants={
    hidden:{opacity:0},
    visible:{opacity:1},
}
    const imageVariants={
        hidden:{x:'-100vw'},
        visible:{x:0},
    }


    const trustedVariant={
      hidden:{x:'100vw'},
      visible:{x:0},
    }
    const paragraphVariant={
      hidden:{y:'100vw'},
      visible:{y:0},
    } 

    const control = useAnimation();
    const { ref, inView } = useInView({threshold:0.3});
  
    useEffect(() => {
      if (inView) {
        control.start("visible");
      } else {
        control.start("hidden");
      }
    }, [control, inView]);
  return (
    <div id="properties" className="overflow-hidden z-40 w-full min-h-full py-20">
      <div
        ref={ref}
        className="z-40 max-w-6xl mx-auto p-5 grid grid-cols-1  w-full
       md:grid-cols-2 gap-3 items-center"
      >
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate={control}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="order-"
        >
          <img
            src={WEB}
            alt="Picture of the app"
            width="500px"
            height="500px"
            objectFit="contain"
          />
        </motion.div>
        <div className="z-40 flex flex-col items-start space-y-3">
          <motion.div
            variants={trustedVariant}
            initial="hidden"
            animate={control}
            transition={{ type: "tween", duration: 0.8, ease: "easeInOut" }}
            className=" flex flex-col items-start space-y-2"
          >
            <h1
              className={`textHeader text-3xl md:text-5xl font-bold`}
            >
              Find Your Home Now ?
            </h1>
            <div className="bg-gradient-to-r from-[#00dbde] to-[#fc00ff] w-16 h-1" />
          </motion.div>

          <motion.p
            variants={trustedVariant}
            initial="hidden"
            animate={control}
            transition={{ type: "tween", duration: 1.2, ease: "easeInOut" }}
            className="text-gray-300"
          >
            Explore your options From your Favorite RealEstate to the burger and
            fries you crave, choose from over 10 local and national favorites
            across Addis Ababa.
          </motion.p>
          <motion.button
           variants={trustedVariant}
           initial="hidden"
           animate={control}
           transition={{ type: "tween", duration: 1, ease: "easeInOut" }}
            className="border-2 border-white bg-white rounded-sm p-2 px-10 font-bold text-main-color
             hover:bg-transparent cursor-pointer duration-500 hover:text-white hover:font-bold"
          >
            Get The App
          </motion.button>
        </div>

        {/* second grid */}
      </div>
    </div>
  );
};

export default Properties;
