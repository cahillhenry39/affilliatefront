import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToButton({ children }) {
  const location = useLocation();
  // const path = location.pathname.split("/");
  // const title = path[path?.length - 1];

  useEffect(
    function () {
      document
        .querySelector("#message")
        .scrollTo({ top: 50000, behavior: "smooth" });
    },
    [location]
  );
  return children;
}

export default ScrollToButton;
