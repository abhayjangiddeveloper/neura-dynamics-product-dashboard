import { FC } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import classes from "./style.module.css";

const Header: FC<{
  title?: string;
  showButton?: boolean;
  showBackButton?: boolean;
  buttonTitle?: string;
  buttonLoading?: boolean;
  onButtonClick?: () => void;
}> = ({
  title,
  showButton,
  showBackButton,
  buttonTitle,
  buttonLoading,
  onButtonClick,
}) => {
  const navigate = useNavigate();

  return (
    <div className={classes.header}>
      <div className={classes.left}>
        {showBackButton && (
          <button className={classes.backButton} onClick={() => navigate(-1)}>
            ← Back
          </button>
        )}

        <h1 className={classes.title}>{title}</h1>
      </div>

      {showButton && (
        <Button
          variant="primary"
          isLoading={buttonLoading}
          onClick={onButtonClick}
          size="small"
        >
          {buttonTitle}
        </Button>
      )}
    </div>
  );
};

export default Header;
