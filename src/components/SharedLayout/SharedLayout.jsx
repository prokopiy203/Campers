import AppBar from "../AppBar/AppBar";
import { Outlet } from "react-router-dom";

const SharedLayout = () => {
  return (
    <>
      <AppBar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default SharedLayout;
