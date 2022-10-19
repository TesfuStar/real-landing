import { useState, useContext, createContext, useEffect } from "react";

const homeContext = createContext();

export const useHomeContext = () => useContext(homeContext);

export const HomeProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isInformationOpen, setIsInformationOpen] = useState(false);
  const [isPendingOpen, setIsPendingOpen] = useState(false);
  return (
    <homeContext.Provider
      value={{
        isOpen,
        setIsOpen,
        isInformationOpen,
        setIsInformationOpen,
        isPendingOpen,
        setIsPendingOpen,
      }}
    >
      {children}
    </homeContext.Provider>
  );
};

// const memoValue = useMemo(()=>({
//   handleNav,
//   activeMenu,
//   setActiveMenu,
//   screenSize,
//   currentMode,
//   setMode,
//   setCurrentMode,
//   isSmallScreen,
//   setIsSmallScreen,
//   isOpen,
//   setIsOpen,
//   propertyId,
//   setPropertyId,
//   editPropertyId,
//   setEditPropertyId,
// }),[currentMode,isSmallScreen,isOpen])
