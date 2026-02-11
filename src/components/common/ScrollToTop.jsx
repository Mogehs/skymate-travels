import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there is a hash, scroll to the element
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        // slight delay to ensure content is rendered
        setTimeout(() => {
          const navbar = document.querySelector("nav");
          const navHeight = navbar ? navbar.offsetHeight : 78;
          const elementPosition =
            element.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - navHeight - 20;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }, 100);
      }
    } else {
      // If no hash, scroll to top
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
