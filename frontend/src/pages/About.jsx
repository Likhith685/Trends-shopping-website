import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8  border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.about_img}
          className="w-full md:max-w-[450px]"
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio,
            sequi?Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Nostrum architecto ut quos sed unde enim itaque doloremque
            reprehenderit quibusdam vero?Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Magnam voluptas eum maiores hic et consequatur est
            a, quaerat aut iste.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
            voluptatum obcaecati rerum ipsam aspernatur commodi at ea delectus
            autem omnis? Doloribus cupiditate non voluptate blanditiis provident
            aspernatur praesentium, libero nisi consequuntur accusantium
            voluptas laboriosam ipsum, pariatur deserunt itaque natus explicabo
            perspiciatis consectetur? Reiciendis iure soluta exercitationem
            dolor dolores ducimus. Ratione.
          </p>
          <b className="text-gray-800">OUR MISSION</b>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non
            debitis a, eos incidunt labore veritatis voluptatem? Nihil alias
            commodi doloremque.
          </p>
        </div>
      </div>

      <div className="text-2xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col sm:flex-row mb-20">
        <div className="border px-10 md:px-16 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui quis,
            placeat excepturi repellendus amet assumenda nisi eaque accusamus
            fuga mollitia.
          </p>
        </div>
        <div className="border px-10 md:px-16 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui quis,
            placeat excepturi repellendus amet assumenda nisi eaque accusamus
            fuga mollitia.
          </p>
        </div>
        <div className="border px-10 md:px-16 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui quis,
            placeat excepturi repellendus amet assumenda nisi eaque accusamus
            fuga mollitia.
          </p>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  );
};

export default About;
