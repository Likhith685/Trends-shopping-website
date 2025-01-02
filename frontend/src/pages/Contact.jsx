import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

const Contact = () => {
  return (
    <div>
      <div className="text-2xl mt-10 text-center">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          src={assets.contact_img}
          className="w-full md:max-w-[480px]"
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">
            54709 Hill Station <br /> Suite 350 , Washington
          </p>
          <p className="text-gray-500">
            Tel - 8309475563 <br /> Email: likhith685@gmail.com
          </p>
          <p className="font-semibold text-xl text-gray-600">
            Careers at Shopify
          </p>
          <p className="text-gray-500">
            Learn More about our Teams and Job Openings
          </p>
          <button className="border border-gray-500 px-4 py-2 text-black hover:bg-black hover:text-white transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  );
};

export default Contact;
