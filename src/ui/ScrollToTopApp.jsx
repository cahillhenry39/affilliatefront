import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTopApp({ children }) {
  const location = useLocation();
  const path = location.pathname.split("/");
  const title = path[path?.length - 1];

  useEffect(
    function () {
      window.scrollTo({ top: 0, left: 0 });
      document.querySelector("main").scrollTop = 0;
    },
    [location, title, path]
  );
  return children;
}

export default ScrollToTopApp;
