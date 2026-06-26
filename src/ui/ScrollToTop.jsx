import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";

function ScrollToTop({ children }) {
  const location = useLocation();
  const path = location.pathname.split("/");
  const title = path[path?.length - 1];
  const { isDarkMode } = useDarkMode();

  useEffect(
    function () {
      window.scrollTo({ top: 0, left: 0 });

      const meta = document.createElement("meta");
      meta.content = isDarkMode ? "#1f2937" : "#374151";
      meta.name = "theme-color";
      document.getElementsByTagName("head")[0].appendChild(meta);

      document.title = title
        ? `${title?.split("")?.[0]?.toUpperCase() + title?.slice(1)} | Task It`
        : "Task It | Home";
    },
    [location, title, path, isDarkMode]
  );
  return children;
}

export default ScrollToTop;
