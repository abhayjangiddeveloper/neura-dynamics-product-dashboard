import Button from "@/common/Button";
import { PATHS } from "@/utils/constant";
import { useNavigate } from "react-router-dom";
import classes from "./style.module.css";

const Error = () => {
  // Hooks
  const navigate = useNavigate();

  return (
    <div className={classes.error}>
      <h1 className={classes.heading}>Oops!</h1>
      <p className={classes.description}>Something went wrong...</p>

      <Button onClick={() => navigate(PATHS?.ROOT)}>Back to Home</Button>
    </div>
  );
};

export default Error;
