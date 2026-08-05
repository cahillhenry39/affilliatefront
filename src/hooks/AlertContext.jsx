import { createContext, useContext, useState } from "react";
import ModalAlert from "../ui/ModalAlert";

const AlertContext = createContext();

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState({
    isOpen: false,
    status: "success",
    buttonMessage: "close",
    text: "Oops... Something went wrong",
    link: null,
    title: "",
  });

  function showAlert({ status = "success", text, link, title, buttonMessage }) {
    setAlert({
      isOpen: true,
      status,
      text,
      buttonMessage,
      link,
      title,
    });
  }

  function closeAlert() {
    setAlert((prev) => ({
      ...prev,
      status: "success",
      isOpen: false,
    }));
  }

  return (
    <AlertContext.Provider value={{ showAlert, closeAlert }}>
      {children}
      <ModalAlert {...alert} />
    </AlertContext.Provider>
  );
}

export function useAlert() {
  return useContext(AlertContext);
}
