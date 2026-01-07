import { useEffect } from "react";
import classes from "./style.module.css";
import { SIDEBAR_TABS } from "@/layout/sideBar/tabsLinks";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // Hooks
  const navigate = useNavigate();

  // Effects
  useEffect(() => {
    const firstTab = SIDEBAR_TABS[0];

    navigate(firstTab.link);
  }, [navigate]);

  return (
    <div className={classes.dashboard}>
      <h1 className={classes.heading}>Dashboard</h1>
      <p className={classes.description}>Coming soon...</p>
    </div>
  );
};

export default Dashboard;
