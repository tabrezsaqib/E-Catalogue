import { createContext, useContext, useState } from "react";

const AlertContext = createContext(null);

export default function AlertProvider({ children }) {
  const [state, setState] = useState({
    isOpen: false,
    type: "success",
    message: "",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState((prev) => {
      return { ...prev, isOpen: false };
    });
  };

  return (
    <AlertContext.Provider
      value={{
        ...state,
        onOpen: (type, message) => setState({ isOpen: true, type, message }),
        onClose: handleClose,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
}

export const useAlert = () => useContext(AlertContext);
