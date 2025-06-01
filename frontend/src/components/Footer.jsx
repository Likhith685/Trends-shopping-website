import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <h1 className="text-3xl">TRENDS</h1>
          <p className="w-full md:w-2/3">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor iure
            eligendi sed incidunt quaerat aliquam fugit ducimus ullam officiis
            corrupti.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>8309475563</li>
            <li>likhith685@gmail.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="font-medium mb-5 text-center text-gray-600 mt-5">
          Copyright 2024 @ shopify.com - All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
