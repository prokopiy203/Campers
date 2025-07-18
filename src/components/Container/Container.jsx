import clsx from "clsx";
import style from "./Container.module.css";
const Container = ({ children, className }) => {
  return <div className={clsx(style.container, className)}>{children}</div>;
};

export default Container;
