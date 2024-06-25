/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <div className="z-[5] mx-auto flex w-full max-w-screen-sm flex-col items-center justify-between px-[20px] pb-4 lg:mb-6 lg:max-w-[100%] lg:flex-row xl:mb-2 xl:w-[1310px] xl:pb-6">
      <ul className="flex flex-wrap items-center sm:flex-nowrap">
        <li className="mr-12">
          <Link
            target="blank"
            to="mailto:hello@simmmple.com"
            className="text-sm text-gray-600 hover:text-gray-600 md:text-base lg:text-white lg:hover:text-white"
          >
            Support
          </Link>
        </li>
        <li className="mr-12">
          <Link
            to="https://simmmple.com/licenses"
            target="blank"
            className="text-sm text-gray-600 hover:text-gray-600 md:text-base lg:text-white lg:hover:text-white"
          >
            License
          </Link>
        </li>
        <li className="mr-12">
          <Link
            to="https://simmmple.com/terms-of-service"
            target="blank"
            className="text-sm text-gray-600 hover:text-gray-600 md:text-base lg:text-white lg:hover:text-white"
          >
            Terms of Use
          </Link>
        </li>
        <li>
          <Link
            target="blank"
            to="https://blog.horizon-ui.com/"
            className="text-sm text-gray-600 hover:text-gray-600 md:text-base lg:text-white lg:hover:text-white"
          >
            Blog
          </Link>
        </li>
      </ul>
    </div>
  );
}
