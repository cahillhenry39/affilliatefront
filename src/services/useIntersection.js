import { useEffect, useRef } from "react";

export function useMyAppIntersection({ runFunction, type }) {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting === false && entry.target.id === type) {
          // runSecondFunction();

          return;
        }

        if (entry.isIntersecting === true && entry.target.id === type) {
          runFunction();

          return;
        }
      });
    });

    sectionsRef.current.forEach((section) => {
      observer.observe(section);
    });
  }, [sectionsRef, runFunction, type]);

  const refCallback = (element) => {
    if (element) {
      sectionsRef.current.push(element);
    }
  };

  return { refCallback };
}
