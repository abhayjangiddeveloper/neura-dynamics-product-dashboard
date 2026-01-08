import { APP_NAME, PATHS } from "@/utils/constant";
import { Images } from "@/utils/imagePath";
import clsx from "clsx";
import { useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classes from "./style.module.css";
import { Tab } from "./tab";
import { SIDEBAR_TABS } from "./tabsLinks";

export const SideBar = ({
  reference,
  isMobile,
  isMobileOpen = true,
  onNavigate,
}: {
  reference?: any;
  isMobile?: boolean;
  isMobileOpen?: boolean;
  onNavigate?: () => void;
}) => {
  // Hooks
  const tabGroupRef = useRef<HTMLUListElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Variables
  const currentPath = location?.pathname || "";

  return (
    <section
      className={clsx(classes.sidebar, {
        [classes.mobileSidebar]: isMobile,
        [classes.mobileClosed]: isMobile && !isMobileOpen,
        [classes.mobileOpen]: isMobile && isMobileOpen,
      })}
      ref={reference}
    >
      <div className={classes.logoSection}>
        <div className={classes.logoContainer}>
          <Link to={PATHS.ROOT}>
            <img className={classes.logo} src={Images.LOGO} alt="logo" />
          </Link>
        </div>

        <h2 className={classes.logoName}>{APP_NAME}</h2>
      </div>

      <ul className={classes.tabsContainer} ref={tabGroupRef}>
        {SIDEBAR_TABS.map((item, key) => {
          // Variables
          const active =
            currentPath === item.link ||
            currentPath.startsWith(`${item.link}/`);

          return (
            <li key={key}>
              <Tab
                icon={item?.icon}
                label={item?.label}
                isActive={active}
                id={item?.label}
                onClick={() => {
                  navigate(item.link);
                  onNavigate?.();
                }}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};
