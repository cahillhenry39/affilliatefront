import { useEffect, useRef, useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";

export function useHeaderAndDark() {
  const sectionsRef = useRef([]);
  const [showHead, setShowHead] = useState(false);

  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting === false && entry.target.id === "header") {
          setShowHead(true);

          return;
        }

        if (entry.isIntersecting === true && entry.target.id === "header") {
          setShowHead(false);
          return;
        }
      });
    });

    sectionsRef.current.forEach((section) => {
      observer.observe(section);
    });
  }, [sectionsRef, showHead, setShowHead]);

  const refCallback = (element) => {
    if (element) {
      sectionsRef.current.push(element);
    }
  };

  return { refCallback, isDarkMode, showHead };
}
