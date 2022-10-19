import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect ,useRef as reactRef} from "react";
import WEB from  "../../assets/WEB.svg";
import "../style.css";

import { useHomeContext } from "../../context/HomeContext";
const HomePage = () => {
    const {isOpen, setIsOpen} = useHomeContext()
    const homeRef =reactRef()
  const opacityVariants={
    hidden:{opacity:0},
    visible:{opacity:1},
}
    const imageVariants={
        hidden:{x:'100vw'},
        visible:{x:0},
    }


    const trustedVariant={
      hidden:{x:'-100vw'},
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
    <div id="home">
    <div  className="p-3 pt-20 md:pt-8 z-40 overflow-hidden">
      <div  ref={ref} className=" max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 w-full items-center">
        <motion.div 
         variants={trustedVariant}
         initial="hidden"
         animate={control}
         transition={{type: "tween",duration:0.8,ease:'easeInOut'}}
         className="z-30  flex flex-col items-start space-y-4">
          <h1 
          className={`textHeader font-bold text-4xl md:text-4xl lg:text-7xl pb-2 md:pb-4`}
          >
          Your Dream House is Waiting For You
          </h1>
          <p className="text-sm text-gray-400">
            In next.js, there is no need to write an extra line of code in
            nextjs. Next.js, by default, provides support image and image
            optimization for your web app.
          </p>
          <button onClick={()=>setIsOpen(true)}
          className="border-2 border-white rounded-sm p-2 px-10 font-semibold text-white
          hover:bg-white cursor-pointer duration-500 hover:text-main-color hover:font-medium">
            Join Us
          </button>
        </motion.div>
        <motion.div
         variants={imageVariants}
         initial="hidden"
         animate={control}
         transition={{duration:0.8,ease:'easeInOut'}}
        className="z-20">
          <img
            src={WEB}
            alt="Picture of the author"
            height="500px"
            />
        </motion.div>
      </div>
    </div>
            </div>
  );
};

export default HomePage;
