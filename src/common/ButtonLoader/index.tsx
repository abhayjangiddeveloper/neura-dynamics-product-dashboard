import "./style.css";

interface ButtonLoader {
  className?: string;
}

const ButtonLoader = ({ className }: ButtonLoader) => {
  return <div className={`ButtonLoader ${className}`}></div>;
};

export default ButtonLoader;
