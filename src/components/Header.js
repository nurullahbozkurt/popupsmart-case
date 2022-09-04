import React from "react";
import { useEffect } from "react";
import { useApp } from "../states/app";
import { SiTodoist } from "react-icons/si";

const Header = () => {
  const { localUsername, setLocalUsername } = useApp();

  useEffect(() => {
    const username = JSON.parse(localStorage.getItem("username"));
    setLocalUsername(username);
  }, [setLocalUsername, localUsername]);

  return (
    <>
      <div className="w-full flex items-center justify-between bg-primaryBlue p-2 px-4 text-white text-lg">
        <div className="flex items-center gap-2 bg-yellow-500 px-4 rounded font-poiret">
          <div className="text-primaryBlue">
            <SiTodoist />
          </div>
          <h1>TODO APP</h1>
        </div>
        <h1 className="text-right">
          Welcome{" "}
          <span>
            {localUsername?.slice(0, 1).toUpperCase() + localUsername?.slice(1)}
          </span>
        </h1>
      </div>
    </>
  );
};

export default Header;
