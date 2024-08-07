import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const { brandText, secondary } = props;
  return (
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white p-2">
      <div className="ml-[6px]">
        <div className="h-6 w-[224px] pt-1">
          <Link
            to=""
            className="text-sm font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white"
          >
            Pages
            <span className="mx-1 text-sm text-navy-700 hover:text-navy-700 dark:text-white">
              /
            </span>
          </Link>
          <Link
            className="text-sm font-normal capitalize text-navy-700 hover:underline dark:text-white dark:hover:text-white"
            to="#"
          >
            {brandText}
          </Link>
        </div>
        <p className="shrink text-[33px] capitalize text-navy-700 dark:text-white">
          <Link
            to="#"
            className="font-bold capitalize hover:text-navy-700 dark:hover:text-white"
          >
            {secondary}
          </Link>
        </p>
      </div>
    </nav>
  );
};

export default Navbar;
