import { Images } from "@/utils/imagePath";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { SideBar } from "./sideBar";
import classes from "./style.module.css";

const Layout = () => {
  // Local States
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  // Functions
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => {
      if (isMobile) {
        return !prev;
      }
      return prev;
    });
  };

  // Effects
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={classes.layoutContainer}>
      {isMobile && (
        <header className={classes.topBar}>
          <div className={classes.topBarLogoBox}>
            <img src={Images.LOGO} alt="logo" className={classes.topBarLogo} />
          </div>

          <button
            className={classes.menuButton}
            onClick={toggleSidebar}
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isSidebarOpen ? "✕" : "☰"}
          </button>
        </header>
      )}

      <SideBar
        isMobile={isMobile}
        isMobileOpen={isSidebarOpen}
        onNavigate={() => {
          if (isMobile) closeSidebar();
        }}
      />

      {isMobile && (
        <>
          <div
            className={
              isSidebarOpen ? classes.backdropVisible : classes.backdropHidden
            }
            onClick={closeSidebar}
          />
        </>
      )}

      <div
        className={`${classes.content} ${
          isMobile ? classes.contentMobile : ""
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
