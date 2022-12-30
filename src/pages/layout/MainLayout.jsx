import React from "react";
import { PrivateNavBar } from "../components/PrivateNavBar";

export const MainLayout = ({ children, hasHeader }) => {
  return (
    <>
      {hasHeader && <PrivateNavBar />}
      <div className="main-content">{children}</div>
    </>
  );
};
