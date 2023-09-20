import { useEffect } from "react";

const Layout = ({ children, pathname }) => {
  useEffect(() => {
    if (pathname === "/klarna" || pathname === "/") {
      document.body.style.backgroundColor = "#F8F8F8";
    } else {
      // Reset styles for other pages
      document.body.style.backgroundColor = "white";
    }

    // Clean up the styles when the component unmounts
    return () => {
      document.body.style.backgroundColor = "white";
    };
  }, [pathname]);

  return <div>{children}</div>;
};

export default Layout;
